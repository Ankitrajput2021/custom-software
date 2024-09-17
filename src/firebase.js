import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB6LEOEBM5uMwZ6edi7Fflw17HheSzkiu0",
    authDomain: "software-99999.firebaseapp.com",
    projectId: "software-99999",
    storageBucket: "software-99999.appspot.com",
    messagingSenderId: "636699265109",
    appId: "1:636699265109:web:b3c62905c9f0f4972cecdc",
    measurementId: "G-6KSZ4ZW5TG"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
