import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEMBcUADd3S9d9wdgCuw8T72HJLM6gno0",
    authDomain: "linkedin-af1c5.firebaseapp.com",
    projectId: "linkedin-af1c5",
    storageBucket: "linkedin-af1c5.appspot.com",
    messagingSenderId: "570933341352",
    appId: "1:570933341352:web:86d860f9926594bf6d669d"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();


export {db,auth};
