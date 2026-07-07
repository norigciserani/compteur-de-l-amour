// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8SKA469sXIC1-8N6YFiRE7dk4ply3FoI",
  authDomain: "compteur-95dae.firebaseapp.com",
  projectId: "compteur-95dae",
  storageBucket: "compteur-95dae.firebasestorage.app",
  messagingSenderId: "144167951112",
  appId: "1:144167951112:web:c0bd53874b0cc7c70b2abd"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Connexion à Firestore
const db = getFirestore(app);

console.log("Firebase connecté !");

const querySnapshot = await getDocs(collection(db, "people"));

querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
});