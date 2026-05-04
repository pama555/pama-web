import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, signOutUser } from "../../firebase/authService";
import { inp } from "../../utils/styles";

const BANNERS = [
  {
    id: 1,
    emoji: "🧹",
    title: "Deep Clean Deal",
    subtitle: "Save 40% on full home deep cleaning this month",
    tag: "LIMITED OFFER",
    bg: "linear-gradient(135deg,#0f3460 0%,#1a6db5 100%)",
    accent: "#f0c040",
  },
  {
    id: 2,
    emoji: "🚽",
    title: "Bathroom Package",
    subtitle: "3 bathrooms cleaned for just ₹75. Book before Sunday!",
    tag: "WEEKEND SPECIAL",
    bg: "linear-gradient(135deg,#065a46,#0d9668)",
    accent: "#fde68a",
  },
  {
    id: 3,
    emoji: "👗",
    title: "Complete Wardrobe",
    subtitle: "Organize, fold & iron your entire wardrobe — ₹497 flat",
    tag: "MOST POPULAR",
    bg: "linear-gradient(135deg,#581c87,#9333ea)",
    accent: "#fbcfe8",
  },
  {
    id: 4,
    emoji: "🧊",
    title: "Fridge Cleaning",
    subtitle: "Deep clean + deodorize. First time customers get 20% off",
    tag: "NEW USER OFFER",
    bg: "linear-gradient(135deg,#7c2d12,#c2410c)",
    accent: "#fed7aa",
  },
];

const card = {
  background: "white",
  borderRadius: 20,
  padding: "24px 20px",
  boxShadow: "0 4px 20px rgba(15,52,96,0.08)",
  border: "1px solid #e8f0fb",
};

