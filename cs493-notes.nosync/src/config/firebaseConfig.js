import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'cs493-notes.firebaseapp.com',
  databaseURL: 'https://cs493-notes.firebaseio.com',
  projectId: 'cs493-notes',
  storageBucket: 'cs493-notes.appspot.com',
  messagingSenderId: '790196221612',
  appId: '1:790196221612:web:49ee8245e5400559b91109'
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.database()

export default firebase
