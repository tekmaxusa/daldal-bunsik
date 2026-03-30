/**
 * Google Apps Script — Daldal Bunsik website order → email
 *
 * SETUP:
 * 1. Go to https://script.google.com → New project
 * 2. Paste this entire file
 * 3. Set RECIPIENT_EMAIL below (restaurant inbox)
 * 4. Save (Ctrl+S), then Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL → put it in .env as VITE_GOOGLE_SCRIPT_URL
 */

var RECIPIENT_EMAIL = 'tekmaxdev@gmail.com'; // restaurant / orders inbox

function doGet() {
  return ContentService.createTextOutput(
    'Daldal Bunsik — order endpoint. Use the Send order by email button on the website.'
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var params = parseParams(e);
    var name = params.name || '—';
    var email = params.email || '—';
    var phone = params.phone || '—';
    var fulfillment = params.fulfillment || '—';
    var address = (params.address || '').trim() || '—';
    var date = params.date || '—';
    var time = params.time || '—';
    var subtotal = params.subtotal || '—';
    var notes = (params.notes || '').trim() || '—';
    var orderDetails = (params.orderDetails || '').trim();

    var subject = '🍜 New Daldal Bunsik order: ' + name + ' — ' + fulfillment;

    var htmlBody = buildOrderEmailHtml(name, email, phone, fulfillment, address, date, time, subtotal, notes, orderDetails);
    var plainBody =
      'DALDAL BUNSIK — New order\n\n' +
      'Name: ' +
      name +
      '\nEmail: ' +
      email +
      '\nPhone: ' +
      phone +
      '\nPickup / Delivery: ' +
      fulfillment +
      '\nAddress: ' +
      address +
      '\nDate: ' +
      date +
      '\nTime: ' +
      time +
      '\nSubtotal: ' +
      subtotal +
      '\nNotes: ' +
      notes +
      (orderDetails ? '\n\n--- Full order ---\n' + orderDetails : '');

    var mailOpts = {
      to: RECIPIENT_EMAIL.trim(),
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody,
    };
    if (email && email !== '—' && email.indexOf('@') > 0) {
      mailOpts.replyTo = email;
    }
    MailApp.sendEmail(mailOpts);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function buildOrderEmailHtml(name, email, phone, fulfillment, address, date, time, subtotal, notes, orderDetails) {
  var brandName = 'Daldal Bunsik';
  var accent = '#E33E23';
  var dark = '#1a1a1a';
  var gray = '#6b7280';
  var lightBg = '#FFF5F2';
  var pageBg = '#f0ebe8';

  var detailsBlock = orderDetails
    ? '<div style="margin: 0 32px 24px;"><p style="margin: 0 0 10px; font-size: 11px; color: ' +
      gray +
      '; text-transform: uppercase; letter-spacing: 0.08em;">Full order (from website)</p><pre style="margin: 0; padding: 18px 20px; background: #fff; border: 1px solid #e5e2dd; border-radius: 10px; font-size: 13px; line-height: 1.55; color: ' +
      dark +
      '; white-space: pre-wrap; word-break: break-word; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;">' +
      escapeHtml(orderDetails) +
      '</pre></div>'
    : '';

  var emailAttr = String(email).replace(/"/g, '');
  var phoneAttr = String(phone).replace(/\s/g, '');

  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Order</title></head>',
    '<body style="margin: 0; padding: 32px 20px; background: ' + pageBg + '; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;">',
    '<div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">',

    '<!-- Header -->',
    '<div style="background: ' + dark + '; padding: 28px 32px; text-align: center;">',
    '<div style="height: 3px; background: linear-gradient(90deg, transparent, ' + accent + ', transparent); margin-bottom: 20px;"></div>',
    '<h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #fff; letter-spacing: 0.06em;">' + brandName + '</h1>',
    '<p style="margin: 10px 0 0; font-size: 11px; color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 0.2em;">New Website Order</p>',
    '</div>',

    '<!-- Intro -->',
    '<div style="padding: 28px 32px 20px;">',
    '<p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">You have a new order from your website. Details below — <strong>Reply</strong> to this message to reach the customer.</p>',
    '</div>',

    '<!-- Details card -->',
    '<div style="margin: 0 32px 24px; background: ' + lightBg + '; border-radius: 10px; border: 1px solid #e5e2dd; overflow: hidden;">',
    '<table style="border-collapse: collapse; width: 100%; font-size: 14px;">',
    '<tr><td style="padding: 16px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; width: 140px;">Guest</td><td style="padding: 16px 20px; color: ' + dark + '; font-weight: 600;">' + escapeHtml(name) + '</td></tr>',
    '<tr style="background: #fff;"><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td><td style="padding: 14px 20px;"><a href="mailto:' + emailAttr + '" style="color: ' + accent + '; text-decoration: none; font-weight: 500;">' + escapeHtml(email) + '</a></td></tr>',
    '<tr><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td><td style="padding: 14px 20px;"><a href="tel:' + phoneAttr + '" style="color: ' + accent + '; text-decoration: none; font-weight: 500;">' + escapeHtml(phone) + '</a></td></tr>',
    '<tr style="background: #fff;"><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Order type</td><td style="padding: 14px 20px; color: ' + dark + '; font-weight: 600;">' + escapeHtml(fulfillment) + '</td></tr>',
    '<tr><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Address</td><td style="padding: 14px 20px; color: ' + dark + ';">' + escapeHtml(address) + '</td></tr>',
    '<tr style="background: #fff;"><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Scheduled date</td><td style="padding: 14px 20px; color: ' + dark + ';">' + escapeHtml(date) + '</td></tr>',
    '<tr><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Scheduled time</td><td style="padding: 14px 20px; color: ' + dark + ';">' + escapeHtml(time) + '</td></tr>',
    '<tr style="background: #fff;"><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Subtotal</td><td style="padding: 14px 20px; color: ' + dark + '; font-weight: 600;">' + escapeHtml(subtotal) + '</td></tr>',
    '<tr><td style="padding: 14px 20px; color: ' + gray + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Special requests</td><td style="padding: 14px 20px; color: ' + dark + ';">' + escapeHtml(notes) + '</td></tr>',
    '</table>',
    '</div>',

    detailsBlock,

    '<!-- CTA -->',
    '<div style="padding: 0 32px 28px;">',
    '<p style="margin: 0; font-size: 13px; color: #6b7280;">Confirm pickup or delivery time and final total by replying or calling the guest.</p>',
    '</div>',

    '<!-- Footer -->',
    '<div style="padding: 18px 32px; background: ' + dark + '; font-size: 11px; color: rgba(255,255,255,0.7); text-align: center; line-height: 1.5;">' +
      brandName +
      ' &middot; 1111 W Frankford Rd Ste 102, Carrollton, TX 75007 &middot; Korean soul food</div>',
    '</div>',
    '</body>',
    '</html>',
  ].join('\n');
}

function escapeHtml(text) {
  if (!text) return '—';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseParams(e) {
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }
  if (e.postData && e.postData.contents) {
    var body = e.postData.contents;
    var params = {};
    body.split('&').forEach(function (pair) {
      var parts = pair.split('=');
      if (parts.length === 2) {
        params[decodeURIComponent(parts[0].replace(/\+/g, ' '))] = decodeURIComponent(
          parts[1].replace(/\+/g, ' ')
        );
      }
    });
    return params;
  }
  return {};
}
