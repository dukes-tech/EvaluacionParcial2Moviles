import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWZaVxjmRno1RsUGFiUSTczwoZOexX2A4",
  authDomain: "ad-prueba-a36ed.firebaseapp.com",
  projectId: "ad-prueba-a36ed",
  storageBucket: "ad-prueba-a36ed.firebasestorage.app",
  messagingSenderId: "196824131714",
  appId: "1:196824131714:web:bdfc0ffd015bbe6f9bac9b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;