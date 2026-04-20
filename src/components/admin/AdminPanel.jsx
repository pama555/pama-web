import { useState } from "react";
import Logo from "../Logo";
import { inp, cardStyle } from "../../utils/styles";

const EMOJI_LIST = [
  "🏠","🚽","🧊","📦","🍽️","🥗","🧹","🧺","👗","👔","🪣","🧴","🪥","🧽","🫧",
  "🛁","🚿","🪞","🪑","🛋️","🪟","🚪","🧸","🪴","🌿","💡","🔧","🔨","🪛","🧰",
  "🏡","🌸","✨","⭐","💎","🎯","🚀","💼","📋","🗂️","📁","🗃️","🪄","🎁","🛒",
];

function AdminPanel({ services, setServices, testimonials, setTestimonials, info, setInfo, bookings, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editSvc, setEditSvc] = useState(null);
  const [newSvc, setNewSvc] = useState({ icon: "🏠", name: "", price: "", original: "", badge: "", active: true });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);
  const [editInfo, setEditInfo] = useState({ ...info });
  const [toast, setToast] = useState("");
  const [editTesti, setEditTesti] = useState(null);
  const [newTesti, setNewTesti] = useState({ name: "", location: "", text: "", stars: 5 });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const saveInfo = () => { setInfo({ ...editInfo }); showToast("✅ Business info saved!"); };

  const addService = () => {
    if (!newSvc.name || !newSvc.price) return showToast("❌ Name and price required.");
    setServices(prev => [...prev, {
      ...newSvc, id: Date.now(), price: +newSvc.price,
      original: newSvc.original ? +newSvc.original : null, rating: null, reviews: null
    }]);
    setNewSvc({ icon: "🏠", name: "", price: "", original: "", badge: "", active: true });
    showToast("✅ Service added!");
  };

  const updateService = () => {
    setServices(prev => prev.map(s => s.id === editSvc.id
      ? { ...editSvc, price: +editSvc.price, original: editSvc.original ? +editSvc.original : null }
      : s));
    setEditSvc(null);
    showToast("✅ Service updated!");
  };

  const deleteService = (id) => { setServices(prev => prev.filter(s => s.id !== id)); showToast("🗑️ Deleted."); };
  const toggleService = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));

  const addTesti = () => {
    if (!newTesti.name || !newTesti.text) return showToast("❌ Name and text required.");
    setTestimonials(prev => [...prev, { ...newTesti, id: Date.now(), stars: +newTesti.stars }]);
    setNewTesti({ name: "", location: "", text: "", stars: 5 });
    showToast("✅ Review added!");
  };

  const deleteTesti = (id) => { setTestimonials(prev => prev.filter(t => t.id !== id)); showToast("🗑️ Deleted."); };

  const updateTesti = () => {
    setTestimonials(prev => prev.map(t => t.id === editTesti.id ? { ...editTesti, stars: +editTesti.stars } : t));
    setEditTesti(null);
    showToast("✅ Review updated!");
  };

  const tabs = [
    ["dashboard", "📊", "Dashboard"],
    ["services", "🛠️", "Services"],
    ["bookings", "📋", "Bookings"],
    ["testimonials", "⭐", "Reviews"],
    ["info", "⚙️", "Business Info"],
  ];

  const Btn = ({ children, onClick, color = "#0f3460", text = "white", full = false }) => (
    <button onClick={onClick} style={{
      background: color, color: text, border: "none",
      padding: "9px 16px", borderRadius: 22, cursor: "pointer",
      fontWeight: 700, fontSize: 12, fontFamily: "Georgia, serif",
      width: full ? "100%" : "auto",
    }}>{children}</button>
  );

  // Emoji Picker Component
  const EmojiPicker = ({ onSelect, onClose }) => (
    <div style={{
      position: "absolute", top: "110%", left: 0, zIndex: 1000,
      background: "white", borderRadius: 16, padding: 12,
      boxShadow: "0 8px 40px rgba(15,52,96,0.18)",
      border: "1px solid #e0eeff", width: 260,
    }}>
      <div style={{ fontSize: 11, color: "#5a7fa0", fontWeight: 600, marginBottom: 8 }}>Pick an emoji</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {EMOJI_LIST.map(e => (
          <button key={e} onClick={() => { onSelect(e); onClose(); }} style={{
            background: "none", border: "1px solid #e0eeff", borderRadius: 8,
            fontSize: 20, cursor: "pointer", padding: "4px 6px",
            transition: "background 0.15s",
          }}
            onMouseEnter={ev => ev.target.style.background = "#e8f4fd"}
            onMouseLeave={ev => ev.target.style.background = "none"}
          >{e}</button>
        ))}
      </div>
    </div>
  );

  const switchTab = (id) => { setTab(id); setSidebarOpen(false); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Georgia, serif", background: "#f0f6ff" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          background: "#0f3460", color: "white", padding: "13px 24px",
          borderRadius: 14, zIndex: 9999, fontWeight: 600,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)", fontSize: 14,
          whiteSpace: "nowrap",
        }}>{toast}</div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200,
        }} />
      )}

      {/* Sidebar */}
      <div style={{
        width: 220,
        background: "linear-gradient(180deg,#0f3460,#1a5ea0)",
        minHeight: "100vh",
        display: "flex", flexDirection: "column", flexShrink: 0,
        position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto",
        zIndex: 300,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        // Desktop: always visible
        ...(window.innerWidth >= 768 ? { position: "sticky", transform: "none" } : {}),
      }}>
        <div style={{ padding: "26px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Logo />
          <div style={{ color: "#93c5fd", fontSize: 10, marginTop: 5, letterSpacing: 2 }}>ADMIN PANEL</div>
        </div>
        <div style={{ flex: 1, padding: "14px 10px" }}>
          {tabs.map(([id, icon, label]) => (
            <button key={id} onClick={() => switchTab(id)} style={{
              width: "100%",
              background: tab === id ? "rgba(255,255,255,0.18)" : "transparent",
              border: tab === id ? "1px solid rgba(255,255,255,0.28)" : "1px solid transparent",
              color: "white", padding: "12px 14px", borderRadius: 12, cursor: "pointer",
              fontSize: 13, fontFamily: "Georgia,serif", textAlign: "left",
              marginBottom: 4, fontWeight: tab === id ? 700 : 400,
            }}>{icon} {label}</button>
          ))}
        </div>
        <div style={{ padding: "14px 10px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={onLogout} style={{
            width: "100%", background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)", color: "white",
            padding: "11px 14px", borderRadius: 12, cursor: "pointer",
            fontSize: 13, fontFamily: "Georgia,serif", textAlign: "left", fontWeight: 600,
          }}>🚪 Logout</button>
        </div>
      </div>

      {/* Main content wrapper */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Mobile top bar */}
        <div style={{
          background: "linear-gradient(90deg,#0f3460,#1a6db5)",
          padding: "12px 16px", display: "flex", alignItems: "center",
          justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
          // Hide on desktop
          ...(window.innerWidth >= 768 ? { display: "none" } : {}),
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontSize: 18,
          }}>☰</button>
          <Logo size={18} />
          <div style={{ width: 40 }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "20px 16px", overflowY: "auto" }}>

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 4 }}>Welcome back, Admin 👋</h1>
              <p style={{ color: "#5a7fa0", marginBottom: 20, fontSize: 13 }}>Here's your PAMA overview.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  ["🛠️", "Total Services", services.length, "#0f3460"],
                  ["✅", "Active", services.filter(s => s.active).length, "#059669"],
                  ["📋", "Bookings", bookings.length, "#7c3aed"],
                  ["⭐", "Reviews", testimonials.length, "#d97706"],
                ].map(([icon, label, val, color]) => (
                  <div key={label} style={{ ...cardStyle, textAlign: "center", padding: 16 }}>
                    <div style={{ fontSize: 26, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color }}>{val}</div>
                    <div style={{ fontSize: 11, color: "#5a7fa0", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={cardStyle}>
                  <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700, fontSize: 14 }}>📋 Recent Bookings</h3>
                  {bookings.length === 0
                    ? <p style={{ color: "#94a3b8", fontSize: 13 }}>No bookings yet.</p>
                    : bookings.slice(-5).reverse().map((b, i) => (
                      <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f6ff", display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                          <div style={{ color: "#5a7fa0", fontSize: 11 }}>{b.date}</div>
                        </div>
                        <div style={{ color: "#0f3460", fontWeight: 700, fontSize: 13 }}>₹{b.total}</div>
                      </div>
                    ))}
                </div>
                <div style={cardStyle}>
                  <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700, fontSize: 14 }}>⚙️ Business Info</h3>
                  {[["📞", info.phone], ["📧", info.email], ["🕐", info.hours], ["📍", info.address]].map(([k, v]) => (
                    <div key={k} style={{ padding: "7px 0", borderBottom: "1px solid #f0f6ff", display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 14 }}>{k}</span>
                      <span style={{ fontWeight: 600, fontSize: 12, color: "#1a2e4a" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SERVICES */}
          {tab === "services" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 18 }}>Manage Services</h1>

              {/* Add Service Form */}
              <div style={{ ...cardStyle, marginBottom: 20 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>➕ Add New Service</h3>

                {/* Emoji Picker Row */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 6 }}>Emoji Icon</label>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{
                      background: "#f0f6ff", border: "1.5px solid #e0eeff",
                      borderRadius: 12, padding: "10px 16px", cursor: "pointer",
                      fontSize: 22, display: "flex", alignItems: "center", gap: 8,
                      fontFamily: "Georgia,serif",
                    }}>
                      {newSvc.icon} <span style={{ fontSize: 12, color: "#5a7fa0" }}>▼</span>
                    </button>
                    {showEmojiPicker && (
                      <EmojiPicker
                        onSelect={e => setNewSvc(p => ({ ...p, icon: e }))}
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    )}
                  </div>
                </div>

                {/* Other fields */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  {[["name", "Service Name"], ["price", "Price ₹"], ["original", "Original ₹"], ["badge", "Badge (NEW etc)"]].map(([k, pl]) => (
                    <div key={k}>
                      <label style={{ fontSize: 11, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 4 }}>{pl}</label>
                      <input
                        value={newSvc[k]}
                        onChange={e => setNewSvc(p => ({ ...p, [k]: e.target.value }))}
                        placeholder={pl}
                        style={{ ...inp, fontSize: 13 }}
                      />
                    </div>
                  ))}
                </div>
                <Btn onClick={addService} full>➕ Add Service</Btn>
              </div>

              {/* Services List */}
              <div style={cardStyle}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>All Services ({services.length})</h3>
                {services.map(s => (
                  <div key={s.id}>
                    {editSvc?.id === s.id ? (
                      <div style={{ background: "#f0f6ff", borderRadius: 14, padding: 14, marginBottom: 10 }}>
                        {/* Edit emoji */}
                        <div style={{ marginBottom: 10 }}>
                          <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 4 }}>Icon</label>
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <button onClick={() => setShowEditEmojiPicker(!showEditEmojiPicker)} style={{
                              background: "white", border: "1.5px solid #e0eeff",
                              borderRadius: 10, padding: "8px 12px", cursor: "pointer",
                              fontSize: 20, display: "flex", alignItems: "center", gap: 6,
                            }}>
                              {editSvc.icon} <span style={{ fontSize: 11, color: "#5a7fa0" }}>▼</span>
                            </button>
                            {showEditEmojiPicker && (
                              <EmojiPicker
                                onSelect={e => setEditSvc(p => ({ ...p, icon: e }))}
                                onClose={() => setShowEditEmojiPicker(false)}
                              />
                            )}
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                          {[["name", "Name"], ["price", "Price"], ["original", "Original"], ["badge", "Badge"]].map(([k, pl]) => (
                            <div key={k}>
                              <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 3 }}>{pl}</label>
                              <input value={editSvc[k] ?? ""} onChange={e => setEditSvc(p => ({ ...p, [k]: e.target.value }))} style={{ ...inp, fontSize: 12 }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <Btn onClick={updateService}>💾 Save</Btn>
                          <Btn onClick={() => setEditSvc(null)} color="#94a3b8">Cancel</Btn>
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: "12px 0", borderBottom: "1px solid #f0f6ff" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                            <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: 13, color: s.active ? "#1a2e4a" : "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {s.name}
                                {s.badge ? <span style={{ background: "#ef4444", color: "white", fontSize: 9, padding: "1px 6px", borderRadius: 8, marginLeft: 6 }}>{s.badge}</span> : null}
                              </div>
                              <div style={{ color: "#5a7fa0", fontSize: 11 }}>₹{s.price} · {s.active ? "✅ Active" : "⏸ Hidden"}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                            <Btn onClick={() => toggleService(s.id)} color={s.active ? "#d97706" : "#059669"}>{s.active ? "Hide" : "Show"}</Btn>
                            <Btn onClick={() => setEditSvc({ ...s })} color="#1a6db5">Edit</Btn>
                            <Btn onClick={() => deleteService(s.id)} color="#ef4444">Del</Btn>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {tab === "bookings" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 18 }}>Bookings ({bookings.length})</h1>
              {bookings.length === 0 ? (
                <div style={{ ...cardStyle, textAlign: "center", padding: 50 }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
                  <p style={{ color: "#5a7fa0", fontSize: 13 }}>No bookings yet.</p>
                </div>
              ) : (
                <div style={cardStyle}>
                  {bookings.slice().reverse().map((b, i) => (
                    <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid #f0f6ff" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: "#0f3460", fontSize: 14 }}>{b.name}</div>
                          <div style={{ color: "#5a7fa0", fontSize: 12, margin: "3px 0" }}>📞 {b.phone}</div>
                          <div style={{ color: "#5a7fa0", fontSize: 12 }}>📅 {b.date}</div>
                          <div style={{ color: "#5a7fa0", fontSize: 12, marginBottom: 8 }}>📍 {b.address}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {b.services?.map((s, j) => (
                              <span key={j} style={{ background: "#e8f4fd", color: "#0f3460", padding: "3px 8px", borderRadius: 16, fontSize: 10, fontWeight: 600 }}>
                                {s.icon} {s.name} ×{s.qty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontWeight: 800, color: "#0f3460", fontSize: 18 }}>₹{b.total}</div>
                          <div style={{ background: "#dcfce7", color: "#059669", padding: "3px 10px", borderRadius: 16, fontSize: 10, fontWeight: 700, marginTop: 5 }}>✅ Done</div>
                          <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>{b.bookedAt}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TESTIMONIALS */}
          {tab === "testimonials" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 18 }}>Customer Reviews</h1>
              <div style={{ ...cardStyle, marginBottom: 20 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>➕ Add Review</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  {[["name", "Customer Name"], ["location", "City"]].map(([k, pl]) => (
                    <div key={k}>
                      <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 4 }}>{pl}</label>
                      <input value={newTesti[k]} onChange={e => setNewTesti(p => ({ ...p, [k]: e.target.value }))} style={{ ...inp, fontSize: 13 }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 4 }}>Stars (1–5)</label>
                  <input type="number" min={1} max={5} value={newTesti.stars} onChange={e => setNewTesti(p => ({ ...p, stars: e.target.value }))} style={{ ...inp, fontSize: 13, maxWidth: 80 }} />
                </div>
                <textarea value={newTesti.text} onChange={e => setNewTesti(p => ({ ...p, text: e.target.value }))} placeholder="Review text…" rows={3} style={{ ...inp, resize: "vertical", marginBottom: 12 }} />
                <Btn onClick={addTesti} full>Add Review</Btn>
              </div>
              <div style={cardStyle}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>All Reviews ({testimonials.length})</h3>
                {testimonials.map(t => (
                  <div key={t.id}>
                    {editTesti?.id === t.id ? (
                      <div style={{ background: "#f0f6ff", borderRadius: 14, padding: 14, marginBottom: 10 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                          {[["name", "Name"], ["location", "City"]].map(([k, pl]) => (
                            <div key={k}>
                              <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 3 }}>{pl}</label>
                              <input value={editTesti[k]} onChange={e => setEditTesti(p => ({ ...p, [k]: e.target.value }))} style={{ ...inp, fontSize: 12 }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <label style={{ fontSize: 11, color: "#5a7fa0", display: "block", marginBottom: 3 }}>Stars</label>
                          <input type="number" min={1} max={5} value={editTesti.stars} onChange={e => setEditTesti(p => ({ ...p, stars: e.target.value }))} style={{ ...inp, fontSize: 12, maxWidth: 80 }} />
                        </div>
                        <textarea value={editTesti.text} onChange={e => setEditTesti(p => ({ ...p, text: e.target.value }))} rows={2} style={{ ...inp, fontSize: 12, resize: "vertical", marginBottom: 10 }} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <Btn onClick={updateTesti}>💾 Save</Btn>
                          <Btn onClick={() => setEditTesti(null)} color="#94a3b8">Cancel</Btn>
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: "12px 0", borderBottom: "1px solid #f0f6ff", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ minWidth: 0, paddingRight: 10 }}>
                          <div style={{ color: "#f59e0b", fontSize: 13 }}>{"★".repeat(+t.stars)}{"☆".repeat(5 - +t.stars)}</div>
                          <p style={{ fontSize: 12, color: "#334155", margin: "4px 0", lineHeight: 1.5 }}>"{t.text}"</p>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#0f3460" }}>{t.name} · <span style={{ color: "#5a7fa0", fontWeight: 400 }}>{t.location}</span></div>
                        </div>
                        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                          <Btn onClick={() => setEditTesti({ ...t })} color="#1a6db5">Edit</Btn>
                          <Btn onClick={() => deleteTesti(t.id)} color="#ef4444">Del</Btn>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUSINESS INFO */}
          {tab === "info" && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f3460", marginBottom: 18 }}>Business Info</h1>
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>🏢 Contact Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                  {[
                    ["phone", "📞 Phone Number"],
                    ["email", "📧 Email"],
                    ["whatsapp", "💬 WhatsApp Number"],
                    ["address", "📍 Address"],
                    ["hours", "🕐 Working Hours"],
                    ["totalCustomers", "👥 Customers Served"],
                  ].map(([k, pl]) => (
                    <div key={k}>
                      <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 5 }}>{pl}</label>
                      <input value={editInfo[k] ?? ""} onChange={e => setEditInfo(p => ({ ...p, [k]: e.target.value }))} style={inp} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...cardStyle, marginBottom: 16 }}>
                <h3 style={{ color: "#0f3460", marginBottom: 14, fontWeight: 700 }}>🌐 Homepage Content</h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    ["heroTitle", "Hero Heading"],
                    ["tagline", "Tagline / Subtitle"],
                  ].map(([k, pl]) => (
                    <div key={k}>
                      <label style={{ fontSize: 12, color: "#5a7fa0", fontWeight: 600, display: "block", marginBottom: 5 }}>{pl}</label>
                      <input value={editInfo[k] ?? ""} onChange={e => setEditInfo(p => ({ ...p, [k]: e.target.value }))} style={inp} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={saveInfo} style={{
                width: "100%", background: "linear-gradient(135deg,#0f3460,#1a6db5)", color: "white",
                border: "none", padding: "15px 0", borderRadius: 14, fontSize: 15,
                fontWeight: 800, cursor: "pointer", fontFamily: "Georgia,serif",
              }}>💾 Save All Changes</button>
            </div>
          )}

        </div>
      </div>

      {/* Desktop sidebar spacer */}
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar { position: sticky !important; transform: none !important; }
          .mobile-topbar { display: none !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar { position: fixed !important; }
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;