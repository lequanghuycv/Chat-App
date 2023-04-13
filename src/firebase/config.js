import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBpln2oGYyJRaiO3Nxs_hnY_UeXTkYg-Rs',
    authDomain: 'chat-app-97a88.firebaseapp.com',
    projectId: 'chat-app-97a88',
    storageBucket: 'chat-app-97a88.appspot.com',
    messagingSenderId: '973622990973',
    appId: '1:973622990973:web:949ba3067202e54800b914',
    measurementId: 'G-Q8SEFT151W',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
// const auth1 = getAuth();
// connectAuthEmulator(auth1, 'http://localhost:9099');
// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }
export { db, auth };
export default firebase;
