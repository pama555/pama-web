import { useState } from "react";
import { signInUser, signUpUser } from "../../firebase/authService";
import { inp } from "../../utils/styles";

const btn = (extra = {}) => ({
  width: "100%",
  background: "linear-gradient(135deg,#0f3460,#1a6db5)",
  color: "white",
  border: "none",
  padding: "14px 0",
  borderRadius: 14,
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer",
  fontFamily: "Georgia, serif",
  ...extra,
});

const label = {
  fontSize: 13,
  color: "#5a7fa0",
  fontWeight: 600,
  display: "block",
  marginBottom: 6,
};

export default function UserAuth({ onClose, onLogin }) {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setErr("");
    if (!form.email || !form.password) { setErr("Email and password are required."); return; }
    if (tab === "signup" && !form.name) { setErr("Please enter your full name."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      let user;
      if (tab === "login") {
        user = await signInUser({ email: form.email, password: form.password });
      } else {
        user = await signUpUser({ name: form.name, email: form.email, password: form.password, phone: form.phone });
      }
      onLogin(user);
    } catch (e) {
      const msgs = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password is too weak. Use at least 6 characters.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/operation-not-allowed":
          "Email/Password sign-up is disabled in Firebase. Enable it from Firebase Console > Authentication > Sign-in method > Email/Password.",
      };
      setErr(msgs[e.code] || e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 28, padding: "40px 36px",
          width: "100%", maxWidth: 420,
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "linear-gradient(135deg,#0f3460,#1a6db5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px", fontSize: 24, fontWeight: 900, color: "white",
          }}>P</div>
          <h2 style={{ color: "#0f3460", fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: 1 }}>PAMA</h2>
          <p style={{ color: "#5a7fa0", fontSize: 13, marginTop: 4 }}>
            {tab === "login" ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 14, padding: 4, marginBottom: 24 }}>
          {["login", "signup"].map((t) => (
            <button key={t} onClick={() => { setTab(t); setErr(""); }} style={{
              flex: 1, padding: "9px 0", border: "none", cursor: "pointer",
              borderRadius: 11, fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700,
              background: tab === t ? "white" : "transparent",
              color: tab === t ? "#0f3460" : "#94a3b8",
              boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s",
            }}>
              {t === "login" ? "🔑 Sign In" : "✨ Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "signup" && (
            <div>
              <label style={label}>Full Name</label>
              <input value={form.name} onChange={set("name")} placeholder="Rahul Sharma" style={{ ...inp }} />
            </div>
          )}

          <div>
            <label style={label}>Email Address</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" style={{ ...inp }} />
          </div>

          {tab === "signup" && (
            <div>
              <label style={label}>Phone (optional)</label>
              <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" style={{ ...inp }} />
            </div>
          )}

          <div>
            <label style={label}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="••••••••"
                style={{ ...inp, paddingRight: 44 }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: 16,
              }}>{showPass ? "🙈" : "👁️"}</button>
            </div>
          </div>
        </div>

        {err && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
            padding: "10px 14px", borderRadius: 10, fontSize: 13, marginTop: 14,
          }}>{err}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...btn({ marginTop: 20, opacity: loading ? 0.7 : 1 }) }}
        >
          {loading ? "⏳ Please wait..." : tab === "login" ? "🔐 Sign In" : "🚀 Create Account"}
        </button>

        <button onClick={onClose} style={{
          ...btn({ marginTop: 10, background: "transparent", color: "#94a3b8", border: "1px solid #e2e8f0", fontWeight: 600 }),
        }}>Cancel</button>
      </div>
    </div>
  );
}
