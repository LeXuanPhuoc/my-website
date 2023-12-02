


import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCr7RCk31SaXbRwWFaDvAlS4DGNOqC7frY",
  authDomain: "xpmart-3a618.firebaseapp.com",
  projectId: "xpmart-3a618",
  storageBucket: "xpmart-3a618.appspot.com",
  messagingSenderId: "687649757793",
  appId: "1:687649757793:web:cfadfa99f3456c626ee820"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;