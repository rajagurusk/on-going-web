// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import authentication module
import { getFirestore } from "firebase/firestore";  // Import Firestore module
// import { auth, db } from "../../firebase/firebase"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ogKTI_ubf4pb74OPLjTMz0OCZGPXjCc",
  authDomain: "dharavivegshop.firebaseapp.com",
  projectId: "dharavivegshop",
  storageBucket: "dharavivegshop.firebasestorage.app",
  messagingSenderId: "708707725100",
  appId: "1:708707725100:web:72a55b0111b9dee1128689",
  measurementId: "G-Q6CH56VSQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);  // For user authentication
const db = getFirestore(app);  // For Firestore database

export { auth, db,analytics  };
