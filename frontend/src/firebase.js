import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA9FPjAvHDoh341velyQHtls0zHIGq_jgg",
    authDomain: "esptest-2671c.firebaseapp.com",
    databaseURL: "https://esptest-2671c-default-rtdb.firebaseio.com",
    projectId: "esptest-2671c",
    storageBucket: "esptest-2671c.appspot.com",
    messagingSenderId: "935568540346",
    appId: "1:935568540346:web:cabd73ec3929d21b7bf883"
};

firebase.initializeApp(firebaseConfig);

export default firebase;