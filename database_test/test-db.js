import { db } from "./firebase.js";
import { doc, setDoc } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

await setDoc(doc(db, "test", "hello"), {
  message: "Firebase is working",
  score: 100,
  createdAt: new Date()
});

console.log("Write success");
