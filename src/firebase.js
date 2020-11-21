import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCXAXYLtbwdWQgR0j84M8q2_sqqujODkiA",
  authDomain: "reactchat-5a0f2.firebaseapp.com",
  databaseURL: "https://reactchat-5a0f2.firebaseio.com",
  projectId: "reactchat-5a0f2",
  storageBucket: "reactchat-5a0f2.appspot.com",
  messagingSenderId: "49623746528",
  appId: "1:49623746528:web:c1462aee54841330480d85",
  measurementId: "G-FTHGVHEHQC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
