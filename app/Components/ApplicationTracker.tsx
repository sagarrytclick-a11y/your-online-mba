"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { collegeReviews } from "../data/colleges";
import { getUniversityDetailsOrDefaults } from "../data/university-details";
import { specialisations } from "../data/specialisations";
import { useProgramShortlist } from "../context/ProgramShortlistContext";
import { useLocalStorageState } from "../lib/useLocalStorageState";
import PopupTrigger from "./PopupTrigger";
import { formatInr } from "../lib/roi";

type Stage = "Shortlisted" | "Documents" | "Applied" | "Offer" | "Enrolled";

const stageMeta: Record<
  Stage,
  { icon: React.ComponentType<{ size?: number; className?: string }>; tone: string; blurb: string }
> = {
  Shortlisted: {
    icon: Icons.Star,
    tone: "bg-slate-100 text-slate-600 border-slate-200",
    blurb: "Decided to pursue it",
  },
  Documents: {
    icon: Icons.FolderOpen,
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    blurb: "Gathering marksheets and ID proof",
  },
  Applied: {
    icon: Icons.Send,
    tone: "bg-blue-50 text-blue-700 border-blue-100",
    blurb: "Form submitted to the university",
  },
  Offer: {
    icon: Icons.MailCheck,
    tone: "bg-violet-50 text-violet-700 border-violet-100",
    blurb: "Admission offer received",
  },
  Enrolled: {
    icon: Icons.GraduationCap,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blurb: "Fee paid, portal active",
  },
};

const stageOrder: Stage[] = ["Shortlisted", "Documents", "Applied", "Offer", "Enrolled"];

interface Application {
  id: string;
  collegeId: string;
  specialisationSlug: string;
  stage: Stage;
  notes: string;
  addedAt: number;
  nextAction: string;
  nextActionDate: string;
}

const STORAGE_KEY = "yomApplicationTracker";

const checklist = [
  "Graduation marksheet (consolidated)",
  "10th and 12th certificates",
  "Government photo ID",
  "Passport-size photographs",
  "Category certificate, if applicable",
  "Work experience letter",
  "Entrance exam scorecard, if required",
];

