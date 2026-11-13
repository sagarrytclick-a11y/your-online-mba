"use client";
import React from "react";
import { usePopupForm, type PopupVariant } from "../context/PopupFormContext";

interface PopupTriggerProps {
  children: React.ReactNode;
  className?: string;
  /** Which lead form to open. Defaults to the MBA counselling form. */
  variant?: PopupVariant;
  "aria-label"?: string;
}

const PopupTrigger = ({ children, className, variant = "learner", ...rest }: PopupTriggerProps) => {
  const { open } = usePopupForm();
  return (
    <button
      type="button"
      onClick={() => open(variant)}
      aria-haspopup="dialog"
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PopupTrigger;
