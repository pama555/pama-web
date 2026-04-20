const Logo = ({ size = 22 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "linear-gradient(135deg,#fff,#bde0ff)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: 16, color: "#0f3460",
      boxShadow: "0 2px 8px rgba(0,0,0,0.18)"
    }}>P</div>
    <span style={{ color: "white", fontSize: size, fontWeight: 900, letterSpacing: 3 }}>PAMA</span>
  </div>
);

export default Logo;
