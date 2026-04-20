import { useState, useEffect } from "react";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPanel from "./components/admin/AdminPanel";
import PublicSite from "./components/public/PublicSite";
import { defaultServices, defaultTestimonials, defaultInfo } from "./data/defaults";
import { db } from "./firebase/config";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const DOC = (key) => doc(db, "pama", key);

export default function App() {
  const [mode, setMode] = useState("public");
  const [services, setServices] = useState(defaultServices);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [info, setInfo] = useState(defaultInfo);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // ── REAL-TIME LISTENERS ─────────────────────────────────────────────────
  // These fire instantly on ALL devices/browsers when admin saves anything
  useEffect(() => {
    let loadCount = 0;
    const totalDocs = 4;

    const markLoaded = () => {
      loadCount++;
      if (loadCount >= totalDocs) setLoading(false);
    };

    // Listen to services
    const unsubServices = onSnapshot(DOC("services"), (snap) => {
      if (snap.exists()) setServices(snap.data().list);
      markLoaded();
    }, (err) => {
      console.error("Services listener error:", err);
      markLoaded();
    });

    // Listen to testimonials
    const unsubTestimonials = onSnapshot(DOC("testimonials"), (snap) => {
      if (snap.exists()) setTestimonials(snap.data().list);
      markLoaded();
    }, (err) => {
      console.error("Testimonials listener error:", err);
      markLoaded();
    });

    // Listen to info
    const unsubInfo = onSnapshot(DOC("info"), (snap) => {
      if (snap.exists()) setInfo(snap.data());
      markLoaded();
    }, (err) => {
      console.error("Info listener error:", err);
      markLoaded();
    });

    // Listen to bookings
    const unsubBookings = onSnapshot(DOC("bookings"), (snap) => {
      if (snap.exists()) setBookings(snap.data().list || []);
      markLoaded();
    }, (err) => {
      console.error("Bookings listener error:", err);
      markLoaded();
    });

    // Cleanup all listeners when app unmounts
    return () => {
      unsubServices();
      unsubTestimonials();
      unsubInfo();
      unsubBookings();
    };
  }, []);

  // ── SAVE FUNCTIONS (only called by admin) ───────────────────────────────
  const handleSetServices = async (val) => {
    const updated = typeof val === "function" ? val(services) : val;
    setServices(updated);
    await setDoc(DOC("services"), { list: updated });
  };

  const handleSetTestimonials = async (val) => {
    const updated = typeof val === "function" ? val(testimonials) : val;
    setTestimonials(updated);
    await setDoc(DOC("testimonials"), { list: updated });
  };

  const handleSetInfo = async (val) => {
    const updated = typeof val === "function" ? val(info) : val;
    setInfo(updated);
    await setDoc(DOC("info"), updated);
  };

  const handleNewBooking = async (booking) => {
    const updated = [...bookings, booking];
    setBookings(updated);
    await setDoc(DOC("bookings"), { list: updated });
  };

  // ── Admin keyboard shortcut ─────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") setMode("adminLogin");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // ── Loading screen ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f3460,#1a6db5)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif", color: "white", gap: 20,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900,
        }}>P</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>PAMA</div>
        <div style={{ fontSize: 13, color: "#bde0ff" }}>Loading your data…</div>
      </div>
    );
  }

  if (mode === "adminLogin") return (
    <AdminLogin onLogin={() => { setMode("admin"); setIsAdmin(true); }} />
  );

  if (mode === "admin") return (
    <AdminPanel
      services={services}         setServices={handleSetServices}
      testimonials={testimonials} setTestimonials={handleSetTestimonials}
      info={info}                 setInfo={handleSetInfo}
      bookings={bookings}
      onLogout={() => { setMode("public"); setIsAdmin(false); }}
    />
  );

  return (
    <div>
      <PublicSite
        services={services}
        testimonials={testimonials}
        info={info}
        onBooking={handleNewBooking}
      />
      <div
        title="Admin Access"
        onClick={() => setMode("adminLogin")}
        style={{
          position: "fixed", bottom: 10, right: 14,
          opacity: 0.25, fontSize: 11, cursor: "pointer",
          color: "#93c5fd", userSelect: "none",
        }}
      >⚙️ Admin</div>
    </div>
  );
}