// Firebase Authentication + User Firestore operations
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "./config";

// ── Firestore user doc reference ─────────────────────────────────────────────
export const userDoc = (uid) => doc(db, "users", uid);

// ── Sign Up ──────────────────────────────────────────────────────────────────
export async function signUpUser({ name, email, password, phone = "" }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });

  // Create user profile document in Firestore
  await setDoc(userDoc(cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    phone,
    createdAt: new Date().toISOString(),
    bookings: [],
  });

  return cred.user;
}

// ── Sign In ──────────────────────────────────────────────────────────────────
export async function signInUser({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ── Sign Out ─────────────────────────────────────────────────────────────────
export async function signOutUser() {
  await signOut(auth);
}

// ── Get User Profile from Firestore ─────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(userDoc(uid));
  return snap.exists() ? snap.data() : null;
}

// ── Update User Profile ──────────────────────────────────────────────────────
export async function updateUserProfile(uid, data) {
  await updateDoc(userDoc(uid), data);
}

// ── Save a booking to user's Firestore doc ───────────────────────────────────
export async function saveBookingToUser(uid, booking) {
  await updateDoc(userDoc(uid), {
    bookings: arrayUnion(booking),
  });
}

// ── Auth State Listener ──────────────────────────────────────────────────────
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
