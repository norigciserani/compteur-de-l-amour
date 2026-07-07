// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    increment
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

const zoneCompteurs = document.getElementById("compteurs");

const querySnapshot = await getDocs(collection(db, "people"));

zoneCompteurs.innerHTML = "";


querySnapshot.forEach((document) => {

    const personne = document.data();

    zoneCompteurs.innerHTML += `

        <div class="carte">

            <h2>${personne.name}</h2>

            <div class="compteur">
                ${personne.count}
            </div>

            <button onclick="modifierCompteur('${document.id}', -1)">
                -1
            </button>

            <button onclick="modifierCompteur('${document.id}', 1)">
                +1
            </button>

        </div>

    `;

});


window.modifierCompteur = async function(id, valeur) {

    if (valeur === -1 && document.getElementById(id).innerText <= 0) {
        return;
    }

    const personneRef = doc(db, "people", id);

    await updateDoc(personneRef, {
        count: increment(valeur)
    });

    location.reload();

};