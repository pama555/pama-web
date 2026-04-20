import { useState } from "react";
import { inp } from "../../utils/styles";
import { ADMIN_USER, ADMIN_PASS } from "../../data/defaults";

function AdminLogin({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) onLogin();
    else setErr("Invalid credentials. Try: admin / pama@2026");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f3460,#1a6db5,#4da6ff)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Georgia, serif", padding: 20
    }}>
      <div style={{
        background: "white", borderRadius: 28, padding: "48px 40px",
        width: "100%", maxWidth: 400, boxShadow: "0 30px 80px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 66, height: 66, borderRadius: "50%",
            background: "linear-gradient(135deg,#0f3460,#1a6db5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28, fontWeight: 900, color: "white"
          }}>P</div>
          <h1 style={{ color: "#0f3460", fontSize: 24, fontWeight: 900, marginBottom: 4, letterSpacing: 2 }}>PAMA ADMIN</h1>
          <p style={{ color: "#5a7fa0", fontSize: 14 }}>Sign in to manage your business</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 6 }}>Username</label>
            <input value={u} onChange={e => setU(e.target.value)} placeholder="admin" style={{ ...inp, fontSize: 15 }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={show ? "text" : "password"}
                value={p} onChange={e => setP(e.target.value)}
                placeholder="••••••••"
                style={{ ...inp, fontSize: 15, paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShow(!show)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: 16
              }}>{show ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {err && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
              padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16
            }}>{err}</div>
          )}
          <button type="submit" style={{
            width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
            border: "none", padding: "15px 0", borderRadius: 14, fontSize: 16,
            fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif"
          }}>🔐 Sign In</button>
        </form>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, marginTop: 20 }}>
          Demo credentials: admin / pama@2026
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
