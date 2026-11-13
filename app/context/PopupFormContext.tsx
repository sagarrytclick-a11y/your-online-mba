"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Which lead form the shared popup should render.
 * - "learner": free MBA counselling form (course enquiries)
 * - "service": EdTech growth-audit / service enquiry form
 */
export type PopupVariant = "learner" | "service";

interface PopupFormContextType {
  isOpen: boolean;
  variant: PopupVariant;
  open: (variant?: PopupVariant) => void;
  close: () => void;
}

const PopupFormContext = createContext<PopupFormContextType | undefined>(undefined);

export function PopupFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<PopupVariant>("learner");

  const open = useCallback((nextVariant: PopupVariant = "learner") => {
    setVariant(nextVariant);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <PopupFormContext.Provider value={{ isOpen, variant, open, close }}>
      {children}
    </PopupFormContext.Provider>
  );
}

export function usePopupForm() {
  const ctx = useContext(PopupFormContext);
  if (!ctx) throw new Error("usePopupForm must be used within PopupFormProvider");
  return ctx;
}
