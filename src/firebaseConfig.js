import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "k-website-7a295.firebaseapp.com",
  projectId: "k-website-7a295",
  storageBucket: "k-website-7a295.appspot.com",
  messagingSenderId: "413471897528",
  appId: "1:413471897528:web:1eb7c7d34dd0e48131014d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