export default function UserDashboard({ user, services, onGoToBook, onGoHome, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("home"); // "home" | "bookings" | "profile"
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then((p) => {
        if (p) { setProfile(p); setEditForm({ name: p.name, phone: p.phone || "" }); }
      });
    }
  }, [user]);

  // Auto-rotate banners
  useEffect(() => {
    const iv = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4500);
    return () => clearInterval(iv);
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { name: editForm.name, phone: editForm.phone });
      setProfile((p) => ({ ...p, ...editForm }));
      setEditMode(false);
    } catch (e) {
      alert("Failed to save: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    onLogout();
  };

  const displayName = profile?.name || user?.displayName || "User";
  const bookings = profile?.bookings || [];
  const banner = BANNERS[bannerIdx];

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "linear-gradient(135deg,#e8f4fd,#fff 40%,#dbeeff)", color: "#1a2e4a" }}>

      {/* ── NAV ── */}
      <nav style={{
        background: "linear-gradient(90deg,#0f3460,#1a6db5)",
        padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(15,52,96,0.3)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0" }} onClick={onGoHome}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, color: "white", cursor: "pointer",
          }}>P</div>
          <span style={{ color: "white", fontWeight: 900, fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>PAMA</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Hi, {displayName.split(" ")[0]}</span>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 800, fontSize: 14,
          }}>{displayName[0]?.toUpperCase()}</div>
          <button onClick={handleLogout} style={{
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
            color: "white", padding: "7px 13px", borderRadius: 20, cursor: "pointer",
            fontSize: 12, fontFamily: "Georgia, serif",
          }}>Sign Out</button>
        </div>
      </nav>

      {/* ── TABS ── */}
      <div style={{
        display: "flex", gap: 0, background: "white",
        borderBottom: "1px solid #e8f0fb",
        position: "sticky", top: 58, zIndex: 90,
        overflowX: "auto",
      }}>
        {[
          { id: "home", label: "🏠 Dashboard" },
          { id: "bookings", label: "📋 My Bookings" },
          { id: "profile", label: "👤 Profile" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, minWidth: 110, padding: "14px 8px", border: "none",
            background: "transparent", cursor: "pointer", fontFamily: "Georgia, serif",
            fontSize: 13, fontWeight: tab === t.id ? 800 : 500,
            color: tab === t.id ? "#0f3460" : "#94a3b8",
            borderBottom: tab === t.id ? "3px solid #1a6db5" : "3px solid transparent",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* ══════════════ HOME TAB ══════════════ */}
        {tab === "home" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Welcome card */}
            <div style={{
              background: "linear-gradient(135deg,#0f3460,#1a6db5)",
              borderRadius: 22, padding: "28px 24px", color: "white",
            }}>
              <p style={{ fontSize: 13, opacity: 0.75, margin: "0 0 6px" }}>Welcome back 👋</p>
              <h2 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 4px", letterSpacing: 0.5 }}>{displayName}</h2>
              <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 18px" }}>{user?.email}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={onGoToBook} style={{
                  background: "#f0c040", color: "#0f3460", border: "none",
                  padding: "10px 20px", borderRadius: 20, fontWeight: 800,
                  cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
                }}>🛒 Book a Service</button>
                <button onClick={() => setTab("bookings")} style={{
                  background: "rgba(255,255,255,0.2)", color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "10px 20px", borderRadius: 20, fontWeight: 700,
                  cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
                }}>📋 My Bookings ({bookings.length})</button>
              </div>
            </div>

            {/* ── ANIMATED SERVICE BANNERS ── */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f3460", margin: "0 0 12px" }}>🎯 Special Offers</h3>
              <div style={{
                ...banner.bg ? { background: banner.bg } : {},
                background: banner.bg,
                borderRadius: 20, padding: "22px 22px 22px",
                color: "white", position: "relative", overflow: "hidden",
                minHeight: 120,
                transition: "all 0.4s ease",
              }}>
                {/* Decorative circle */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 130, height: 130, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{
                    background: banner.accent, color: "#1a2e4a",
                    fontSize: 10, fontWeight: 900, letterSpacing: 1,
                    padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10,
                  }}>{banner.tag}</span>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{banner.emoji}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 6px" }}>{banner.title}</h3>
                  <p style={{ fontSize: 13, opacity: 0.85, margin: "0 0 14px" }}>{banner.subtitle}</p>
                  <button onClick={onGoToBook} style={{
                    background: banner.accent, color: "#1a2e4a",
                    border: "none", padding: "9px 18px", borderRadius: 18,
                    fontWeight: 800, cursor: "pointer", fontSize: 12,
                    fontFamily: "Georgia, serif",
                  }}>Book Now →</button>
                </div>
              </div>

              {/* Dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
                {BANNERS.map((_, i) => (
                  <button key={i} onClick={() => setBannerIdx(i)} style={{
                    width: i === bannerIdx ? 20 : 7, height: 7, borderRadius: 10,
                    background: i === bannerIdx ? "#1a6db5" : "#bde0ff",
                    border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0,
                  }} />
                ))}
              </div>
            </div>

            {/* Quick services grid */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f3460", margin: "0 0 12px" }}>⚡ Quick Book</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {(services || []).filter(s => s.active).slice(0, 6).map((s) => (
                  <div key={s.id} onClick={onGoToBook} style={{
                    background: "white", borderRadius: 16, padding: "14px 10px",
                    textAlign: "center", cursor: "pointer",
                    border: "1px solid #e8f0fb",
                    boxShadow: "0 2px 10px rgba(15,52,96,0.06)",
                    transition: "transform 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0f3460", lineHeight: 1.3 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#1a6db5", fontWeight: 800, marginTop: 4 }}>₹{s.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent booking preview */}
            {bookings.length > 0 && (
              <div style={card}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f3460", margin: "0 0 14px" }}>🕐 Recent Booking</h3>
                <BookingCard booking={bookings[bookings.length - 1]} />
                {bookings.length > 1 && (
                  <button onClick={() => setTab("bookings")} style={{
                    background: "none", border: "none", color: "#1a6db5",
                    fontSize: 13, cursor: "pointer", fontWeight: 700, marginTop: 8,
                    fontFamily: "Georgia, serif",
                  }}>View all {bookings.length} bookings →</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ BOOKINGS TAB ══════════════ */}
        {tab === "bookings" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f3460", margin: "0 0 18px" }}>📋 My Bookings</h2>
            {bookings.length === 0 ? (
              <div style={{ ...card, textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 16px" }}>No bookings yet</p>
                <button onClick={onGoToBook} style={{
                  background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                  border: "none", padding: "12px 28px", borderRadius: 16,
                  fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif",
                }}>Book Your First Service →</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[...bookings].reverse().map((b, i) => (
                  <div key={i} style={card}>
                    <BookingCard booking={b} full />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ PROFILE TAB ══════════════ */}
        {tab === "profile" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f3460", margin: "0 0 18px" }}>👤 My Profile</h2>
            <div style={card}>
              {/* Avatar */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0f3460,#1a6db5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px", fontSize: 32, fontWeight: 900, color: "white",
                }}>{displayName[0]?.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0f3460" }}>{displayName}</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>{user?.email}</div>
              </div>

              {!editMode ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Full Name", value: profile?.name || "—" },
                    { label: "Email", value: user?.email },
                    { label: "Phone", value: profile?.phone || "—" },
                    { label: "Member Since", value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "—" },
                    { label: "Total Bookings", value: bookings.length },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: "#0f3460", fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                  <button onClick={() => setEditMode(true)} style={{
                    background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                    border: "none", padding: "13px 0", borderRadius: 14, fontWeight: 800,
                    cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif", marginTop: 8,
                  }}>✏️ Edit Profile</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name</label>
                    <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inp }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 6 }}>Phone</label>
                    <input value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={{ ...inp }} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={handleSaveProfile} disabled={saving} style={{
                      flex: 1, background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                      border: "none", padding: "13px 0", borderRadius: 14, fontWeight: 800,
                      cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif",
                      opacity: saving ? 0.7 : 1,
                    }}>{saving ? "⏳ Saving..." : "✅ Save"}</button>
                    <button onClick={() => setEditMode(false)} style={{
                      flex: 1, background: "#f1f5f9", color: "#64748b",
                      border: "none", padding: "13px 0", borderRadius: 14, fontWeight: 700,
                      cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif",
                    }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleLogout} style={{
              width: "100%", marginTop: 14, background: "#fef2f2", color: "#dc2626",
              border: "1px solid #fecaca", padding: "13px 0", borderRadius: 14, fontWeight: 800,
              cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif",
            }}>🚪 Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, full }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f3460" }}>{booking.name}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{booking.bookedAt}</div>
        </div>
        <div style={{
          background: "linear-gradient(135deg,#0f3460,#1a6db5)",
          color: "white", padding: "5px 12px", borderRadius: 12,
          fontSize: 12, fontWeight: 800,
        }}>₹{booking.total}</div>
      </div>
      {full && (
        <>
          {booking.services?.map((s, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12, color: "#5a7fa0", padding: "4px 0",
              borderTop: i === 0 ? "1px solid #f1f5f9" : "none",
            }}>
              <span>{s.icon} {s.name} × {s.qty}</span>
              <span>₹{s.price * s.qty}</span>
            </div>
          ))}
          {booking.address && (
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>📍 {booking.address}</div>
          )}
          {booking.date && (
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>📅 {booking.date}</div>
          )}
        </>
      )}
    </div>
  );
}
