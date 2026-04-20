// All Firebase read/write functions used across the app
import { db } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DOC = (key) => doc(db, "pama", key);

// ── READ ─────────────────────────────────────────────────────────────────────

export async function loadServices() {
  const snap = await getDoc(DOC("services"));
  return snap.exists() ? snap.data().list : null;
}

export async function loadTestimonials() {
  const snap = await getDoc(DOC("testimonials"));
  return snap.exists() ? snap.data().list : null;
}

export async function loadInfo() {
  const snap = await getDoc(DOC("info"));
  return snap.exists() ? snap.data() : null;
}

export async function loadBookings() {
  const snap = await getDoc(DOC("bookings"));
  return snap.exists() ? snap.data().list : [];
}

// ── WRITE ────────────────────────────────────────────────────────────────────

export async function saveServices(list) {
  await setDoc(DOC("services"), { list });
}

export async function saveTestimonials(list) {
  await setDoc(DOC("testimonials"), { list });
}

export async function saveInfo(data) {
  await setDoc(DOC("info"), data);
}

export async function saveBooking(bookingsList) {
  await setDoc(DOC("bookings"), { list: bookingsList });
}