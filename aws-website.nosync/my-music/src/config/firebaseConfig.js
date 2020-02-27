import firebase from 'firebase/app';
import 'firebase/auth';

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'cs493-spootify.firebaseapp.com',
  databaseURL: 'https://cs493-spootify.firebaseio.com',
  projectId: 'cs493-spootify',
  storageBucket: 'cs493-spootify.appspot.com',
  messagingSenderId: '883322934368',
  appId: '1:883322934368:web:7ae56957ab39870738df05'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
