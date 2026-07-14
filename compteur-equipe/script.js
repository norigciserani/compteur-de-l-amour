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

const compteurs = [];
querySnapshot.forEach((document) => {
    const personne = document.data();
    compteurs.push({
        id: document.id,
        name: personne.name,
        count: Number(personne.count) || 0,
    });
});

compteurs.sort((a, b) => b.count - a.count);

const rankIcons = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
};

compteurs.forEach((personne, index) => {
    const rank = index + 1;
    const badge = rank <= 3
        ? `<span class="rank-badge rank-${rank}" aria-label="Rang ${rank}">${rankIcons[rank]} ${rank}</span>`
        : `<span class="rank-badge rank-default" aria-label="Rang ${rank}">#${rank}</span>`;

    zoneCompteurs.innerHTML += `
        <div class="carte">
            <div class="card-top">
                <h2>${personne.name}</h2>
                ${badge}
            </div>

            <div class="compteur">
                ${personne.count}
            </div>

            <div class="actions">
                <button class="secondary" onclick="modifierCompteur('${personne.id}', -1)">
                    -1
                </button>
                <button class="primary" onclick="modifierCompteur('${personne.id}', 1)">
                    +1
                </button>
            </div>
        </div>
    `;
});


window.modifierCompteur = async function(id, valeur) {


    const personneRef = doc(db, "people", id);

    await updateDoc(personneRef, {
        count: increment(valeur)
    });

    location.reload();

};