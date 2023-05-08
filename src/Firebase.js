import { initializeApp, firebase } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, query, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ46kHkX2hNSz5Fu1t_jhGy9iDvHNyuQM",
  authDomain: "festiwaldo.firebaseapp.com",
  projectId: "festiwaldo",
  storageBucket: "festiwaldo.appspot.com",
  messagingSenderId: "180763891346",
  appId: "1:180763891346:web:290893ddabba7851c0f84b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const q = query(collection(db, "characters"));
