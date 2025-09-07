// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * @file Firebase configuration and initialization.
 * @description This file initializes the Firebase app and exports the auth and firestore services.
 * It uses environment variables for configuration to keep sensitive data secure.
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
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
