import { useState, useEffect } from "react";
import Logo from "../Logo";
import QrSvg from "../QrSvg";
import { inp, cardStyle } from "../../utils/styles";

// ── Service Banners data ─────────────────────────────────────────────────────
const BANNERS = [
  {
    id: 1, emoji: "🧹", title: "Deep Clean Deal",
    subtitle: "Save 40% on full home deep cleaning this month",
    tag: "LIMITED OFFER",
    bg: "linear-gradient(135deg,#0f3460 0%,#1a6db5 100%)",
    accent: "#f0c040",
  },
  {
    id: 2, emoji: "🚽", title: "Bathroom Package",
    subtitle: "3 bathrooms cleaned for just ₹75. Book before Sunday!",
    tag: "WEEKEND SPECIAL",
    bg: "linear-gradient(135deg,#065a46,#0d9668)",
    accent: "#fde68a",
  },
  {
    id: 3, emoji: "👗", title: "Complete Wardrobe",
    subtitle: "Organize, fold & iron your entire wardrobe — ₹497 flat",
    tag: "MOST POPULAR",
    bg: "linear-gradient(135deg,#581c87,#9333ea)",
    accent: "#fbcfe8",
  },
  {
    id: 4, emoji: "🧊", title: "Fridge Cleaning",
    subtitle: "Deep clean + deodorize. First time customers get 20% off",
    tag: "NEW USER OFFER",
    bg: "linear-gradient(135deg,#7c2d12,#c2410c)",
    accent: "#fed7aa",
  },
];

// ── Validation helpers ───────────────────────────────────────────────────────
function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number";

  if (!form.address.trim()) errors.address = "Address is required";
  else if (form.address.trim().length < 10) errors.address = "Please enter a more complete address";

  if (!form.date) errors.date = "Preferred date is required";
  else {
    const chosen = new Date(form.date);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (chosen < today) errors.date = "Date cannot be in the past";
  }
  return errors;
}

