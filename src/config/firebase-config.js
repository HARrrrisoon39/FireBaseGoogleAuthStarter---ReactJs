import firebase from "firebase";

const firebaseConfig = {
  "use your own config here"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
