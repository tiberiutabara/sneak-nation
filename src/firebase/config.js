import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
 
const firebaseConfig = {
    apiKey: "AIzaSyBTEqotZ_2X-oPpoOQ3YBF0zvbfmqPywZs",
    authDomain: "shoes-commerce-aaabd.firebaseapp.com",
    projectId: "shoes-commerce-aaabd",
    storageBucket: "shoes-commerce-aaabd.appspot.com",
    messagingSenderId: "815192678835",
    appId: "1:815192678835:web:56f07956be8673c53dabc6"
}

// initialize firebase

initializeApp(firebaseConfig)

// initialize firestore

const db = getFirestore()

// initialize firebase authentification

const auth = getAuth()

// exports

export { db, auth }