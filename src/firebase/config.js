// ✅ REPLACE the values below with YOUR Firebase config from Step 3
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAsVFoyEcgXIOhfkIkOWCp5e7t3nUsSA1M",
  authDomain: "pama-web-9b175.firebaseapp.com",
  databaseURL: "https://pama-web-9b175-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pama-web-9b175",
  storageBucket: "pama-web-9b175.firebasestorage.app",
  messagingSenderId: "629809125523",
  appId: "1:629809125523:web:3ee941b777ec97d5535566"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);