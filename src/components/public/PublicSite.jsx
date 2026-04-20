import { useState } from "react";
import Logo from "../Logo";
import QrSvg from "../QrSvg";
import { inp, cardStyle } from "../../utils/styles";

function PublicSite({ services, testimonials, info, onBooking }) {
  const [page, setPage] = useState("home");
  const [added, setAdded] = useState({});
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const active = services.filter(s => s.active);
  const totalItems = Object.values(added).reduce((a, b) => a + b, 0);
  const totalPrice = active.reduce((sum, s) => sum + (added[s.name] || 0) * s.price, 0);

  const handleAdd = (n) => setAdded(p => ({ ...p, [n]: (p[n] || 0) + 1 }));
  const handleRemove = (n) => setAdded(p => {
    const x = { ...p };
    if (x[n] > 1) x[n]--;
    else delete x[n];
    return x;
  });

  const handleBook = (e) => {
    e.preventDefault();
    onBooking({
      ...form,
      services: active.filter(s => added[s.name]).map(s => ({ ...s, qty: added[s.name] })),
      total: totalPrice,
      bookedAt: new Date().toLocaleString(),
    });
    setDone(true);
    setTimeout(() => {
      setDone(false); setAdded({});
      setForm({ name: "", phone: "", address: "", date: "" });
      setPage("home");
    }, 3000);
  };

  const goTo = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "linear-gradient(135deg,#e8f4fd,#ffffff 40%,#dbeeff)", color: "#1a2e4a" }}>

      {/* ── NAV ── */}
      <nav style={{
        background: "linear-gradient(90deg,#0f3460,#1a6db5)", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(15,52,96,0.3)", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ padding: "13px 0" }} onClick={() => goTo("home")} ><Logo /></div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desk-nav">
          {["home", "services", "book", "contact"].map(p => (
            <button key={p} onClick={() => goTo(p)} style={{
              background: page === p ? "rgba(255,255,255,0.18)" : "transparent",
              border: page === p ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
              color: "white", padding: "8px 13px", borderRadius: 28, cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia,serif", textTransform: "capitalize",
              fontWeight: page === p ? 700 : 400,
            }}>{p}</button>
          ))}
          {totalItems > 0 && (
            <button onClick={() => goTo("book")} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "8px 14px", borderRadius: 28, cursor: "pointer", fontWeight: 800, fontSize: 13,
            }}>🛒 {totalItems}</button>
          )}
        </div>

        {/* Mobile right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="mob-nav">
          {totalItems > 0 && (
            <button onClick={() => goTo("book")} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "7px 12px", borderRadius: 24, cursor: "pointer", fontWeight: 800, fontSize: 13,
            }}>🛒 {totalItems}</button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontSize: 18,
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          background: "linear-gradient(135deg,#0f3460,#1a6db5)",
          padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 4,
          position: "sticky", top: 50, zIndex: 99,
          boxShadow: "0 8px 20px rgba(15,52,96,0.3)",
        }}>
          {["home", "services", "book", "contact"].map(p => (
            <button key={p} onClick={() => goTo(p)} style={{
              background: page === p ? "rgba(255,255,255,0.18)" : "transparent",
              border: page === p ? "1px solid rgba(255,255,255,0.3)" : "none",
              color: "white", padding: "12px 16px", borderRadius: 12,
              cursor: "pointer", fontSize: 14, fontFamily: "Georgia,serif",
              textTransform: "capitalize", textAlign: "left", fontWeight: page === p ? 700 : 400,
            }}>{p === "home" ? "🏠" : p === "services" ? "🛠️" : p === "book" ? "📅" : "📞"} {p.charAt(0).toUpperCase() + p.slice(1)}</button>
          ))}
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

          {/* Featured Services */}
          <div style={{ padding: "40px 16px", maxWidth: 940, margin: "0 auto" }}>
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

      {/* ── SERVICES PAGE ── */}
      {page === "services" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 16px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 6 }}>Select Services</h1>
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
              <div style={cardStyle}>
                <h3 style={{ color: "#0f3460", marginBottom: 16, fontWeight: 700, fontSize: 14 }}>Your Details</h3>
                <form onSubmit={handleBook}>
                  {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["address", "Address", "text"], ["date", "Preferred Date", "date"]].map(([k, pl, t]) => (
                    <div key={k} style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>{pl}</label>
                      <input type={t} required value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={pl} style={{ ...inp, fontSize: 14 }} />
                    </div>
                  ))}
                  <button type="submit" style={{
                    width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)",
                    color: "white", border: "none", padding: "14px 0", borderRadius: 12,
                    fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 4,
                  }}>Confirm Booking ✓</button>
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
        @media (min-width: 768px) {
          .mob-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desk-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default PublicSite;