// ── ServiceBanners component ─────────────────────────────────────────────────
function ServiceBanners({ onBook }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4500);
    return () => clearInterval(iv);
  }, []);
  const b = BANNERS[idx];
  return (
    <div style={{ padding: "24px 16px 0", maxWidth: 940, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f3460", margin: 0 }}>🎯 Special Offers</h2>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>{idx + 1} / {BANNERS.length}</span>
      </div>
      <div style={{
        background: b.bg, borderRadius: 20, padding: "22px 22px",
        color: "white", position: "relative", overflow: "hidden", minHeight: 130,
        transition: "background 0.5s ease",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -30, right: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontSize: 42 }}>{b.emoji}</div>
          <div style={{ flex: 1 }}>
            <span style={{
              background: b.accent, color: "#1a2e4a",
              fontSize: 9, fontWeight: 900, letterSpacing: 1,
              padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 6,
            }}>{b.tag}</span>
            <h3 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 4px" }}>{b.title}</h3>
            <p style={{ fontSize: 12, opacity: 0.85, margin: "0 0 12px", lineHeight: 1.4 }}>{b.subtitle}</p>
            <button onClick={onBook} style={{
              background: b.accent, color: "#1a2e4a", border: "none",
              padding: "8px 16px", borderRadius: 18, fontWeight: 800,
              cursor: "pointer", fontSize: 12, fontFamily: "Georgia, serif",
            }}>Book Now →</button>
          </div>
        </div>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 20 : 7, height: 7, borderRadius: 10, padding: 0,
            background: i === idx ? "#1a6db5" : "#bde0ff",
            border: "none", cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Login Wall component ─────────────────────────────────────────────────────
function LoginWall({ onOpenUserAuth, onGoHome, label }) {
  return (
    <div style={{ maxWidth: 480, margin: "60px auto", padding: "0 16px", textAlign: "center" }}>
      <div style={{
        background: "white", borderRadius: 28, padding: "48px 32px",
        boxShadow: "0 8px 40px rgba(15,52,96,0.12)", border: "1px solid #e8f0fb",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f3460", margin: "0 0 10px" }}>Sign In Required</h2>
        <p style={{ color: "#5a7fa0", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px" }}>
          Please sign in or create an account to {label}.<br />It only takes a minute!
        </p>
        <button onClick={onOpenUserAuth} style={{
          width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)",
          color: "white", border: "none", padding: "14px 0", borderRadius: 14,
          fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif",
          marginBottom: 10,
        }}>🔑 Sign In / Sign Up</button>
        <button onClick={onGoHome} style={{
          width: "100%", background: "#f1f5f9", color: "#64748b",
          border: "none", padding: "12px 0", borderRadius: 14,
          fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia, serif",
        }}>← Back to Home</button>
      </div>
    </div>
  );
}

// ── Main PublicSite ──────────────────────────────────────────────────────────
function PublicSite({ services, testimonials, info, onBooking, currentUser, onOpenUserAuth, onOpenDashboard }) {
  const [page, setPage] = useState("home");
  const [added, setAdded] = useState({});
  const [done, setDone] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "" });
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const active = services.filter(s => s.active);
  const totalItems = Object.values(added).reduce((a, b) => a + b, 0);
  const totalPrice = active.reduce((sum, s) => sum + (added[s.name] || 0) * s.price, 0);

  const handleAdd = (n) => {
    if (!currentUser) { onOpenUserAuth(); return; }
    setAdded(p => ({ ...p, [n]: (p[n] || 0) + 1 }));
  };
  const handleRemove = (n) => setAdded(p => {
    const x = { ...p };
    if (x[n] > 1) x[n]--;
    else delete x[n];
    return x;
  });

  const handleFieldChange = (k, val) => {
    setForm(p => ({ ...p, [k]: val }));
    if (touched[k]) {
      const errs = validateForm({ ...form, [k]: val });
      setFormErrors(p => ({ ...p, [k]: errs[k] }));
    }
  };

  const handleFieldBlur = (k) => {
    setTouched(p => ({ ...p, [k]: true }));
    const errs = validateForm(form);
    setFormErrors(p => ({ ...p, [k]: errs[k] }));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setBookingError("");
    const allTouched = { name: true, phone: true, address: true, date: true };
    setTouched(allTouched);
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await onBooking({
        ...form,
        phone: form.phone.replace(/\s+/g, ""),
        services: active.filter(s => added[s.name]).map(s => ({ ...s, qty: added[s.name] })),
        total: totalPrice,
        bookedAt: new Date().toLocaleString(),
        userId: currentUser?.uid || null,
        userEmail: currentUser?.email || null,
      });
      setDone(true);
      setTimeout(() => {
        setDone(false); setAdded({});
        setForm({ name: "", phone: "", address: "", date: "" });
        setFormErrors({}); setTouched({});
        setPage("home");
      }, 3500);
    } catch (err) {
      console.error("Booking save failed:", err);
      setBookingError("Booking failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goTo = (p) => {
    // Guard: services and book pages require login
    if ((p === "services" || p === "book") && !currentUser) {
      setPage(p + "_locked");
      setMenuOpen(false);
      window.scrollTo(0, 0);
      return;
    }
    setPage(p); setMenuOpen(false); window.scrollTo(0, 0);
  };

  const navItems = ["home", "services", "book", "contact"];
  const activeNavPage = page.replace("_locked", "");

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "linear-gradient(135deg,#e8f4fd,#ffffff 40%,#dbeeff)", color: "#1a2e4a" }}>

      {/* ── NAV ── */}
      <nav style={{
        background: "linear-gradient(90deg,#0f3460,#1a6db5)", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(15,52,96,0.3)", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ padding: "13px 0", cursor: "pointer" }} onClick={() => goTo("home")}><Logo /></div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desk-nav">
          {navItems.map(p => (
            <button key={p} onClick={() => goTo(p)} style={{
              background: activeNavPage === p ? "rgba(255,255,255,0.18)" : "transparent",
              border: activeNavPage === p ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
              color: "white", padding: "8px 13px", borderRadius: 28, cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia,serif", textTransform: "capitalize",
              fontWeight: activeNavPage === p ? 700 : 400,
            }}>{p}</button>
          ))}
          {totalItems > 0 && (
            <button onClick={() => goTo("book")} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "8px 14px", borderRadius: 28, cursor: "pointer", fontWeight: 800, fontSize: 13,
            }}>🛒 {totalItems}</button>
          )}
          {currentUser ? (
            <button onClick={onOpenDashboard} style={{
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)",
              color: "white", padding: "7px 13px", borderRadius: 28, cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia,serif", fontWeight: 700,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", background: "#f0c040",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 900, color: "#0f3460",
              }}>{(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}</span>
              My Account
            </button>
          ) : (
            <button onClick={onOpenUserAuth} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "8px 15px", borderRadius: 28, cursor: "pointer",
              fontWeight: 800, fontSize: 13, fontFamily: "Georgia,serif",
            }}>🔑 Sign In</button>
          )}
        </div>

        {/* Mobile nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="mob-nav">
          {totalItems > 0 && (
            <button onClick={() => goTo("book")} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "7px 12px", borderRadius: 24, cursor: "pointer", fontWeight: 800, fontSize: 13,
            }}>🛒 {totalItems}</button>
          )}
          {currentUser ? (
            <button onClick={onOpenDashboard} style={{
              width: 34, height: 34, borderRadius: "50%", background: "#f0c040",
              border: "none", color: "#0f3460", fontWeight: 900, fontSize: 14,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>{(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}</button>
          ) : (
            <button onClick={onOpenUserAuth} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "7px 12px", borderRadius: 24, cursor: "pointer",
              fontWeight: 800, fontSize: 12, fontFamily: "Georgia,serif",
            }}>🔑 Sign In</button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontSize: 18,
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "linear-gradient(135deg,#0f3460,#1a6db5)",
          padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 4,
          position: "sticky", top: 50, zIndex: 99,
          boxShadow: "0 8px 20px rgba(15,52,96,0.3)",
        }}>
          {navItems.map(p => (
            <button key={p} onClick={() => goTo(p)} style={{
              background: activeNavPage === p ? "rgba(255,255,255,0.18)" : "transparent",
              border: activeNavPage === p ? "1px solid rgba(255,255,255,0.3)" : "none",
              color: "white", padding: "12px 16px", borderRadius: 12,
              cursor: "pointer", fontSize: 14, fontFamily: "Georgia,serif",
              textTransform: "capitalize", textAlign: "left",
              fontWeight: activeNavPage === p ? 700 : 400,
            }}>{p === "home" ? "🏠" : p === "services" ? "🛠️" : p === "book" ? "📅" : "📞"} {p.charAt(0).toUpperCase() + p.slice(1)}</button>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", marginTop: 6, paddingTop: 10 }}>
            {currentUser ? (
              <button onClick={() => { setMenuOpen(false); onOpenDashboard(); }} style={{
                background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.4)",
                color: "white", padding: "12px 16px", borderRadius: 12,
                cursor: "pointer", fontSize: 14, fontFamily: "Georgia,serif",
                textAlign: "left", fontWeight: 700, width: "100%",
              }}>👤 My Account ({(currentUser.displayName || currentUser.email || "User").split(" ")[0]})</button>
            ) : (
              <button onClick={() => { setMenuOpen(false); onOpenUserAuth(); }} style={{
                background: "#f0c040", border: "none", color: "#0f3460",
                padding: "12px 16px", borderRadius: 12,
                cursor: "pointer", fontSize: 14, fontFamily: "Georgia,serif",
                textAlign: "left", fontWeight: 800, width: "100%",
              }}>🔑 Sign In / Sign Up</button>
            )}
          </div>
        </div>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <div>
          {/* Hero */}
          <div style={{
            background: "linear-gradient(135deg,#0f3460,#1a6db5 60%,#4da6ff)",
            padding: "60px 20px 50px", textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: -80, right: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-block", background: "rgba(255,255,255,0.15)",
                padding: "6px 16px", borderRadius: 30, color: "#bde0ff",
                fontSize: 12, marginBottom: 18, border: "1px solid rgba(255,255,255,0.2)",
              }}>✨ Professional Home Services</div>
              <h1 style={{
                color: "white", fontSize: "clamp(1.7rem,6vw,3.2rem)",
                fontWeight: 900, margin: "0 0 14px", lineHeight: 1.15,
              }}>
                {info.heroTitle.split(",")[0]},<br />
                <span style={{ color: "#7dd3fc" }}>{(info.heroTitle.split(",")[1] || " Perfectly Clean.").trim()}</span>
              </h1>
              <p style={{ color: "#bde0ff", fontSize: 15, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>{info.tagline}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => goTo("services")} style={{
                  background: "white", color: "#0f3460", border: "none",
                  padding: "13px 28px", borderRadius: 50, fontSize: 14, fontWeight: 800,
                  cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                }}>Book a Service →</button>
                <button onClick={() => goTo("contact")} style={{
                  background: "transparent", color: "white",
                  border: "2px solid rgba(255,255,255,0.4)",
                  padding: "13px 28px", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>Contact Us</button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#0f3460" }}>
            {[[info.totalCustomers, "Customers"], ["4.9★", "Rating"], ["₹25", "Starting"]].map(([v, l]) => (
              <div key={l} style={{ padding: "18px 8px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#7dd3fc", fontSize: 18, fontWeight: 900 }}>{v}</div>
                <div style={{ color: "#93c5fd", fontSize: 10, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* ── SERVICE BANNERS (shown always) ── */}
          <ServiceBanners onBook={() => goTo("services")} />

          {/* Featured Services */}
          <div style={{ padding: "32px 16px", maxWidth: 940, margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, marginBottom: 6, color: "#0f3460" }}>Our Services</h2>
            <p style={{ textAlign: "center", color: "#5a7fa0", marginBottom: 24, fontSize: 13 }}>Everything your home needs</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 12 }}>
              {active.slice(0, 6).map(s => (
                <div key={s.id} onClick={() => goTo("services")} style={{
                  background: "white", borderRadius: 18, padding: "16px 10px", textAlign: "center",
                  boxShadow: "0 4px 20px rgba(15,52,96,0.07)", cursor: "pointer",
                  border: "1px solid #e0eeff", position: "relative",
                }}>
                  {s.badge && <span style={{ position: "absolute", top: 7, right: 7, background: "#ef4444", color: "white", fontSize: 8, padding: "2px 6px", borderRadius: 12, fontWeight: 700 }}>{s.badge}</span>}
                  <div style={{ fontSize: 28, marginBottom: 7 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1a2e4a", marginBottom: 4, lineHeight: 1.3 }}>{s.name}</div>
                  <div style={{ color: "#0f3460", fontWeight: 800, fontSize: 13 }}>₹{s.price}</div>
                  {s.original && <div style={{ color: "#94a3b8", fontSize: 10, textDecoration: "line-through" }}>₹{s.original}</div>}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 22 }}>
              <button onClick={() => goTo("services")} style={{
                background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 13,
                fontWeight: 700, cursor: "pointer",
              }}>View All Services →</button>
            </div>
          </div>

          {/* App Download */}
          <div style={{ background: "linear-gradient(135deg,#0f3460,#1a6db5)", padding: "44px 20px", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Download the PAMA App</h2>
            <p style={{ color: "#bde0ff", marginBottom: 26, fontSize: 13 }}>Book on the go – coming soon</p>
            <div style={{ display: "inline-block", background: "white", borderRadius: 18, padding: 14, boxShadow: "0 16px 50px rgba(0,0,0,0.3)" }}>
              <QrSvg />
              <div style={{ marginTop: 8, fontSize: 10, color: "#5a7fa0", fontWeight: 700 }}>📱 COMING SOON</div>
            </div>
            <div style={{ marginTop: 20, color: "#bde0ff", fontSize: 13 }}>
              📞 <a href={`tel:${info.phone}`} style={{ color: "white", fontWeight: 800, textDecoration: "none", fontSize: 18 }}>{info.phone}</a>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ padding: "40px 16px", maxWidth: 940, margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, marginBottom: 26, color: "#0f3460" }}>What Customers Say</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: "white", borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff" }}>
                  <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 8 }}>{"★".repeat(+t.stars)}</div>
                  <p style={{ color: "#334155", fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>"{t.text}"</p>
                  <div style={{ fontWeight: 700, color: "#0f3460", fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>{t.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICES PAGE — login wall ── */}
      {page === "services_locked" && (
        <LoginWall onOpenUserAuth={onOpenUserAuth} onGoHome={() => setPage("home")} label="browse and select services" />
      )}

      {/* ── SERVICES PAGE ── */}
      {page === "services" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 16px" }}>
          {/* Service banners at top of services page */}
          <ServiceBanners onBook={() => {}} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 6, marginTop: 28 }}>Select Services</h1>
          <p style={{ color: "#5a7fa0", marginBottom: 22, fontSize: 13 }}>Add services and book in one go</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
            {active.map(s => (
              <div key={s.id} style={{ background: "white", borderRadius: 18, padding: "16px 12px", boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff", position: "relative" }}>
                {s.badge && <span style={{ position: "absolute", top: 9, right: 9, background: "#ef4444", color: "white", fontSize: 8, padding: "2px 6px", borderRadius: 12, fontWeight: 700 }}>{s.badge}</span>}
                <div style={{ fontSize: 34, textAlign: "center", marginBottom: 7 }}>{s.icon}</div>
                {s.rating && <div style={{ fontSize: 10, color: "#5a7fa0", marginBottom: 4, textAlign: "center" }}>⭐ {s.rating} ({s.reviews})</div>}
                <div style={{ fontWeight: 700, color: "#1a2e4a", marginBottom: 6, fontSize: 12, lineHeight: 1.3 }}>{s.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ color: "#0f3460", fontWeight: 800, fontSize: 15 }}>₹{s.price}</span>
                  {s.original && <span style={{ color: "#94a3b8", fontSize: 10, textDecoration: "line-through" }}>₹{s.original}</span>}
                </div>
                {!added[s.name] ? (
                  <button onClick={() => handleAdd(s.name)} style={{
                    width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                    border: "none", padding: "9px 0", borderRadius: 10, cursor: "pointer",
                    fontWeight: 700, fontSize: 12, fontFamily: "Georgia,serif",
                  }}>+ Add</button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#e8f4fd", borderRadius: 10, padding: "5px 10px" }}>
                    <button onClick={() => handleRemove(s.name)} style={{ background: "#0f3460", color: "white", border: "none", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: 16, fontWeight: 700, lineHeight: 1 }}>−</button>
                    <span style={{ fontWeight: 800, color: "#0f3460" }}>{added[s.name]}</span>
                    <button onClick={() => handleAdd(s.name)} style={{ background: "#0f3460", color: "white", border: "none", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: 16, fontWeight: 700, lineHeight: 1 }}>+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {totalItems > 0 && (
            <div onClick={() => goTo("book")} style={{
              position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
              background: "#0f3460", color: "white", padding: "13px 24px",
              borderRadius: 50, boxShadow: "0 8px 30px rgba(15,52,96,0.4)",
              display: "flex", alignItems: "center", gap: 14,
              zIndex: 200, cursor: "pointer", whiteSpace: "nowrap", fontSize: 14,
            }}>
              <span>🛒 {totalItems} service{totalItems > 1 ? "s" : ""}</span>
              <span style={{ background: "#7dd3fc", color: "#0f3460", fontWeight: 800, padding: "4px 12px", borderRadius: 24 }}>₹{totalPrice} → Book</span>
            </div>
          )}
        </div>
      )}

      {/* ── BOOK PAGE — login wall ── */}
      {page === "book_locked" && (
        <LoginWall onOpenUserAuth={onOpenUserAuth} onGoHome={() => setPage("home")} label="book a service" />
      )}

      {/* ── BOOK PAGE ── */}
      {page === "book" && (
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "28px 16px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 8 }}>Booking</h1>
          {done ? (
            <div style={{ background: "white", borderRadius: 22, padding: 40, textAlign: "center", boxShadow: "0 8px 40px rgba(15,52,96,0.1)" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: "#0f3460", fontWeight: 800, marginBottom: 8 }}>Booking Confirmed!</h2>
              <p style={{ color: "#5a7fa0", fontSize: 14 }}>Our team will contact you shortly. Thank you for choosing PAMA!</p>
            </div>
          ) : totalItems === 0 ? (
            <div style={{ textAlign: "center", padding: 48 }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🛒</div>
              <p style={{ color: "#5a7fa0", marginBottom: 20, fontSize: 14 }}>No services selected.</p>
              <button onClick={() => goTo("services")} style={{
                background: "#0f3460", color: "white", border: "none",
                padding: "12px 28px", borderRadius: 50, cursor: "pointer",
                fontWeight: 700, fontFamily: "Georgia,serif", fontSize: 14,
              }}>Browse Services</button>
            </div>
          ) : (
            <>
              {/* Selected services summary */}
              <div style={{ ...cardStyle, marginBottom: 18 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 12, fontWeight: 700, fontSize: 14 }}>Your Selection</h3>
                {active.filter(s => added[s.name]).map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #e0eeff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ color: "#5a7fa0", fontSize: 11 }}>×{added[s.name]}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#0f3460", fontSize: 14 }}>₹{s.price * added[s.name]}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 800, fontSize: 16, color: "#0f3460" }}>
                  <span>Total</span><span>₹{totalPrice}</span>
                </div>
              </div>

              {/* Booking form */}
              <div style={cardStyle}>
                <h3 style={{ color: "#0f3460", marginBottom: 16, fontWeight: 700, fontSize: 14 }}>Your Details</h3>
                {bookingError && (
                  <div style={{
                    background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca",
                    borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 12, fontWeight: 600,
                  }}>{bookingError}</div>
                )}
                <form onSubmit={handleBook} noValidate>

                  {/* Full Name */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>
                      Full Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => handleFieldChange("name", e.target.value)}
                      onBlur={() => handleFieldBlur("name")}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        ...inp, fontSize: 14,
                        borderColor: formErrors.name ? "#ef4444" : undefined,
                        outline: formErrors.name ? "none" : undefined,
                        boxShadow: formErrors.name ? "0 0 0 2px rgba(239,68,68,0.15)" : undefined,
                      }}
                    />
                    {formErrors.name && (
                      <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontWeight: 600 }}>⚠ {formErrors.name}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>
                      Phone Number <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => handleFieldChange("phone", e.target.value)}
                      onBlur={() => handleFieldBlur("phone")}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      style={{
                        ...inp, fontSize: 14,
                        borderColor: formErrors.phone ? "#ef4444" : undefined,
                        boxShadow: formErrors.phone ? "0 0 0 2px rgba(239,68,68,0.15)" : undefined,
                      }}
                    />
                    {formErrors.phone && (
                      <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontWeight: 600 }}>⚠ {formErrors.phone}</div>
                    )}
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>
                      Address <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => handleFieldChange("address", e.target.value)}
                      onBlur={() => handleFieldBlur("address")}
                      placeholder="e.g. Flat 4B, Sector 18, Noida"
                      style={{
                        ...inp, fontSize: 14,
                        borderColor: formErrors.address ? "#ef4444" : undefined,
                        boxShadow: formErrors.address ? "0 0 0 2px rgba(239,68,68,0.15)" : undefined,
                      }}
                    />
                    {formErrors.address && (
                      <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontWeight: 600 }}>⚠ {formErrors.address}</div>
                    )}
                  </div>

                  {/* Date */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>
                      Preferred Date <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => handleFieldChange("date", e.target.value)}
                      onBlur={() => handleFieldBlur("date")}
                      style={{
                        ...inp, fontSize: 14,
                        borderColor: formErrors.date ? "#ef4444" : undefined,
                        boxShadow: formErrors.date ? "0 0 0 2px rgba(239,68,68,0.15)" : undefined,
                      }}
                    />
                    {formErrors.date && (
                      <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontWeight: 600 }}>⚠ {formErrors.date}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)",
                      color: "white", border: "none", padding: "14px 0", borderRadius: 12,
                      fontSize: 15, fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer",
                      fontFamily: "Georgia,serif", opacity: submitting ? 0.75 : 1,
                    }}
                  >{submitting ? "⏳ Placing Booking..." : "Confirm Booking ✓"}</button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── CONTACT PAGE ── */}
      {page === "contact" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 16px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 6 }}>Contact PAMA</h1>
          <p style={{ color: "#5a7fa0", marginBottom: 24, fontSize: 13 }}>We're here to help. Reach out anytime.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
            {[
              ["📞", "Call Us", info.phone, `tel:${info.phone}`],
              ["📧", "Email", info.email, `mailto:${info.email}`],
              ["💬", "WhatsApp", "Chat Now", `https://wa.me/${info.whatsapp}`],
            ].map(([icon, label, val, href]) => (
              <a key={label} href={href} style={{
                background: "white", borderRadius: 18, padding: 20, textAlign: "center",
                boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff", textDecoration: "none",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: "#0f3460", marginBottom: 4, fontSize: 14 }}>{label}</div>
                <div style={{ color: "#1a6db5", fontSize: 12, fontWeight: 600 }}>{val}</div>
              </a>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,#0f3460,#1a6db5)", borderRadius: 22, padding: "36px 20px", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Download the PAMA App</h2>
            <p style={{ color: "#bde0ff", marginBottom: 22, fontSize: 12 }}>Coming soon on iOS & Android</p>
            <div style={{ display: "inline-block", background: "white", borderRadius: 18, padding: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
              <QrSvg />
              <div style={{ marginTop: 7, fontSize: 10, color: "#5a7fa0", fontWeight: 700 }}>📱 COMING SOON</div>
            </div>
            <div style={{ marginTop: 18, color: "white", fontSize: 16, fontWeight: 800 }}>{info.phone}</div>
            <div style={{ color: "#bde0ff", fontSize: 11, marginTop: 3 }}>{info.hours}</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#0a2240", color: "#5a7fa0", textAlign: "center", padding: "24px 16px", marginTop: 40 }}>
        <div style={{ color: "white", fontWeight: 800, fontSize: 18, marginBottom: 4, letterSpacing: 2 }}>PAMA</div>
        <div style={{ fontSize: 11, marginBottom: 8 }}>Professional Home Services · Trusted by {info.totalCustomers} families</div>
        <div style={{ fontSize: 10 }}>© 2026 PAMA. All rights reserved.</div>
      </footer>

      <style>{`
        @media (min-width: 768px) { .mob-nav { display: none !important; } }
        @media (max-width: 767px) { .desk-nav { display: none !important; } }
      `}</style>
    </div>
  );
}

export default PublicSite;
