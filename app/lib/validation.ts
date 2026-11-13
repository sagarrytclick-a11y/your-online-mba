import { z } from "zod";
import { serviceTitles } from "@/app/data/services";

export const SPECIALIZATION_OPTIONS = [
  "Finance",
  "Marketing",
  "Human Resource Management",
  "Operations Management",
  "Information Technology",
  "General Management",
] as const;

export type SpecializationOption = (typeof SPECIALIZATION_OPTIONS)[number];

const nameRegex = /^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$/;
const indianPhoneRegex = /^[6-9]\d{9}$/;
const cityRegex = /^[a-zA-Z]+(?:[ .'-][a-zA-Z]+)*$/;

export const ENQUIRY_TYPES = ["course", "service"] as const;
export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const SERVICE_OPTIONS = serviceTitles;

export const counsellingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be under 60 characters")
      .regex(nameRegex, "Enter a valid name (letters only)"),
    phone: z
      .string()
      .trim()
      .regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number"),
    email: z
      .string()
      .trim()
      .max(100, "Email must be under 100 characters")
      .email("Enter a valid email address")
      .transform((v) => v.toLowerCase()),
    enquiryType: z.enum(ENQUIRY_TYPES).default("course"),
    specialization: z.string().trim().max(80).default(""),
    service: z.string().trim().max(90).default(""),
    city: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be under 50 characters")
      .regex(cityRegex, "Enter a valid city name"),
  })
  .superRefine((val, ctx) => {
    if (val.enquiryType === "course") {
      if (!(SPECIALIZATION_OPTIONS as readonly string[]).includes(val.specialization)) {
        ctx.addIssue({
          code: "custom",
          path: ["specialization"],
          message: "Please select a valid specialization",
        });
      }
    } else {
      if (!(SERVICE_OPTIONS as readonly string[]).includes(val.service)) {
        ctx.addIssue({
          code: "custom",
          path: ["service"],
          message: "Please select a valid service",
        });
      }
    }
  });

export type CounsellingFormData = z.infer<typeof counsellingSchema>;

/** Client-side form state (includes honeypot + enquiry type) */
export type CounsellingFormState = {
  name: string;
  phone: string;
  email: string;
  specialization: string;
  city: string;
  website: string;
  enquiryType: EnquiryType;
  service: string;
};

export const emptyCounsellingForm: CounsellingFormState = {
  name: "",
  phone: "",
  email: "",
  specialization: "",
  city: "",
  website: "",
  enquiryType: "course",
  service: "",
};

export function getCounsellingFieldErrors(
  data: unknown
): Record<string, string> {
  const result = counsellingSchema.safeParse(data);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] ?? "");
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
