import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBXX4Aw4W8iZUkyjNZJxRAMTTosLGZPdWE",
  authDomain: "projectv1-f0b6f.firebaseapp.com",
  projectId: "projectv1-f0b6f",
  storageBucket: "projectv1-f0b6f.appspot.com",
  messagingSenderId: "1059702998257",
  appId: "1:1059702998257:web:dc663dc8353eb5b8ee9550"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};