import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCp7fAYiV7HDipDUMNODnjmEFUz_8Q2-lI",
  authDomain: "makerit.firebaseapp.com",
  databaseURL: "https://makerit.firebaseio.com",
  projectId: "makerit",
  storageBucket: "makerit.appspot.com",
  messagingSenderId: "487045086155",
  appId: "1:487045086155:web:19555d4346da93b8a1144e",
  measurementId: "G-NRCSYW1979"
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

// here we can export reusable database references
export {
  db, auth, firebaseApp
}