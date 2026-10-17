"use client";

import { create } from "zustand";

type ModalStore = {
  activeModal: string | null;
  payload: unknown;
  openModal: (activeModal: string, payload?: unknown) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  payload: null,
  openModal: (activeModal, payload = null) => set({ activeModal, payload }),
  closeModal: () => set({ activeModal: null, payload: null }),
}));
