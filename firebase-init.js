import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, query, orderBy, onSnapshot, where, writeBatch, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const app  = initializeApp({
  apiKey: "AIzaSyBF5iccgQkqsT2wEtzu9GByKHJY_48oaQA",
  authDomain: "fkma-abidjan-1596c.firebaseapp.com",
  projectId: "fkma-abidjan-1596c",
  storageBucket: "fkma-abidjan-1596c.firebasestorage.app",
  messagingSenderId: "658105738928",
  appId: "1:658105738928:web:71c3552474f5fbf1e9bd75"
});
const db   = getFirestore(app);
const auth = getAuth(app);
window._app=app; window._db=db; window._auth=auth;
window._fs={collection,addDoc,getDocs,doc,updateDoc,deleteDoc,setDoc,query,orderBy,onSnapshot,where,writeBatch,runTransaction};
window._signIn=signInWithEmailAndPassword;
window._signOut=signOut;
window._onAuth=onAuthStateChanged;
// Essayer localStorage d'abord, fallback sur sessionStorage si échec (PC bloquant)
setPersistence(auth, browserLocalPersistence).then(function(){
  window._fbReady=true;
  window.dispatchEvent(new Event("fb-ready"));
}).catch(function(e){
  console.log("LocalPersistence échoué, essai session:", e.message);
  return setPersistence(auth, browserSessionPersistence);
}).then(function(){
  window._fbReady=true;
  window.dispatchEvent(new Event("fb-ready"));
}).catch(function(e){
  console.log("Persist total échoué:", e.message);
  window._fbReady=true;
  window.dispatchEvent(new Event("fb-ready"));
});
