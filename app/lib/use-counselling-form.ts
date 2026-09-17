"use client";

import { useState, useEffect, useCallback } from "react";
import {
  emptyCounsellingForm,
  getCounsellingFieldErrors,
  type CounsellingFormState,
} from "@/app/lib/validation";
import {
  formatCooldown,
  getFormCooldownRemaining,
  markFormSubmitted,
} from "@/app/lib/form-cooldown";

type Options = {
  onSuccess?: () => void;
  resetDelayMs?: number;
};

export function useCounsellingForm(options: Options = {}) {
  const { onSuccess, resetDelayMs = 5000 } = options;
  const [form, setForm] = useState<CounsellingFormState>(emptyCounsellingForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setForm(emptyCounsellingForm);
      onSuccess?.();
    }, resetDelayMs);
    return () => clearTimeout(timer);
  }, [submitted, resetDelayMs, onSuccess]);

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
      const { name } = e.target;
      const errors = getCounsellingFieldErrors(form);
      if (errors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: errors[name] }));
      }
    },
    [form]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    setForm(emptyCounsellingForm);
    setError("");
    setFieldErrors({});
  }, []);

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
