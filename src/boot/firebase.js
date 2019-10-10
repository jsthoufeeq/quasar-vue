import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyBtL4i_MWnE7X87bHKa_rRtzPhX_U6ysuI',
  authDomain: 'quasar-todo-d57e8.firebaseapp.com',
  databaseURL: 'https://quasar-todo-d57e8.firebaseio.com',
  projectId: 'quasar-todo-d57e8',
  storageBucket: '',
  messagingSenderId: '517849860919',
  appId: '1:517849860919:web:6a882196e752942fe8a8b2',
  measurementId: 'G-SECTJ43MNC'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
