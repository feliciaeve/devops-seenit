import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
