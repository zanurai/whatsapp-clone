// const firebase = require('firebase/app');
// require('firebase/database');
// //require('firebase/firestore')
// //require('firebase/functions')

// const firebaseConfig = {
//     apiKey: "AIzaSyBestmbrMdAKon5MG83ifPrtaIrH9oyIQY",
//     authDomain: "whatsapp-22225.firebaseapp.com",
//     projectId: "whatsapp-22225",
//     databaseURL: "https://whatsapp-22225-default-rtdb.firebaseio.com/",
//     appId: "1:1018171127366:web:aff6dab2aedc949d1d7c47",
//     storageBucket: "whatsapp-22225.appspot.com",
//     messagingSenderId: "1018171127366"
// };

// firebase.initializeApp(firebaseConfig);

// const databaseRef = firebase.database().ref();

// const firestore = firebase.firestore();
// const functions = firebase.functions();

// // function for sending a message
// const sendMessage = async (message, user) => {
//     // add the message to the database
//     await databaseRef.child('message').push({
//         text: message,
//         user: user,
//         timestamp: firebase.database.ServerValue.TIMESTAMP
//     });

//     // send the notification to the user
//     const sendNotification = functions.httpsCallable('sendNotification');
//     await sendNotification({ message, user });
// }

// export default firebase;
//import firebase from 'firebase';
// const firebase = require('firebase/app');
// require('firebase/auth')

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDydUF7S-ISVM21ltIRBDIkcwga1eSWO0M",
    authDomain: "whatsapp-clone-6e1f2.firebaseapp.com",
    projectId: "whatsapp-clone-6e1f2",
    storageBucket: "whatsapp-clone-6e1f2.appspot.com",
    messagingSenderId: "134098219589",
    appId: "1:134098219589:web:f4867dd78432a26326692c",
    measurementId: "G-FJP33FW19R"
};
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const userData = {
    fullname: "John Doe",
    email: "example@email.com",
    photURL: "https://thumbs.dreamstime.com/b/back-view-portrait…desk-working-startup-project-modern-116658678.jpg"
};

db.collection("users").doc(userData.email).set(userData)
    .then(() => {
        // User data is saved with database ID
    })
    .catch((error) => {
        // Handle database write failure
    });

export { auth, googleProvider }
export default db



