"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, LogOut, Trash2, AlertTriangle } from "lucide-react";
import Pagination from "@/app/Components/Pagination";

type Enquiry = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string;
  city: string;
  enquiryType?: "course" | "service";
  service?: string;
  status: "pending" | "resolved" | "follow-up";
  createdAt: string;
};

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "follow-up", label: "Follow Up" },
  { value: "resolved", label: "Resolved" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All Leads" },
  { value: "course", label: "Course Leads" },
  { value: "service", label: "Service Leads" },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-400/10", text: "text-amber-400" },
  "follow-up": { bg: "bg-blue-400/10", text: "text-blue-400" },
  resolved: { bg: "bg-green-400/10", text: "text-green-400" },
};

const LIMIT = 10;

export default function AdminDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [counts, setCounts] = useState({ course: 0, service: 0 });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
      });
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/enquiries?${params}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 0);
      setCounts({ course: data.courseCount ?? 0, service: data.serviceCount ?? 0 });

      // If current page is empty after delete/filter, go back
      if (data.totalPages > 0 && page > data.totalPages) {
        setPage(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, search, router]);

  useEffect(() => {
    // Kick the request off from a frame callback so the first paint is not
    // forced into a cascading render by a synchronous state update.
    const frame = requestAnimationFrame(() => {
      void fetchEnquiries();
    });
    return () => cancelAnimationFrame(frame);
  }, [fetchEnquiries]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!newStatus) return;
    setUpdatingId(id);
    try {
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchEnquiries();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch("/api/admin/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget._id }),
      });
      setDeleteTarget(null);
      fetchEnquiries();
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-[#10131A]">
      <header className="bg-[#14161d] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#F1F5F9]">Enquiries Dashboard</h1>
          <p className="text-xs text-[#a8b3c5] font-medium">
            {total} total · <span className="text-[#e0244a]">{counts.course} course</span> ·{" "}
            <span className="text-[#e0244a]">{counts.service} service</span>
          </p>
        </div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#F1F5F9] hover:text-[#C81E3D] transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1 sm:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A8]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search name, phone, email, city, service..."
              className="w-full sm:w-72 h-10 pl-9 pr-4 border border-white/10 rounded-xl text-sm text-[#F1F5F9] outline-none focus:border-[#C81E3D] transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setTypeFilter(opt.value);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  typeFilter === opt.value
                    ? "bg-[#C81E3D] text-white"
                    : "bg-[#1b1e27] border border-white/10 text-[#f1f5f9] hover:border-[#C81E3D]/40"
                }`}
              >
                {opt.label}
                {opt.value === "course" && ` (${counts.course})`}
                {opt.value === "service" && ` (${counts.service})`}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  statusFilter === opt.value
                    ? "bg-[#C81E3D] text-white"
                    : "bg-[#14161d] border border-white/10 text-[#F1F5F9] hover:border-[#C81E3D]/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#14161d] rounded-2xl shadow-sm border border-white/10 overflow-hidden">
          <div className="overflow-x-auto custom-scroll">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-[#10131A] border-b border-white/10">
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Interest</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">City</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-4 font-bold text-[#F1F5F9] text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20">
                      <Loader2 size={24} className="animate-spin mx-auto text-[#8B96A8]" />
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-[#8B96A8] font-medium">
                      No enquiries found
                    </td>
                  </tr>
                ) : (
                  enquiries.map((e) => {
                    const st = STATUS_STYLES[e.status] || STATUS_STYLES.pending;
                    return (
                      <tr key={e._id} className="border-b border-white/5 hover:bg-[#0B0D12] transition-colors">
                        <td className="px-5 py-4 font-bold text-[#F1F5F9]">{e.name}</td>
                        <td className="px-5 py-4">
                          <div className="text-[#F1F5F9] font-semibold">{e.phone}</div>
                          <div className="text-[#8B96A8] text-xs">{e.email}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider mb-1 ${
                              (e.enquiryType ?? "course") === "service"
                                ? "bg-[#C81E3D]/15 text-[#e0244a]"
                                : "bg-blue-400/10 text-blue-400"
                            }`}
                          >
                            {(e.enquiryType ?? "course") === "service" ? "Service" : "Course"}
                          </span>
                          <div className="text-[#F1F5F9] font-medium leading-snug">
                            {e.service || e.specialization || "—"}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[#F1F5F9]">{e.city}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${st.bg} ${st.text}`}>
                            {e.status === "follow-up"
                              ? "Follow Up"
                              : e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[#A8B3C5] text-xs font-medium">{formatDate(e.createdAt)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={e.status}
                              onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                              disabled={updatingId === e._id}
                              className="px-2 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-[#F1F5F9] bg-[#14161d] outline-none focus:border-[#C81E3D] transition-all disabled:opacity-50 cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="follow-up">Follow Up</option>
                              <option value="resolved">Resolved</option>
                            </select>
                            <button
                              onClick={() => setDeleteTarget(e)}
                              className="p-1.5 rounded-lg text-[#7C8798] hover:text-[#C81E3D] hover:bg-[#2b141a] transition-all"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 pb-5">
            <Pagination
              currentPage={page}
              totalPages={Math.max(totalPages, 1)}
              onPageChange={setPage}
              totalItems={total}
              itemsPerPage={LIMIT}
            />
          </div>
        </div>
      </div>

      {/* Logout confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !loggingOut && setShowLogoutConfirm(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="relative w-full max-w-sm bg-[#14161d] rounded-2xl shadow-2xl p-8 text-center space-y-5"
          >
            <div className="w-14 h-14 bg-[#2b141a] rounded-full flex items-center justify-center mx-auto">
              <LogOut size={26} className="text-[#C81E3D]" />
            </div>
            <div className="space-y-2">
              <h3 id="logout-title" className="text-lg font-black text-[#F1F5F9]">
                Are you sure you want to logout?
              </h3>
              <p className="text-sm text-[#8B96A8] font-medium">
                You will need to sign in again to access the admin dashboard.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
                className="flex-1 h-11 rounded-xl border border-white/10 text-sm font-bold text-[#F1F5F9] hover:bg-[#10131a] transition-all disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center justify-center gap-2 flex-1 h-11 rounded-xl bg-[#C81E3D] hover:bg-[#B01A33] text-white text-sm font-bold transition-all disabled:opacity-60"
              >
                {loggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                {loggingOut ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative w-full max-w-sm bg-[#14161d] rounded-2xl shadow-2xl p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-[#2b141a] rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={28} className="text-[#C81E3D]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-[#F1F5F9]">Delete Enquiry?</h3>
              <p className="text-sm text-[#8B96A8] font-medium">
                Are you sure you want to delete{" "}
                <span className="font-bold text-[#F1F5F9]">{deleteTarget.name}</span>&apos;s enquiry? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-11 rounded-xl border border-white/10 text-sm font-bold text-[#F1F5F9] hover:bg-[#10131a] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center justify-center gap-2 flex-1 h-11 rounded-xl bg-[#C81E3D] hover:bg-[#B01A33] text-white text-sm font-bold transition-all disabled:opacity-60"
              >
                {deleting ? <Loader2 size={16} className="animate-spin" /> : null}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
