"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  communityQuestions,
  topicLabels,
  type CommunityTopic,
  type CommunityQuestion,
} from "../data/community";
import PopupTrigger from "./PopupTrigger";

const topicIconMap: Record<CommunityTopic, React.ComponentType<{ size?: number; className?: string }>> = {
  admissions: Icons.GraduationCap as React.ComponentType<{ size?: number; className?: string }>,
  fees: Icons.Wallet as React.ComponentType<{ size?: number; className?: string }>,
  exam: Icons.ClipboardCheck as React.ComponentType<{ size?: number; className?: string }>,
  lms: Icons.MonitorPlay as React.ComponentType<{ size?: number; className?: string }>,
  placement: Icons.Briefcase as React.ComponentType<{ size?: number; className?: string }>,
  roi: Icons.TrendingUp as React.ComponentType<{ size?: number; className?: string }>,
  comparisons: Icons.Scale as React.ComponentType<{ size?: number; className?: string }>,
};

const sortOptions = [
  { id: "recent", label: "Most recent" },
  { id: "votes", label: "Most upvoted" },
  { id: "answers", label: "Most answered" },
] as const;

type SortId = (typeof sortOptions)[number]["id"];

const CommunityBoard: React.FC = () => {
  const [topic, setTopic] = useState<CommunityTopic | "all">("all");
  const [sort, setSort] = useState<SortId>("votes");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [voted, setVoted] = useState<string[]>([]);
  const [helpful, setHelpful] = useState<string[]>([]);

  const toggleQuestion = (id: string) =>
    setExpanded((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const toggleVote = (id: string) =>
    setVoted((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const toggleHelpful = (id: string) =>
    setHelpful((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = communityQuestions.filter(
      (item) =>
        (topic === "all" || item.topic === topic) &&
        (q === "" ||
          item.question.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)))
    );

    list = [...list].sort((a, b) => {
      if (sort === "votes") return b.upvotes - a.upvotes;
      if (sort === "answers") return b.answers.length - a.answers.length;
      return b.askedAt.localeCompare(a.askedAt);
    });

    return list;
  }, [topic, sort, query]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
        <div className="relative">
          <Icons.Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions on fees, exams, LMS, placements..."
            aria-label="Search community questions"
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 text-sm font-semibold text-[#1E293B] placeholder:text-slate-400 focus:border-[#C81E3D] focus:ring-2 focus:ring-rose-100 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTopic("all")}
            className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all ${
              topic === "all"
                ? "bg-[#C81E3D] text-white"
                : "bg-[#F8FAFC] border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
            }`}
          >
            All topics ({communityQuestions.length})
          </button>
          {(Object.keys(topicLabels) as CommunityTopic[]).map((t) => {
            const Icon = topicIconMap[t];
            const count = communityQuestions.filter((q) => q.topic === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-extrabold transition-all ${
                  topic === t
                    ? "bg-[#C81E3D] text-white"
                    : "bg-[#F8FAFC] border border-gray-100 text-slate-500 hover:border-rose-200 hover:text-[#C81E3D]"
                }`}
              >
                <Icon size={12} />
                {topicLabels[t]} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-slate-400">
            Showing {results.length} question{results.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-1.5">
            {sortOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setSort(o.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all ${
                  sort === o.id
                    ? "bg-slate-800 text-white"
                    : "bg-[#F8FAFC] text-slate-500 hover:text-slate-800"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Icons.MessageCircleQuestion size={28} className="text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-extrabold text-[#1E293B]">No question matches that search</p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Try a broader keyword, or ask the counsellor directly.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              expanded={expanded.includes(q.id)}
              voted={voted.includes(q.id)}
              helpful={helpful}
              onToggle={() => toggleQuestion(q.id)}
              onVote={() => toggleVote(q.id)}
              onHelpful={(id) => toggleHelpful(id)}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="text-base font-extrabold text-[#1E293B]">Cannot find your question here?</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Counsellors answer admissions and fee questions within one working day.
          </p>
        </div>
        <PopupTrigger className="flex-shrink-0 inline-flex items-center gap-2 h-12 px-7 bg-[#C81E3D] text-white font-extrabold rounded-full text-sm shadow-md transition-all active:scale-[0.98]">
          <Icons.MessageSquarePlus size={16} />
          Ask a counsellor
        </PopupTrigger>
      </div>
    </div>
  );
};

const QuestionCard: React.FC<{
  question: CommunityQuestion;
  expanded: boolean;
  voted: boolean;
  helpful: string[];
  onToggle: () => void;
  onVote: () => void;
  onHelpful: (answerId: string) => void;
}> = ({ question: q, expanded, voted, helpful, onToggle, onVote, onHelpful }) => {
  const Icon = topicIconMap[q.topic];

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex gap-4 p-5 sm:p-6">
        <div className="flex-shrink-0 flex flex-col items-center gap-1 w-11">
          <button
            type="button"
            onClick={onVote}
            aria-label="Upvote question"
            aria-pressed={voted}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
              voted
                ? "bg-[#C81E3D] border-[#C81E3D] text-white"
                : "border-gray-200 text-slate-400 hover:border-[#C81E3D] hover:text-[#C81E3D]"
            }`}
          >
            <Icons.ChevronUp size={16} />
          </button>
          <span className="text-[10px] font-extrabold text-slate-400">
            {q.upvotes + (voted ? 1 : 0)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-rose-100 text-[9px] font-black text-[#C81E3D]">
              <Icon size={10} />
              {topicLabels[q.topic]}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Asked by {q.askedBy} · {q.askedAt}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-extrabold text-[#1E293B] mt-2 leading-snug">
            {q.question}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Icons.MessageSquare size={11} className="text-[#C81E3D]" />
              {q.answers.length} answer{q.answers.length === 1 ? "" : "s"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Icons.Eye size={11} className="text-[#C81E3D]" />
              {q.views.toLocaleString("en-IN")} views
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {q.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-gray-100 text-[9px] font-bold text-slate-500"
              >
                #{t}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="mt-3 text-[11px] font-extrabold text-[#C81E3D] hover:underline inline-flex items-center gap-1"
          >
            {expanded ? "Hide answers" : `Show ${q.answers.length} answer${q.answers.length === 1 ? "" : "s"}`}
            <Icons.ChevronDown
              size={13}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-[#FAFBFD] px-5 sm:px-6 py-5 space-y-4">
          {q.answers.map((a) => {
            const isHelpful = helpful.includes(a.id);
            return (
              <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-5 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                    {a.author
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-[#1E293B] flex items-center gap-1.5">
                      {a.author}
                      {a.verified && <Icons.BadgeCheck size={12} className="text-emerald-500" />}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400">{a.role} · {a.credentials}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{a.answer}</p>
                <button
                  type="button"
                  onClick={() => onHelpful(a.id)}
                  aria-pressed={isHelpful}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
                    isHelpful
                      ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                      : "bg-white border-gray-100 text-slate-400 hover:text-[#C81E3D]"
                  }`}
                >
                  <Icons.ThumbsUp size={11} />
                  Helpful ({a.helpfulCount + (isHelpful ? 1 : 0)})
                </button>
              </div>
            );
          })}
          {q.relatedFaqs.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Related reads
              </p>
              <div className="flex flex-wrap gap-2">
                {q.relatedFaqs.map((f) => (
                  <Link
                    key={f}
                    href="/community"
                    className="text-[11px] font-extrabold text-[#C81E3D] hover:underline"
                  >
                    {f}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default CommunityBoard;
