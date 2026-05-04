import { useState, useEffect, useRef, lazy, Suspense } from "react";
import PublicSite from "./components/public/PublicSite";
import UserAuth from "./components/public/UserAuth";
import UserDashboard from "./components/public/UserDashboard";
import { defaultServices, defaultTestimonials, defaultInfo } from "./data/defaults";
import { db, isFirebaseConfigured, missingFirebaseEnvKeys } from "./firebase/config";
import { onAuthChange, saveBookingToUser } from "./firebase/authService";
import { arrayUnion, doc, onSnapshot, setDoc } from "firebase/firestore";
import { buildMissingFirebaseEnvError, formatFirebaseError } from "./utils/firebaseError";

const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));
const DOC = (key) => doc(db, "pama", key);

const withTimeout = (promise, label, ms = 60000) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    promise
      .then((value) => { clearTimeout(timer); resolve(value); })
      .catch((err) => { clearTimeout(timer); reject(err); });
  });

export default function App() {
  const [mode, setMode] = useState("public");
  const [services, setServices] = useState(defaultServices);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [info, setInfo] = useState(defaultInfo);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showUserAuth, setShowUserAuth] = useState(false);

  const servicesRef = useRef(services);
  const testimonialsRef = useRef(testimonials);
  const infoRef = useRef(info);

  const ensureFirebaseConfigured = () => {
    if (isFirebaseConfigured) return;
    throw buildMissingFirebaseEnvError(missingFirebaseEnvKeys);
  };

  useEffect(() => { servicesRef.current = services; }, [services]);
  useEffect(() => { testimonialsRef.current = testimonials; }, [testimonials]);
  useEffect(() => { infoRef.current = info; }, [info]);

  useEffect(() => {
    if (!isFirebaseConfigured) { setAuthChecked(true); return; }
    const unsub = onAuthChange((user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const configErr = buildMissingFirebaseEnvError(missingFirebaseEnvKeys);
      setFirebaseStatus(configErr.message);
      setLoading(false);
      return;
    }
    const loaded = { services: false, testimonials: false, info: false };
    const markLoaded = (key) => {
      if (loaded[key]) return;
      loaded[key] = true;
      if (loaded.services && loaded.testimonials && loaded.info) setLoading(false);
    };
    const loadTimeout = setTimeout(() => setLoading(false), 4000);
    const unsubServices = onSnapshot(DOC("services"), (snap) => {
      if (snap.exists()) setServices(snap.data().list);
      markLoaded("services");
    }, (err) => { setFirebaseStatus(formatFirebaseError(err)); markLoaded("services"); });
    const unsubTestimonials = onSnapshot(DOC("testimonials"), (snap) => {
      if (snap.exists()) setTestimonials(snap.data().list);
      markLoaded("testimonials");
    }, (err) => { setFirebaseStatus(formatFirebaseError(err)); markLoaded("testimonials"); });
    const unsubInfo = onSnapshot(DOC("info"), (snap) => {
      if (snap.exists()) setInfo(snap.data());
      markLoaded("info");
    }, (err) => { setFirebaseStatus(formatFirebaseError(err)); markLoaded("info"); });
    return () => { clearTimeout(loadTimeout); unsubServices(); unsubTestimonials(); unsubInfo(); };
  }, []);

  useEffect(() => {
    if (mode !== "admin" || !isFirebaseConfigured) return;
    const unsubBookings = onSnapshot(DOC("bookings"), (snap) => {
      if (snap.exists()) setBookings(snap.data().list || []);
      else setBookings([]);
    }, (err) => { setFirebaseStatus(formatFirebaseError(err)); });
    return () => unsubBookings();
  }, [mode]);

  const handleSetServices = async (val) => {
    ensureFirebaseConfigured();
    const prev = servicesRef.current;
    const updated = typeof val === "function" ? val(prev) : val;
    servicesRef.current = updated; setServices(updated);
    try { await withTimeout(setDoc(DOC("services"), { list: updated }), "Save services"); }
    catch (err) { servicesRef.current = prev; setServices(prev); setFirebaseStatus(formatFirebaseError(err)); throw err; }
  };

  const handleSetTestimonials = async (val) => {
    ensureFirebaseConfigured();
    const prev = testimonialsRef.current;
    const updated = typeof val === "function" ? val(prev) : val;
    testimonialsRef.current = updated; setTestimonials(updated);
    try { await withTimeout(setDoc(DOC("testimonials"), { list: updated }), "Save testimonials"); }
    catch (err) { testimonialsRef.current = prev; setTestimonials(prev); setFirebaseStatus(formatFirebaseError(err)); throw err; }
  };

  const handleSetInfo = async (val) => {
    ensureFirebaseConfigured();
    const prev = infoRef.current;
    const updated = typeof val === "function" ? val(prev) : val;
    infoRef.current = updated; setInfo(updated);
    try { await setDoc(DOC("info"), updated); }
    catch (err) { infoRef.current = prev; setInfo(prev); setFirebaseStatus(formatFirebaseError(err)); throw err; }
  };

  const handleNewBooking = async (booking) => {
    ensureFirebaseConfigured();
    try {
      await withTimeout(
        setDoc(DOC("bookings"), { list: arrayUnion(booking) }, { merge: true }),
        "Save booking"
      );
      if (currentUser?.uid) {
        await saveBookingToUser(currentUser.uid, booking);
      }
    } catch (err) {
      setFirebaseStatus(formatFirebaseError(err));
      throw err;
    }
  };

  useEffect(() => {
    const h = (e) => { if (e.ctrlKey && e.shiftKey && e.key === "A") setMode("adminLogin"); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (loading || !authChecked) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg,#0f3460,#1a6db5)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif", color: "white", gap: 20,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900,
        }}>P</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>PAMA</div>
        <div style={{ fontSize: 13, color: "#bde0ff" }}>Loading your data…</div>
      </div>
    );
  }

  if (mode === "adminLogin") return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: "Georgia, serif" }}>Loading admin...</div>}>
      <AdminLogin onLogin={() => { setMode("admin"); setIsAdmin(true); }} />
    </Suspense>
  );

  if (mode === "admin") return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: "Georgia, serif" }}>Loading admin...</div>}>
      <AdminPanel
        services={services} setServices={handleSetServices}
        testimonials={testimonials} setTestimonials={handleSetTestimonials}
        info={info} setInfo={handleSetInfo}
        bookings={bookings}
        firebaseStatus={firebaseStatus}
        onLogout={() => { setMode("public"); setIsAdmin(false); }}
      />
    </Suspense>
  );

  if (mode === "userDashboard" && currentUser) return (
    <UserDashboard
      user={currentUser}
      services={services}
      onGoToBook={() => setMode("public")}
      onGoHome={() => setMode("public")}
      onLogout={() => { setCurrentUser(null); setMode("public"); }}
    />
  );

  return (
    <div>
      <PublicSite
        services={services}
        testimonials={testimonials}
        info={info}
        onBooking={handleNewBooking}
        currentUser={currentUser}
        onOpenUserAuth={() => setShowUserAuth(true)}
        onOpenDashboard={() => setMode("userDashboard")}
      />
      {showUserAuth && (
        <UserAuth
          onClose={() => setShowUserAuth(false)}
          onLogin={(user) => {
            setCurrentUser(user);
            setShowUserAuth(false);
            setMode("userDashboard");
          }}
        />
      )}
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
