import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATeXQARHJXsxwJZJbwgBOFiLXDwO9Xqcs",
  authDomain: "miniblog-4c1c0.firebaseapp.com",
  projectId: "miniblog-4c1c0",
  storageBucket: "miniblog-4c1c0.firebasestorage.app",
  messagingSenderId: "776154585415",
  appId: "1:776154585415:web:2452ee18d85e1af8f05462"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };