import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBifuFEeqS9cY9VLBLZJXD0T7OXGDguhGo",
    authDomain: "od-led-production.firebaseapp.com",
    databaseURL: "https://od-led-production.firebaseio.com",
    projectId: "od-led-production",
    storageBucket: "od-led-production.appspot.com",
    messagingSenderId: "820351498964",
    appId: "1:820351498964:web:c84f744381426c49f69941",
    measurementId: "G-GMB46JR9MD"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };