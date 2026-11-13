import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Your Online MBA — India's Online MBA Advisor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 85% -10%, rgba(224,36,74,0.45), transparent 60%), radial-gradient(700px 500px at -10% 110%, rgba(76,29,149,0.5), transparent 60%), #080a10",
          padding: "56px 64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top row — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #ff4d6d, #e0244a 55%, #ff5a3c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.6 6.6 7 .1-5.4 4.2 2 6.8-6.2-3.9-6.2 3.9 2-6.8L3.4 8.7l7-.1L12 2z" fill="#fff" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#f5f7fa", fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
              YOUR ONLINE MBA
            </div>
            <div style={{ color: "#e0244a", fontSize: 13, fontWeight: 700, letterSpacing: 3 }}>
              ONLINE MBA SCHOOL
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ff5c7a",
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 5,
              marginBottom: 18,
            }}
          >
            EDTECH ADVISORY · INDIA
          </div>
          <div
            style={{
              color: "#f5f7fa",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 1000,
              display: "flex",
              flexDirection: "column",
            }}
          >
            India&apos;s Online
            <br />
            MBA Advisor<span style={{ color: "#e0244a" }}>.</span>
          </div>
          <div style={{ color: "#a8b3c5", fontSize: 24, fontWeight: 500, marginTop: 22 }}>
            Compare 1000+ UGC-approved programs — with free expert counselling.
          </div>
        </div>

        {/* Bottom row — proof chips */}
        <div style={{ display: "flex", gap: 14 }}>
          {["UGC-DEB Approved Only", "22+ Top Universities", "5 Lakh+ Learners Guided", "Free Counselling"].map((t) => (
            <div
              key={t}
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                color: "#e8eaf0",
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
