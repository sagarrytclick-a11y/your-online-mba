"use client";

import { useState, useEffect, useCallback } from "react";
import {
  emptyCounsellingForm,
  getCounsellingFieldErrors,
  type CounsellingFormState,
  type EnquiryType,
} from "@/app/lib/validation";
import {
  formatCooldown,
  getFormCooldownRemaining,
  markFormSubmitted,
} from "@/app/lib/form-cooldown";

type Options = {
  onSuccess?: () => void;
  resetDelayMs?: number;
  /** "course" (default, MBA counselling) or "service" (agency services) */
  enquiryType?: EnquiryType;
  /** Pre-selected service title when enquiryType is "service" */
  defaultService?: string;
  /**
   * Validate a field when it loses focus. Defaults to true.
   * Popup forms set this to false so validation only runs on submit.
   */
  validateOnBlur?: boolean;
};

export function useCounsellingForm(options: Options = {}) {
  const {
    onSuccess,
    resetDelayMs = 5000,
    enquiryType = "course",
    defaultService = "",
    validateOnBlur = true,
  } = options;
  const initialForm: CounsellingFormState = { ...emptyCounsellingForm, enquiryType, service: defaultService };
  const [form, setForm] = useState<CounsellingFormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setForm({ ...emptyCounsellingForm, enquiryType, service: defaultService });
      onSuccess?.();
    }, resetDelayMs);
    return () => clearTimeout(timer);
  }, [submitted, resetDelayMs, onSuccess, enquiryType, defaultService]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "phone") {
        const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
        setForm((prev) => ({ ...prev, phone: numericValue }));
      } else if (name === "name" || name === "city") {
        setForm((prev) => ({ ...prev, [name]: value.slice(0, name === "name" ? 60 : 50) }));
      } else if (name === "email") {
        setForm((prev) => ({ ...prev, email: value.slice(0, 100) }));
      } else {
        setForm((prev) => ({ ...prev, [name]: value }));
      }

      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      setError("");
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!validateOnBlur) return;
      const { name } = e.target;
      const errors = getCounsellingFieldErrors(form);
      if (errors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: errors[name] }));
      }
    },
    [form, validateOnBlur]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setFieldErrors({});

      const cooldown = getFormCooldownRemaining();
      if (cooldown > 0) {
        setError(`Please wait ${formatCooldown(cooldown)} before submitting again.`);
        return;
      }

      const errors = getCounsellingFieldErrors(form);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setError("Please fix the highlighted fields");

        // Move focus to the first invalid field so the user sees the error.
        const firstInvalid = Object.keys(errors)[0];
        const field = e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
        field?.focus();
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/send-counselling", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (data.fieldErrors) setFieldErrors(data.fieldErrors);
          throw new Error(data.error || "Failed to send");
        }
        markFormSubmitted();
        setSubmitted(true);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setForm({ ...emptyCounsellingForm, enquiryType, service: defaultService });
    setError("");
    setFieldErrors({});
  }, [enquiryType, defaultService]);

  return {
    form,
    loading,
    submitted,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setForm,
  };
}
