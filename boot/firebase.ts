import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDV6MGJ3Oh-Pg0mBCD6maLi1dERHK92Ud8",
    authDomain: "kahveborsam-38ff0.firebaseapp.com",
    projectId: "kahveborsam-38ff0",
    storageBucket: "kahveborsam-38ff0.appspot.com",
    messagingSenderId: "491701481565",
    appId: "1:491701481565:web:2a30fd17f2ef7494cc1db4"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini al
const auth = getAuth(app);
const db = getFirestore(app);

// Export both as named exports
export { auth, db, db as firestore };