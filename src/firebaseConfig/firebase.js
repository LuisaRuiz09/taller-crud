import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOoBdBWL4R3lNSAypTG_6eNzglWpo9lBg",
  authDomain: "crud-prueba-7a037.firebaseapp.com",
  projectId: "crud-prueba-7a037",
  storageBucket: "crud-prueba-7a037.appspot.com",
  messagingSenderId: "719959675636",
  appId: "1:719959675636:web:c0c1b27b4b8dc7c6d6c4a1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