const ApplicationTracker: React.FC = () => {
  const { ids: shortlistedIds, hydrated: shortlistHydrated } = useProgramShortlist();
  const [applications, setApplications] = useLocalStorageState<Application[]>(STORAGE_KEY, []);
  const [checklistState, setChecklistState] = useState<boolean[]>(
    checklist.map(() => false)
  );
  const [showAdd, setShowAdd] = useState(false);
  const [draftCollege, setDraftCollege] = useState("any");
  const [draftSpec, setDraftSpec] = useState("any");


  const addApplication = () => {
    if (draftCollege === "any") return;
    const exists = applications.some(
      (a) => a.collegeId === draftCollege && a.specialisationSlug === draftSpec
    );
    if (exists) return;
    setApplications((p) => [
      ...p,
      {
        id: `${draftCollege}-${draftSpec}-${Date.now()}`,
        collegeId: draftCollege,
        specialisationSlug: draftSpec,
        stage: "Shortlisted",
        notes: "",
        addedAt: Date.now(),
        nextAction: "Download the admission form",
        nextActionDate: "",
      },
    ]);
    setDraftCollege("any");
    setDraftSpec("any");
    setShowAdd(false);
  };

  const moveStage = (id: string, dir: -1 | 1) =>
    setApplications((p) =>
      p.map((a) => {
        if (a.id !== id) return a;
        const idx = stageOrder.indexOf(a.stage);
        const next = stageOrder[Math.min(stageOrder.length - 1, Math.max(0, idx + dir))];
        return { ...a, stage: next };
      })
    );

  const updateNotes = (id: string, notes: string) =>
    setApplications((p) => p.map((a) => (a.id === id ? { ...a, notes } : a)));

  const removeApplication = (id: string) =>
    setApplications((p) => p.filter((a) => a.id !== id));

  const importShortlist = () => {
    if (shortlistedIds.length === 0) return;
    setApplications((p) => {
      const next = [...p];
      shortlistedIds.forEach((collegeId) => {
        const already = next.some((a) => a.collegeId === collegeId);
        if (!already) {
          next.push({
            id: `${collegeId}-general-${Date.now()}-${next.length}`,
            collegeId,
            specialisationSlug: "any",
            stage: "Shortlisted",
            notes: "",
            addedAt: Date.now(),
            nextAction: "Check admission eligibility",
            nextActionDate: "",
          });
        }
      });
      return next;
    });
  };

  const stats = useMemo(() => {
    const byStage = stageOrder.map((s) => applications.filter((a) => a.stage === s).length);
    const committed = applications
      .filter((a) => a.stage === "Offer" || a.stage === "Enrolled")
      .reduce((sum, a) => sum + getUniversityDetailsOrDefaults(a.collegeId).totalFee, 0);
    const nextUp = applications
      .filter((a) => a.nextActionDate !== "")
      .sort((a, b) => a.nextActionDate.localeCompare(b.nextActionDate))[0];
    return { byStage, committed, nextUp };
  }, [applications]);

  const docsDone = checklistState.filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stageOrder.slice(0, 4).map((s) => {
          const Icon = stageMeta[s].icon;
          return (
            <div key={s} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <span
                className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${stageMeta[s].tone}`}
              >
                <Icon size={16} />
              </span>
              <p className="text-xl font-black text-[#1E293B]">{stats.byStage[stageOrder.indexOf(s)]}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                {s}
              </p>
            </div>
          );
        })}
      </div>

      {stats.nextUp && (
        <div className="bg-[#C81E3D] rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Icons.BellRing size={18} />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-200">
                Next deadline
              </p>
              <p className="text-sm font-extrabold">
                {stats.nextUp.nextAction} · {stats.nextUp.nextActionDate}
              </p>
            </div>
          </div>
          <PopupTrigger className="flex-shrink-0 h-11 px-6 bg-white text-[#C81E3D] font-extrabold rounded-full text-xs transition-all active:scale-[0.98]">
            Ask about this deadline
          </PopupTrigger>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-base font-extrabold text-[#1E293B]">
              Your applications ({applications.length})
            </h3>
            <div className="flex gap-2">
              {shortlistHydrated && shortlistedIds.length > 0 && (
                <button
                  type="button"
                  onClick={importShortlist}
                  className="h-10 px-4 border-2 border-[#C81E3D] text-[#C81E3D] font-extrabold rounded-full text-[11px] transition-all hover:bg-[#C81E3D] hover:text-white inline-flex items-center gap-1.5"
                >
                  <Icons.Download size={13} />
                  Import {shortlistedIds.length} shortlisted
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAdd((s) => !s)}
                className="h-10 px-4 bg-[#C81E3D] text-white font-extrabold rounded-full text-[11px] transition-all active:scale-[0.98] inline-flex items-center gap-1.5"
              >
                <Icons.Plus size={13} />
                Add application
              </button>
            </div>
          </div>

          {showAdd && (
            <div className="bg-white rounded-2xl border-2 border-[#C81E3D]/30 p-5 shadow-sm grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <div>
                <label
                  htmlFor="tracker-college"
                  className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5"
                >
                  University
                </label>
                <select
                  id="tracker-college"
                  value={draftCollege}
                  onChange={(e) => setDraftCollege(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1E293B] outline-none focus:border-[#C81E3D] cursor-pointer"
                >
                  <option value="any">Select a university</option>
                  {collegeReviews.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="tracker-spec"
                  className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5"
                >
                  Specialisation
                </label>
                <select
                  id="tracker-spec"
                  value={draftSpec}
                  onChange={(e) => setDraftSpec(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1E293B] outline-none focus:border-[#C81E3D] cursor-pointer"
                >
                  <option value="any">General MBA</option>
                  {specialisations.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={addApplication}
                disabled={draftCollege === "any"}
                className="h-11 px-5 bg-[#C81E3D] text-white font-extrabold rounded-xl text-xs transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          )}

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
              <span className="w-14 h-14 rounded-full bg-[#FFF1F2] flex items-center justify-center mx-auto">
                <Icons.FolderOpen size={24} className="text-[#C81E3D]" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#1E293B]">
                  Track applications without a spreadsheet
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-sm mx-auto">
                  Everything is stored in this browser. No account, nothing sent to us until you talk to
                  a counsellor.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  href="/find-my-program"
                  className="h-10 px-5 bg-[#C81E3D] text-white font-extrabold rounded-full text-[11px] inline-flex items-center gap-1.5"
                >
                  <Icons.Search size={13} />
                  Find programmes
                </Link>
                {shortlistHydrated && shortlistedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={importShortlist}
                    className="h-10 px-5 border-2 border-slate-200 text-slate-500 font-extrabold rounded-full text-[11px] inline-flex items-center gap-1.5"
                  >
                    Import shortlist
                  </button>
                )}
              </div>
            </div>
          ) : (
            applications.map((a) => {
              const college = collegeReviews.find((c) => c.id === a.collegeId);
              const details = getUniversityDetailsOrDefaults(a.collegeId);
              const spec = specialisations.find((s) => s.slug === a.specialisationSlug);
              const stageIndex = stageOrder.indexOf(a.stage);
              const Icon = stageMeta[a.stage].icon;
              return (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/universities/${a.collegeId}`}
                        className="text-sm font-extrabold text-[#1E293B] hover:text-[#C81E3D] transition-colors"
                      >
                        {college?.name ?? a.collegeId}
                      </Link>
                      <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                        {spec?.title ?? "General MBA"} · {formatInr(details.totalFee)}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-black ${stageMeta[a.stage].tone}`}
                    >
                      <Icon size={11} />
                      {a.stage}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {stageOrder.map((s, i) => (
                      <div
                        key={s}
                        className={`flex-1 h-1.5 rounded-full ${
                          i <= stageIndex ? "bg-[#C81E3D]" : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">{stageMeta[a.stage].blurb}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={`action-${a.id}`}
                        className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5"
                      >
                        Next action
                      </label>
                      <input
                        id={`action-${a.id}`}
                        type="text"
                        value={a.nextAction}
                        onChange={(e) =>
                          setApplications((p) =>
                            p.map((x) =>
                              x.id === a.id ? { ...x, nextAction: e.target.value } : x
                            )
                          )
                        }
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1E293B] outline-none focus:border-[#C81E3D]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`date-${a.id}`}
                        className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5"
                      >
                        Due date
                      </label>
                      <input
                        id={`date-${a.id}`}
                        type="date"
                        value={a.nextActionDate}
                        onChange={(e) =>
                          setApplications((p) =>
                            p.map((x) =>
                              x.id === a.id ? { ...x, nextActionDate: e.target.value } : x
                            )
                          )
                        }
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1E293B] outline-none focus:border-[#C81E3D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`notes-${a.id}`}
                      className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5"
                    >
                      Notes
                    </label>
                    <textarea
                      id={`notes-${a.id}`}
                      value={a.notes}
                      onChange={(e) => updateNotes(a.id, e.target.value)}
                      rows={2}
                      placeholder="Counsellor name, document numbers, questions to ask..."
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#1E293B] placeholder:text-slate-400 outline-none focus:border-[#C81E3D] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveStage(a.id, -1)}
                        disabled={stageIndex === 0}
                        aria-label="Move back a stage"
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icons.ChevronLeft size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStage(a.id, 1)}
                        disabled={stageIndex === stageOrder.length - 1}
                        aria-label="Move forward a stage"
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:border-[#C81E3D] hover:text-[#C81E3D] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icons.ChevronRight size={15} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeApplication(a.id)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Icons.Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-[#1E293B] flex items-center gap-2">
              <Icons.FolderCheck size={15} className="text-[#C81E3D]" />
              Document checklist
            </h3>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(docsDone / checklist.length) * 100}%` }}
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400">
              {docsDone} of {checklist.length} ready
            </p>
            <ul className="space-y-2">
              {checklist.map((doc, i) => (
                <li key={doc}>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checklistState[i]}
                      onChange={() =>
                        setChecklistState((p) =>
                          p.map((v, idx) => (idx === i ? !v : v))
                        )
                      }
                      className="w-4 h-4 mt-0.5 accent-emerald-500 flex-shrink-0"
                    />
                    <span
                      className={`text-[11px] font-bold leading-snug ${
                        checklistState[i] ? "text-slate-400 line-through" : "text-slate-600"
                      }`}
                    >
                      {doc}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {stats.committed > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#1E293B]">Fee committed</h3>
              <p className="text-2xl font-black text-[#1E293B] mt-2">{formatInr(stats.committed)}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1">
                Across applications at the offer or enrolled stage
              </p>
              <Link
                href="/scholarships"
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#C81E3D] hover:underline"
              >
                <Icons.Sparkles size={12} />
                Check scholarship eligibility
              </Link>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-[#1E293B]">How this stays private</h3>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              This tracker lives in your browser&apos;s local storage. Clearing site data wipes it, and
              nothing is sent to us until you share it with a counsellor.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#C81E3D] hover:underline"
            >
              <Icons.CalendarDays size={12} />
              Contact a counsellor about my shortlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
