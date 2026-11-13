import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  specialization: string;
  city: string;
  enquiryType: "course" | "service";
  service: string;
  status: "pending" | "resolved" | "follow-up";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    specialization: { type: String, default: "" },
    city: { type: String, required: true },
    enquiryType: {
      type: String,
      enum: ["course", "service"],
      default: "course",
      index: true,
    },
    service: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "resolved", "follow-up"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Enquiry =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
