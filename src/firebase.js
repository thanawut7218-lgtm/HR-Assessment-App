import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_qVi-4ZqnKgDzcj8u3ZQion2CjX5yoe4",
  authDomain: "hr-assessment-4e6d4.firebaseapp.com",
  projectId: "hr-assessment-4e6d4",
  storageBucket: "hr-assessment-4e6d4.firebasestorage.app",
  messagingSenderId: "1026821351807",
  appId: "1:1026821351807:web:15c08767933f9dfbca524a",
  measurementId: "G-569Z47L8EF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
