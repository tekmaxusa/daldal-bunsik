import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, Copy, ExternalLink, MessageCircle, Store, Truck, CalendarClock, Mail } from 'lucide-react';
import { useOrder } from './context/OrderContext';
import {
  buildWhatsAppOrderLink,
  formatUsd,
  getOnlineOrderUrl,
  hasWhatsAppOrdering,
  parseMenuPrice,
} from './lib/orderConfig';
import { isOrderEmailConfigured, submitOrderEmail } from './lib/submitOrderEmail';
import { isWithinCarrolltonPostedHours } from './lib/storeHours';

type FulfillmentType = 'pickup' | 'delivery';

type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  /** Full street address + unit; required when fulfillment is delivery */
  address: string;
};

/** Local calendar date YYYY-MM-DD (for `<input type="date" min="...">`). */
function localDateYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatScheduleForMessage(fulfillment: FulfillmentType, date: string, time: string): string {
  const when = new Date(`${date}T${time}:00`);
  if (Number.isNaN(when.getTime())) return '';
  const human = when.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  return fulfillment === 'pickup'
    ? `Preferred pickup: ${human}`
    : `Preferred delivery time: ${human}`;
}

function validateSchedule(date: string, time: string): string | null {
  if (!date.trim()) return 'Please choose a date.';
  if (!time.trim()) return 'Please choose a time.';
  const when = new Date(`${date}T${time}:00`);
  if (Number.isNaN(when.getTime())) return 'Please choose a valid date and time.';
  if (when.getTime() < Date.now()) return 'Please choose a future date and time.';
  if (!isWithinCarrolltonPostedHours(date, time)) {
    return 'We are closed Wednesdays, and open Mon, Tue, Thu–Sun 11:00 AM – 8:30 PM. Please pick a valid date and time.';
  }
  return null;
}

function buildOrderMessage(
  lines: { item: { name: string; price: string }; quantity: number }[],
  fulfillment: FulfillmentType,
  customer: CustomerInfo,
  scheduleDate: string,
  scheduleTime: string,
  notes: string
) {
  const body = lines
    .map((l) => `• ${l.quantity}x ${l.item.name} (${l.item.price} each)`)
    .join('\n');
  const subtotal = lines.reduce((s, l) => s + parseMenuPrice(l.item.price) * l.quantity, 0);

  const fulfillmentLine =
    fulfillment === 'pickup'
      ? 'Pickup at restaurant (1111 W Frankford Rd Ste 102, Carrollton, TX 75007)'
      : 'DELIVERY — please confirm fee & time with me.';

  const addrBlock =
    fulfillment === 'delivery' && customer.address.trim()
      ? `\nDelivery address:\n${customer.address.trim()}`
      : fulfillment === 'delivery'
        ? '\nDelivery address: (please add in chat if not below)'
        : '';

  const noteBlock = notes.trim() ? `\n\nSpecial requests:\n${notes.trim()}` : '';
  const scheduleLine = formatScheduleForMessage(fulfillment, scheduleDate, scheduleTime);

  return `Hi Daldal Bunsik! I'd like to place an order:

--- My details ---
Name: ${customer.fullName.trim()}
Email: ${customer.email.trim()}
Phone: ${customer.phone.trim()}
${scheduleLine}
${fulfillmentLine}${addrBlock}

--- Items ---
${body}

Estimated subtotal: ${formatUsd(subtotal)}${noteBlock}

Thank you!`;
}

function validateCustomer(fulfillment: FulfillmentType, c: CustomerInfo): string | null {
  if (!c.fullName.trim()) return 'Please enter your name.';
  if (!c.email.trim()) return 'Please enter your email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim())) return 'Please enter a valid email.';
  if (!c.phone.trim()) return 'Please enter your phone number.';
  if (fulfillment === 'delivery' && !c.address.trim()) {
    return 'Please enter your full delivery address.';
  }
  return null;
}

