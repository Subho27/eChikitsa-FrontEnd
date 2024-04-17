// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBrxLcCisOhmdis06rIglgqjW-uawxWdCo",
    authDomain: "profileimagesechilitsa.firebaseapp.com",
    projectId: "profileimagesechilitsa",
    storageBucket: "profileimagesechilitsa.appspot.com",
    messagingSenderId: "855696102408",
    appId: "1:855696102408:web:e90d87f8a4509746cf6dbd"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);


export const storage = getStorage(app);