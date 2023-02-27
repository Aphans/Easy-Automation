import { initializeApp } from "firebase/app"
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import {  
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBHMpeiDdc3nTXz_xXhMTAchwLPAT5B54E",
    authDomain: "easy-automation-e4326.firebaseapp.com",
    projectId: "easy-automation-e4326",
    storageBucket: "easy-automation-e4326.appspot.com",
    messagingSenderId: "545105394712",
    appId: "1:545105394712:web:fe8a4128d5efe110ed576d",
    measurementId: "G-Q9P0VHY45S"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { getFirestore,doc,onSnapshot,getDoc,collection};

//Obtenemos los documentos de las colecciones (Room/Devices) de manera dinámica
export const giveCollection = (ref, callback) => onSnapshot(collection(db,ref), callback)
//Actualizamos un campo de un documento
export const actualizaFieldDoc = (ref, id, objeto) =>updateDoc(doc(db,ref,id),objeto)
