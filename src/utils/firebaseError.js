export function buildMissingFirebaseEnvError(missingKeys) {
  const err = new Error(
    `Missing Firebase env vars: ${missingKeys.join(", ")}. Add them in Vercel Project Settings and redeploy.`
  );
  err.code = "missing-firebase-env";
  return err;
}

export function formatFirebaseError(err) {
  const code = err?.code || "";

  if (code === "missing-firebase-env") return err.message;
  if (code === "permission-denied") return "Firestore rules blocked this action (permission-denied).";
  if (code === "unauthenticated") return "This action needs Firebase auth (unauthenticated).";
  if (code === "unavailable") return "Firebase is temporarily unavailable. Please try again.";
  if (code === "deadline-exceeded") return "Firebase request timed out. Please retry.";
  if (code === "invalid-argument") return "Invalid data sent to Firestore.";
  if (code === "failed-precondition") return "Firestore request failed (failed-precondition).";
  if (code === "resource-exhausted") return "Firestore quota or rate limit reached.";
  if (code === "not-found") return "Target Firestore document not found.";

  const rawMessage = err?.message?.trim();
  if (!rawMessage) return "Unknown Firebase error.";

  return rawMessage.length > 180 ? `${rawMessage.slice(0, 177)}...` : rawMessage;
}
