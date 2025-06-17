import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