export default function OrderPage() {
  const { lines, setQuantity, removeLine, clearCart } = useOrder();
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup');
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [notes, setNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);

  const minDateStr = useMemo(() => localDateYmd(new Date()), []);

  useEffect(() => {
    if (lines.length > 0) setShowEmailSuccess(false);
  }, [lines.length]);

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + parseMenuPrice(l.item.price) * l.quantity, 0),
    [lines]
  );

  const orderMessage = useMemo(
    () => buildOrderMessage(lines, fulfillment, customer, scheduledDate, scheduledTime, notes),
    [lines, fulfillment, customer, scheduledDate, scheduledTime, notes]
  );

  const storefrontUrl = getOnlineOrderUrl();
  const canWhatsApp = hasWhatsAppOrdering();

  const commitIfValid = (): boolean => {
    const errCustomer = validateCustomer(fulfillment, customer);
    if (errCustomer) {
      setFormError(errCustomer);
      return false;
    }
    const errSchedule = validateSchedule(scheduledDate, scheduledTime);
    if (errSchedule) {
      setFormError(errSchedule);
      return false;
    }
    setFormError(null);
    return true;
  };

  const copyOrder = async () => {
    if (!commitIfValid()) return;
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const openWhatsApp = () => {
    if (!commitIfValid()) return;
    window.open(buildWhatsAppOrderLink(orderMessage), '_blank', 'noopener,noreferrer');
  };

  const sendOrderByEmail = async () => {
    setEmailError('');
    if (!commitIfValid()) return;
    if (!isOrderEmailConfigured()) {
      setEmailStatus('error');
      setEmailError(
        'Add VITE_GOOGLE_SCRIPT_URL to your .env (Google Apps Script web app URL). See google-apps-script-order.example.js.'
      );
      return;
    }
    setEmailStatus('sending');
    try {
      await submitOrderEmail({
        name: customer.fullName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        fulfillment: fulfillment === 'pickup' ? 'Pickup' : 'Delivery',
        address: customer.address.trim(),
        scheduleDate: scheduledDate,
        scheduleTime: scheduledTime,
        subtotal: formatUsd(subtotal),
        notes: notes.trim(),
        orderDetails: orderMessage,
      });
      setEmailStatus('success');
      setShowEmailSuccess(true);
      clearCart();
      setCustomer({ fullName: '', email: '', phone: '', address: '' });
      setNotes('');
      setScheduledDate('');
      setScheduledTime('');
      setFulfillment('pickup');
      setTimeout(() => {
        setEmailStatus('idle');
        setEmailError('');
      }, 6000);
    } catch (e) {
      setEmailStatus('error');
      setEmailError(e instanceof Error ? e.message : 'Could not send. Try again or call the restaurant.');
    }
  };

  const updateCustomer = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 bg-brand-cream min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <div className="max-w-2xl mx-auto w-full min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-brand-red normal-case mb-3">
            Your order
          </h1>
          <p className="text-brand-dark/70 font-nunito text-base sm:text-lg px-1">
            Choose pickup or delivery, date and time, your contact info, then send your order by email. We&apos;ll
            confirm with you.
          </p>
        </motion.div>

        {lines.length === 0 ? (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 md:p-12 text-center border border-gray-100 shadow-lg space-y-6">
            {showEmailSuccess ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 text-green-900 px-6 py-4 font-nunito">
                <p className="font-fredoka font-bold text-lg normal-case mb-1">Order sent</p>
                <p className="text-sm opacity-90">
                  We emailed your order to the restaurant. They may reply to confirm time and total.
                </p>
              </div>
            ) : null}
            <p className="text-brand-dark/70 font-nunito text-lg">
              Your cart is empty. Browse the menu for what we serve, then visit us or call to place an order.
            </p>
            <Link
              to="/menu"
              className="inline-flex bg-brand-red text-white font-fredoka font-bold px-10 py-4 rounded-full uppercase tracking-wider shadow-lg hover:opacity-95 transition-opacity"
            >
              View full menu
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <ul className="space-y-4">
              {lines.map(({ item, quantity }) => (
                <li
                  key={item.id}
                  className="bg-white rounded-[24px] p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100 shadow-sm"
                >
                  <div className="flex-grow min-w-0">
                    <p className="font-fredoka font-bold text-brand-dark uppercase tracking-tight truncate">
                      {item.name}
                    </p>
                    <p className="text-brand-red font-bold">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="w-10 h-10 rounded-full border-2 border-brand-dark/20 flex items-center justify-center hover:bg-brand-cream transition-colors"
                      onClick={() => setQuantity(item.id, quantity - 1)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-fredoka font-bold w-8 text-center">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="w-10 h-10 rounded-full border-2 border-brand-dark/20 flex items-center justify-center hover:bg-brand-cream transition-colors"
                      onClick={() => setQuantity(item.id, quantity + 1)}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Remove item"
                      className="ml-2 p-2 text-gray-400 hover:text-brand-red transition-colors"
                      onClick={() => removeLine(item.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pickup vs delivery */}
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
              <h2 className="font-fredoka font-bold text-lg text-brand-dark normal-case">
                How do you want your order?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment('pickup');
                    setFormError(null);
                  }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                    fulfillment === 'pickup'
                      ? 'border-brand-red bg-brand-red/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      fulfillment === 'pickup' ? 'bg-brand-red text-white' : 'bg-gray-100 text-brand-dark'
                    }`}
                  >
                    <Store size={22} />
                  </div>
                  <div>
                    <p className="font-fredoka font-bold text-brand-dark normal-case">Pickup</p>
                    <p className="text-sm text-brand-dark/60 font-nunito">Pick up at Carrollton</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment('delivery');
                    setFormError(null);
                  }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                    fulfillment === 'delivery'
                      ? 'border-brand-red bg-brand-red/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      fulfillment === 'delivery' ? 'bg-brand-red text-white' : 'bg-gray-100 text-brand-dark'
                    }`}
                  >
                    <Truck size={22} />
                  </div>
                  <div>
                    <p className="font-fredoka font-bold text-brand-dark normal-case">Delivery</p>
                    <p className="text-sm text-brand-dark/60 font-nunito">We&apos;ll confirm time &amp; fee</p>
                  </div>
                </button>
              </div>

              <div className="pt-6 mt-2 border-t border-gray-100 space-y-4">
                <h3 className="font-fredoka font-bold text-base text-brand-dark normal-case flex items-center gap-2">
                  <CalendarClock size={20} className="text-brand-red shrink-0" />
                  {fulfillment === 'pickup' ? 'Pickup' : 'Delivery'} date &amp; time{' '}
                  <span className="text-brand-red text-sm">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sched-date" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                      Date
                    </label>
                    <input
                      id="sched-date"
                      type="date"
                      min={minDateStr}
                      value={scheduledDate}
                      onChange={(e) => {
                        setScheduledDate(e.target.value);
                        setFormError(null);
                      }}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="sched-time" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                      Time
                    </label>
                    <input
                      id="sched-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => {
                        setScheduledTime(e.target.value);
                        setFormError(null);
                      }}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    />
                  </div>
                </div>
                <p className="text-xs text-brand-dark/50 font-nunito leading-relaxed">
                  We&apos;ll confirm this slot by message. Hours: Mon, Tue, Thu–Sun 11:00 AM – 8:30 PM.
                  Closed Wednesdays.
                </p>
              </div>
            </div>

            {/* Customer info */}
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-sm space-y-5">
              <h2 className="font-fredoka font-bold text-lg text-brand-dark normal-case">Your information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="cust-name" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                    Full name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="cust-name"
                    type="text"
                    autoComplete="name"
                    value={customer.fullName}
                    onChange={(e) => updateCustomer('fullName', e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label htmlFor="cust-email" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                    Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="cust-email"
                    type="email"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(e) => updateCustomer('email', e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="cust-phone" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                    Phone <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="cust-phone"
                    type="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    onChange={(e) => updateCustomer('phone', e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    placeholder="(972) 213-0186"
                  />
                </div>
                {fulfillment === 'delivery' ? (
                  <div className="md:col-span-2">
                    <label htmlFor="cust-address" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                      Delivery address <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      id="cust-address"
                      autoComplete="street-address"
                      value={customer.address}
                      onChange={(e) => updateCustomer('address', e.target.value)}
                      rows={3}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30 resize-y"
                      placeholder="Street, unit/apt, city, ZIP"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
              <label htmlFor="order-notes" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                Special requests (optional)
              </label>
              <textarea
                id="order-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Allergies, spice level, gate code…"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30 resize-y"
              />
            </div>

            {formError ? (
              <p className="text-center text-sm font-nunito font-semibold text-brand-red bg-brand-red/5 border border-brand-red/20 rounded-2xl py-3 px-4">
                {formError}
              </p>
            ) : null}

            <div className="flex justify-between items-center px-2">
              <span className="font-fredoka font-bold text-xl text-brand-dark normal-case">Subtotal</span>
              <span className="font-fredoka font-bold text-2xl text-brand-red">{formatUsd(subtotal)}</span>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                disabled={emailStatus === 'sending'}
                onClick={() => {
                  void sendOrderByEmail();
                }}
                className="w-full py-4 rounded-2xl bg-brand-red text-white font-fredoka font-bold text-lg uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Mail size={24} />
                {emailStatus === 'sending' ? 'Sending…' : 'Send order by email'}
              </button>

              {emailStatus === 'error' && emailError ? (
                <p className="text-center text-sm font-nunito text-brand-red -mt-2">{emailError}</p>
              ) : null}

              {canWhatsApp && (
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-fredoka font-bold text-lg uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 hover:opacity-95 transition-opacity"
                >
                  <MessageCircle size={24} />
                  Send order on WhatsApp
                </button>
              )}

              {storefrontUrl && (
                <a
                  href={storefrontUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-brand-red text-white font-fredoka font-bold text-lg uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 hover:opacity-95 transition-opacity"
                >
                  <ExternalLink size={22} />
                  Order on our website / app
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  void copyOrder();
                }}
                className="w-full py-4 rounded-2xl border-2 border-brand-dark text-brand-dark font-fredoka font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-dark hover:text-white transition-colors"
              >
                <Copy size={20} />
                {copied ? 'Copied!' : 'Copy order text'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (confirm('Clear your entire cart?')) clearCart();
              }}
              className="w-full text-center text-sm font-nunito text-brand-dark/50 hover:text-brand-red transition-colors py-2"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
