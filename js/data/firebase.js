import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSsz8iRV4A2pN0Xv2lfFPscovqONg01Ws",
    authDomain: "yzu-go.firebaseapp.com",
    projectId: "yzu-go",
    storageBucket: "yzu-go.firebasestorage.app",
    messagingSenderId: "703903780258",
    appId: "1:703903780258:web:e86ae40f163dc41c3d36fb",
    measurementId: "G-W7JKJB7865"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);