import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

<<<<<<< HEAD
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtzxluD-670lfHCbbqweVayAPIx6CNe0o",
  authDomain: "devops-trista.firebaseapp.com",
  projectId: "devops-trista",
  storageBucket: "devops-trista.firebasestorage.app",
  messagingSenderId: "164514167755",
  appId: "1:164514167755:web:04733beb62663b782d544e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
=======
const firebaseConfig = {
    apiKey: 'AIzaSyAUG63U0dD4wPHKa0qrBU6DoQl7Jdr66Ak',
    authDomain: 'devops-seenit.firebaseapp.com',
    projectId: 'devops-seenit',
    storageBucket: 'devops-seenit.firebasestorage.app',
    messagingSenderId: '774547145117',
    appId: '1:774547145117:web:467aa370e40ab12c836f74',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
>>>>>>> fd40b11abc122a6d51e8e87092c0ca94de593107
