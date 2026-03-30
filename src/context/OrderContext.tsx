import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { MenuItem } from '../types';

const STORAGE_KEY = 'daldal-bunsik-cart';

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

type OrderContextValue = {
  lines: CartLine[];
  itemCount: number;
  addItem: (item: MenuItem, quantity?: number) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  removeLine: (menuItemId: string) => void;
  clearCart: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

function loadInitial(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => l && l.item && typeof l.item.id === 'string' && typeof l.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota */
    }
  }, [lines]);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    const q = Math.max(1, quantity);
    setLines((prev) => {
      const i = prev.findIndex((l) => l.item.id === item.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + q };
        return next;
      }
      return [...prev, { item, quantity: q }];
    });
  }, []);

  const setQuantity = useCallback((menuItemId: string, quantity: number) => {
    const q = Math.floor(quantity);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.item.id !== menuItemId));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.item.id === menuItemId ? { ...l, quantity: q } : l))
    );
  }, []);

  const removeLine = useCallback((menuItemId: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== menuItemId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, addItem, setQuantity, removeLine, clearCart]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}
