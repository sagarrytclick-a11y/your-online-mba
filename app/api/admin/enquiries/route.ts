import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Enquiry } from "@/app/models/Enquiry";
import { requireAdminApi } from "@/app/lib/admin-auth";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const search = (searchParams.get("search") || "").trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));

  const filter: Record<string, unknown> = {};
  if (status && ["pending", "resolved", "follow-up"].includes(status)) {
    filter.status = status;
  }
  if (search) {
    const regex = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    filter.$or = [
      { name: regex },
      { phone: regex },
      { email: regex },
      { city: regex },
      { specialization: regex },
      { service: regex },
    ];
  }

  // Counts ignore the type filter so the UI can always show both totals
  const countFilter = { ...filter };

  if (type === "course") {
    // Include legacy rows that predate the enquiryType field
    filter.$and = [
      ...(Array.isArray(filter.$and) ? (filter.$and as unknown[]) : []),
      { $or: [{ enquiryType: "course" }, { enquiryType: { $exists: false } }] },
    ];
  } else if (type === "service") {
    filter.enquiryType = "service";
  }

  const [enquiries, total, courseCount, serviceCount] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Enquiry.countDocuments(filter),
    // Legacy rows predate enquiryType — count them as course leads
    Enquiry.countDocuments({
      $and: [
        countFilter,
        { $or: [{ enquiryType: "course" }, { enquiryType: { $exists: false } }] },
      ],
    }),
    Enquiry.countDocuments({ ...countFilter, enquiryType: "service" }),
  ]);

  return NextResponse.json({
    enquiries,
    total,
    courseCount,
    serviceCount,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit) || 1),
  });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  await connectDB();

  const { id, status } = await req.json();
  if (!id || !["pending", "resolved", "follow-up"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ enquiry });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  await connectDB();

  const { id } = await req.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const enquiry = await Enquiry.findByIdAndDelete(id).lean();
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
