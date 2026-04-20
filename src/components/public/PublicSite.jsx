import { useState } from "react";
import Logo from "../Logo";
import QrSvg from "../QrSvg";
import { inp, cardStyle } from "../../utils/styles";

function PublicSite({ services, testimonials, info, onBooking }) {
  const [page, setPage] = useState("home");
  const [added, setAdded] = useState({});
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "" });

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
      setDone(false);
      setAdded({});
      setForm({ name: "", phone: "", address: "", date: "" });
      setPage("home");
    }, 3000);
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "linear-gradient(135deg,#e8f4fd,#ffffff 40%,#dbeeff)", color: "#1a2e4a" }}>

      {/* NAV */}
      <nav style={{
        background: "linear-gradient(90deg,#0f3460,#1a6db5)", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(15,52,96,0.3)", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ padding: "13px 0" }}><Logo /></div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["home", "services", "book", "contact"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: page === p ? "rgba(255,255,255,0.18)" : "transparent",
              border: page === p ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
              color: "white", padding: "8px 13px", borderRadius: 28, cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia,serif", textTransform: "capitalize",
              fontWeight: page === p ? 700 : 400
            }}>{p}</button>
          ))}
          {totalItems > 0 && (
            <button onClick={() => setPage("book")} style={{
              background: "#f0c040", border: "none", color: "#0f3460",
              padding: "8px 14px", borderRadius: 28, cursor: "pointer",
              fontWeight: 800, fontSize: 13
            }}>🛒 {totalItems}</button>
          )}
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div>
          <div style={{
            background: "linear-gradient(135deg,#0f3460,#1a6db5 60%,#4da6ff)",
            padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: -80, right: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-block", background: "rgba(255,255,255,0.15)",
                padding: "6px 18px", borderRadius: 30, color: "#bde0ff", fontSize: 13,
                marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: 1
              }}>✨ Professional Home Services</div>
              <h1 style={{
                color: "white", fontSize: "clamp(2rem,5vw,3.4rem)",
                fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: -1
              }}>
                {info.heroTitle.split(",")[0]},<br />
                <span style={{ color: "#7dd3fc" }}>{(info.heroTitle.split(",")[1] || " Perfectly Clean.").trim()}</span>
              </h1>
              <p style={{ color: "#bde0ff", fontSize: 17, maxWidth: 500, margin: "0 auto 34px", lineHeight: 1.7 }}>{info.tagline}</p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setPage("services")} style={{
                  background: "white", color: "#0f3460", border: "none",
                  padding: "15px 34px", borderRadius: 50, fontSize: 15, fontWeight: 800,
                  cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
                }}>Book a Service →</button>
                <button onClick={() => setPage("contact")} style={{
                  background: "transparent", color: "white",
                  border: "2px solid rgba(255,255,255,0.4)", padding: "15px 34px",
                  borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer"
                }}>Contact Us</button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#0f3460" }}>
            {[[info.totalCustomers, "Happy Customers"], ["4.9★", "Avg Rating"], ["₹25", "Starting Price"]].map(([v, l]) => (
              <div key={l} style={{ padding: "26px 16px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#7dd3fc", fontSize: 22, fontWeight: 900 }}>{v}</div>
                <div style={{ color: "#93c5fd", fontSize: 11, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Featured Services */}
          <div style={{ padding: "56px 24px", maxWidth: 940, margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 6, color: "#0f3460" }}>Our Services</h2>
            <p style={{ textAlign: "center", color: "#5a7fa0", marginBottom: 32 }}>Everything your home needs, at prices you'll love</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 16 }}>
              {active.slice(0, 6).map(s => (
                <div key={s.id} onClick={() => setPage("services")} style={{
                  background: "white", borderRadius: 20, padding: "20px 13px", textAlign: "center",
                  boxShadow: "0 4px 20px rgba(15,52,96,0.07)", cursor: "pointer",
                  border: "1px solid #e0eeff", position: "relative"
                }}>
                  {s.badge && (
                    <span style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "white", fontSize: 9, padding: "2px 7px", borderRadius: 16, fontWeight: 700 }}>{s.badge}</span>
                  )}
                  <div style={{ fontSize: 32, marginBottom: 9 }}>{s.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2e4a", marginBottom: 5, lineHeight: 1.3 }}>{s.name}</div>
                  <div style={{ color: "#0f3460", fontWeight: 800 }}>₹{s.price}</div>
                  {s.original && <div style={{ color: "#94a3b8", fontSize: 10, textDecoration: "line-through" }}>₹{s.original}</div>}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button onClick={() => setPage("services")} style={{
                background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                border: "none", padding: "13px 34px", borderRadius: 50, fontSize: 14,
                fontWeight: 700, cursor: "pointer"
              }}>View All Services →</button>
            </div>
          </div>

          {/* App Download */}
          <div style={{ background: "linear-gradient(135deg,#0f3460,#1a6db5)", padding: "56px 24px", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Download the PAMA App</h2>
            <p style={{ color: "#bde0ff", marginBottom: 32, fontSize: 14 }}>Book on the go – available soon on iOS & Android</p>
            <div style={{ display: "inline-block", background: "white", borderRadius: 22, padding: 18, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <QrSvg />
              <div style={{ marginTop: 10, fontSize: 11, color: "#5a7fa0", fontWeight: 700, letterSpacing: 1 }}>📱 COMING SOON</div>
            </div>
            <div style={{ marginTop: 24, color: "#bde0ff", fontSize: 14 }}>
              📞 Call us: <a href={`tel:${info.phone}`} style={{ color: "white", fontWeight: 800, textDecoration: "none", fontSize: 20 }}>{info.phone}</a>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ padding: "56px 24px", maxWidth: 940, margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, marginBottom: 32, color: "#0f3460" }}>What Customers Say</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 20 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff" }}>
                  <div style={{ color: "#f59e0b", fontSize: 15, marginBottom: 10 }}>{"★".repeat(+t.stars)}</div>
                  <p style={{ color: "#334155", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>"{t.text}"</p>
                  <div style={{ fontWeight: 700, color: "#0f3460", fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>{t.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SERVICES PAGE */}
      {page === "services" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f3460", marginBottom: 6 }}>Select Services</h1>
          <p style={{ color: "#5a7fa0", marginBottom: 28 }}>Add services to your cart and book in one go</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 18 }}>
            {active.map(s => (
              <div key={s.id} style={{ background: "white", borderRadius: 20, padding: "18px 14px", boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff", position: "relative" }}>
                {s.badge && (
                  <span style={{ position: "absolute", top: 10, right: 10, background: "#ef4444", color: "white", fontSize: 9, padding: "2px 7px", borderRadius: 16, fontWeight: 700 }}>{s.badge}</span>
                )}
                <div style={{ fontSize: 38, textAlign: "center", marginBottom: 9 }}>{s.icon}</div>
                {s.rating && <div style={{ fontSize: 10, color: "#5a7fa0", marginBottom: 5, textAlign: "center" }}>⭐ {s.rating} ({s.reviews})</div>}
                <div style={{ fontWeight: 700, color: "#1a2e4a", marginBottom: 7, fontSize: 13, lineHeight: 1.3 }}>{s.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                  <span style={{ color: "#0f3460", fontWeight: 800, fontSize: 17 }}>₹{s.price}</span>
                  {s.original && <span style={{ color: "#94a3b8", fontSize: 11, textDecoration: "line-through" }}>₹{s.original}</span>}
                </div>
                {!added[s.name] ? (
                  <button onClick={() => handleAdd(s.name)} style={{
                    width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                    border: "none", padding: "9px 0", borderRadius: 11, cursor: "pointer",
                    fontWeight: 700, fontSize: 13, fontFamily: "Georgia,serif"
                  }}>+ Add</button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#e8f4fd", borderRadius: 11, padding: "5px 11px" }}>
                    <button onClick={() => handleRemove(s.name)} style={{ background: "#0f3460", color: "white", border: "none", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: 17, fontWeight: 700, lineHeight: 1 }}>−</button>
                    <span style={{ fontWeight: 800, color: "#0f3460" }}>{added[s.name]}</span>
                    <button onClick={() => handleAdd(s.name)} style={{ background: "#0f3460", color: "white", border: "none", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: 17, fontWeight: 700, lineHeight: 1 }}>+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {totalItems > 0 && (
            <div onClick={() => setPage("book")} style={{
              position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)",
              background: "#0f3460", color: "white", padding: "15px 34px", borderRadius: 50,
              boxShadow: "0 8px 30px rgba(15,52,96,0.4)", display: "flex", alignItems: "center",
              gap: 18, zIndex: 200, cursor: "pointer", whiteSpace: "nowrap"
            }}>
              <span>🛒 {totalItems} service{totalItems > 1 ? "s" : ""}</span>
              <span style={{ background: "#7dd3fc", color: "#0f3460", fontWeight: 800, padding: "4px 14px", borderRadius: 28 }}>₹{totalPrice} → Book</span>
            </div>
          )}
        </div>
      )}

      {/* BOOK PAGE */}
      {page === "book" && (
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "40px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f3460", marginBottom: 8 }}>Booking</h1>
          {done ? (
            <div style={{ background: "white", borderRadius: 24, padding: 48, textAlign: "center", boxShadow: "0 8px 40px rgba(15,52,96,0.1)" }}>
              <div style={{ fontSize: 60, marginBottom: 18 }}>✅</div>
              <h2 style={{ color: "#0f3460", fontWeight: 800, marginBottom: 8 }}>Booking Confirmed!</h2>
              <p style={{ color: "#5a7fa0" }}>Our team will contact you shortly. Thank you for choosing PAMA!</p>
            </div>
          ) : totalItems === 0 ? (
            <div style={{ textAlign: "center", padding: 56 }}>
              <div style={{ fontSize: 56, marginBottom: 18 }}>🛒</div>
              <p style={{ color: "#5a7fa0", marginBottom: 22 }}>No services selected.</p>
              <button onClick={() => setPage("services")} style={{
                background: "#0f3460", color: "white", border: "none",
                padding: "13px 30px", borderRadius: 50, cursor: "pointer",
                fontWeight: 700, fontFamily: "Georgia,serif"
              }}>Browse Services</button>
            </div>
          ) : (
            <>
              <div style={{ ...cardStyle, marginBottom: 22 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>Your Selection</h3>
                {active.filter(s => added[s.name]).map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid #e0eeff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ color: "#5a7fa0", fontSize: 11 }}>×{added[s.name]}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#0f3460" }}>₹{s.price * added[s.name]}</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontWeight: 800, fontSize: 17, color: "#0f3460" }}>
                  <span>Total</span><span>₹{totalPrice}</span>
                </div>
              </div>
              <div style={cardStyle}>
                <h3 style={{ color: "#0f3460", marginBottom: 18, fontWeight: 700 }}>Your Details</h3>
                <form onSubmit={handleBook}>
                  {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["address", "Address", "text"], ["date", "Preferred Date", "date"]].map(([k, pl, t]) => (
                    <div key={k} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 5 }}>{pl}</label>
                      <input type={t} required value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={pl} style={{ ...inp, fontSize: 14 }} />
                    </div>
                  ))}
                  <button type="submit" style={{
                    width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                    border: "none", padding: "15px 0", borderRadius: 13, fontSize: 15, fontWeight: 800,
                    cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 6
                  }}>Confirm Booking ✓</button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* CONTACT PAGE */}
      {page === "contact" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f3460", marginBottom: 6 }}>Contact PAMA</h1>
          <p style={{ color: "#5a7fa0", marginBottom: 32 }}>We're here to help. Reach out anytime.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 18, marginBottom: 32 }}>
            {[
              ["📞", "Call Us", info.phone, `tel:${info.phone}`],
              ["📧", "Email", info.email, `mailto:${info.email}`],
              ["💬", "WhatsApp", "Chat Now", `https://wa.me/${info.whatsapp}`],
            ].map(([icon, label, val, href]) => (
              <a key={label} href={href} style={{
                background: "white", borderRadius: 20, padding: 24, textAlign: "center",
                boxShadow: "0 4px 20px rgba(15,52,96,0.07)", border: "1px solid #e0eeff", textDecoration: "none"
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: "#0f3460", marginBottom: 5 }}>{label}</div>
                <div style={{ color: "#1a6db5", fontSize: 13, fontWeight: 600 }}>{val}</div>
              </a>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,#0f3460,#1a6db5)", borderRadius: 24, padding: "46px 24px", textAlign: "center" }}>
            <h2 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Download the PAMA App</h2>
            <p style={{ color: "#bde0ff", marginBottom: 28, fontSize: 13 }}>Coming soon on iOS & Android</p>
            <div style={{ display: "inline-block", background: "white", borderRadius: 20, padding: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
              <QrSvg />
              <div style={{ marginTop: 8, fontSize: 11, color: "#5a7fa0", fontWeight: 700, letterSpacing: 1 }}>📱 COMING SOON</div>
            </div>
            <div style={{ marginTop: 22, color: "white", fontSize: 18, fontWeight: 800 }}>{info.phone}</div>
            <div style={{ color: "#bde0ff", fontSize: 12, marginTop: 4 }}>{info.hours}</div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#0a2240", color: "#5a7fa0", textAlign: "center", padding: "30px 24px", marginTop: 40 }}>
        <div style={{ color: "white", fontWeight: 800, fontSize: 20, marginBottom: 5, letterSpacing: 2 }}>PAMA</div>
        <div style={{ fontSize: 12, marginBottom: 12 }}>Professional Home Services · Trusted by {info.totalCustomers} families</div>
        <div style={{ fontSize: 11 }}>© 2026 PAMA. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default PublicSite;
