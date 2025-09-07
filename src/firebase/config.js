// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

/**
 * @file Firebase configuration and initialization.
 * @description This file initializes the Firebase app and exports the auth and firestore services.
 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtFFUFSfT6sOqnxJVrZ3-H3i66Cga2th0",
  authDomain: "ai-first-developer.firebaseapp.com",
  projectId: "ai-first-developer",
  storageBucket: "ai-first-developer.firebasestorage.app",
  messagingSenderId: "914515554273",
  appId: "1:914515554273:web:d8b69ab353166c30196ca0",
  measurementId: "G-SXJPECZJZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Firebase authentication service instance.
 * @type {import("firebase/auth").Auth}
 */
export const auth = getAuth(app);

/**
 * Firebase Firestore database instance.
 * @type {import("firebase/firestore").Firestore}
 */
export const db = getFirestore(app);

/**
 * Firebase Analytics instance.
 * @type {import("firebase/analytics").Analytics}
 */
export const analytics = getAnalytics(app);
