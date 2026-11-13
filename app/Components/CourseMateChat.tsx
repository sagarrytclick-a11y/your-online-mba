"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, User } from "lucide-react";
import ChatBotMark from "./ChatBotMark";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm your AI MBA Advisor. Ask me anything about Online MBA programs, specializations, admissions, or career outcomes — I'm here to help!",
};

const WELCOME_SUGGESTIONS = [
  "What is an Online MBA?",
  "Which specialization is best for me?",
  "How do I apply for an Online MBA?",
  "What are the career benefits?",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CourseMateChat = ({ isOpen, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = updated.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/course-mate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message.content }]);
      } else if (res.status === 401 || res.status === 500) {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm temporarily unavailable. Please reach out to us directly at **9839865347** or email **Abhishek@vidyavriddhi.com** for any Online MBA queries." }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm temporarily unavailable. Please reach out to us directly at **9839865347** or email **Abhishek@vidyavriddhi.com** for any Online MBA queries." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm temporarily unavailable. Please reach out to us directly at **9839865347** or email **Abhishek@vidyavriddhi.com** for any Online MBA queries." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Desktop: right-docked, vertically centered · Mobile: full-screen */}
      <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-end p-0 sm:p-4 sm:pr-5">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI MBA Advisor chat"
          className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#14161d]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-out sm:h-[520px] sm:max-h-[80vh] sm:w-[360px] sm:rounded-2xl ${
            isOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "translate-x-10 scale-95 opacity-0 origin-right"
          }`}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-[#C81E3D] via-[#e0244a] to-[#ff5a3c] text-white">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center backdrop-blur overflow-hidden">
              <ChatBotMark size={34} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#e0244a] bg-green-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight">AI MBA Advisor</h2>
              <p className="text-[11px] text-white/85 font-medium">Online now · ~30s replies · Hindi &amp; English</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-[#0B0D12]">
          {messages.map((msg, i) => (
            <div key={i} className={`animate-msg-in flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                  msg.role === "assistant" ? "bg-[#0b0d12] border border-[#e0244a]/30" : "bg-[#22252f] text-[#f1f5f9] border border-white/10"
                }`}
              >
                {msg.role === "assistant" ? <ChatBotMark size={24} /> : <User size={16} />}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium ${
                  msg.role === "assistant"
                    ? "bg-[#14161d] border border-white/10 text-[#f1f5f9] rounded-tl-md"
                    : "bg-gradient-to-br from-[#C81E3D] to-[#e0244a] text-white rounded-tr-md shadow-[0_6px_18px_rgba(224,36,74,0.3)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Welcome suggestions (only before first user message) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {WELCOME_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-[#14161d] text-xs font-bold text-[#A8B3C5] hover:border-[#C81E3D]/30 hover:text-[#C81E3D] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0b0d12] border border-[#e0244a]/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <ChatBotMark size={24} />
              </div>
              <div className="bg-[#14161d] border border-white/10 rounded-2xl rounded-tl-md px-5 py-4 flex items-center gap-1.5">
                <span className="typing-dot w-2 h-2 rounded-full bg-[#e0244a]" />
                <span className="typing-dot w-2 h-2 rounded-full bg-[#e0244a]" />
                <span className="typing-dot w-2 h-2 rounded-full bg-[#e0244a]" />
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-white/10 px-6 py-4 bg-[#14161d]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Online MBA..."
              disabled={loading}
              className="flex-1 h-12 px-4 border border-white/10 rounded-xl text-sm text-[#F1F5F9] outline-none focus:border-[#C81E3D] transition-all font-medium placeholder:text-[#7c8798] disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-[#C81E3D] hover:bg-[#B01A33] rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-[#7c8798] font-medium text-center mt-2">
            Responses are AI-generated. Verify with Your Online MBA counsellors for accuracy.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseMateChat;
