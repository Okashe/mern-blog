// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e08f4.firebaseapp.com",
  projectId: "mern-blog-e08f4",
  storageBucket: "mern-blog-e08f4.appspot.com",
  messagingSenderId: "996822381891",
  appId: "1:996822381891:web:b67975f85a3eecc6cc6bf6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

