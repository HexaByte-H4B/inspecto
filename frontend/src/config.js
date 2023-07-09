import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCWj-EGroRzWPwHURl5uQ7MQGtFtw2DKoU",
    authDomain: "escrow-web3.firebaseapp.com",
    projectId: "escrow-web3",
    storageBucket: "escrow-web3.appspot.com",
    messagingSenderId: "1031152445605",
    appId: "1:1031152445605:web:3830918ac030db87c7c54c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};