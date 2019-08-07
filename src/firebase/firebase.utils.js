import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { cpus } from 'os';

const config = {
    apiKey: "AIzaSyAcrthorfxqWbZK7G9KmJ2yeVICB5-G2sE",
    authDomain: "spark-diary.firebaseapp.com",
    databaseURL: "https://spark-diary.firebaseio.com",
    projectId: "spark-diary",
    storageBucket: "",
    messagingSenderId: "345284954297",
    appId: "1:345284954297:web:84abadcd3a4f0789"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //means : if it's null

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  console.log(snapShot);
  return userRef;
}

firebase.initializeApp(config);

//!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;