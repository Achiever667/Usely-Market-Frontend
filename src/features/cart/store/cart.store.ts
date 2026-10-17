"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: string;
  vendorId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
};

type CartStore = {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      addLine: (line) =>
        set((state) => {
          const existing = state.lines.find((item) => item.productId === line.productId);

          if (!existing) {
            return { lines: [...state.lines, line] };
          }

          return {
            lines: state.lines.map((item) =>
              item.productId === line.productId
                ? { ...item, quantity: item.quantity + line.quantity }
                : item,
            ),
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((item) => (item.productId === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      removeLine: (productId) =>
        set((state) => ({
          lines: state.lines.filter((item) => item.productId !== productId),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "usely-cart" },
  ),
);

export const selectCartSubtotal = (state: CartStore) =>
  state.lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
