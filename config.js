import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC0hTFaa_tmN3u_yPDRTRz0tO5fl1MtodI",
    authDomain: "child-security-app-4ab14.firebaseapp.com",
    projectId: "child-security-app-4ab14",
    storageBucket: "child-security-app-4ab14.appspot.com",
    messagingSenderId: "632278162922",
    appId: "1:632278162922:web:2304e3291ac321220f2693"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
