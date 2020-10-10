// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import * as firebase from "firebase/app";
import { firebaseConfig } from "../Config/FirebaseConfig";
import "firebase/auth";
import "firebase/database";
const axios = require('axios');

// our "constructor"
const create = () => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  firebase.initializeApp(firebaseConfig);

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getIdToken = () => {
    return firebase.auth().currentUser.getIdToken();
  }

  const setPersistenceLocal = () => {
    console.log("[AuthApi]", "setPersistenceLocal")
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  const getCurrentUser = () => {
    return firebase.auth().currentUser;
  }

  const signInAnonymously = () => {
    return firebase.auth().signInAnonymously()
  }

  const createUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  const signOut = () => {
    return firebase.auth().signOut();
  }

  const sendPasswordResetEmail = (email, actionCodeSettings) => {
    return firebase.auth().sendPasswordResetEmail(email, actionCodeSettings);
  }

  const confirmPasswordReset = (code, newPassword) => {
    return firebase.auth().confirmPasswordReset(code, newPassword);
  }

  const getMinRequiredVersion = () => {
    return firebase.database()
      .ref("minRequiredVersion")
      .once("value");
  }

  const getVersion = () => {
    return firebase.database()
      .ref("version")
      .once("value");
  }

  const getServerTime = (id) => {
    return new Promise((resolve, reject) => {
      const stRef = firebase.database().ref(`servertimes/${id}`);
      stRef.on("value", (snapshot) => {
        resolve(snapshot.val());
        stRef.off();
      });
      stRef.set({ '.sv': 'timestamp' });
    })
  }

  const getUserInfo = (id) => {
    console.log("[AuthApi]", "getUserInfo:", id)
    return firebase.database()
      .ref(`users/${id}`)
      .once("value");
  }

  const updateUserInfo = (id, data) => {
    console.log("[AuthApi]", "updateUserInfo:", data)
    return firebase.database()
      .ref(`users/${id}`)
      .update(data);
  }

  const updateUserSpecialField = (id, field, value) => {
    console.log("[AuthApi]", "updateUserSpecialField", id, field, value);
    const ref = firebase.database().ref(`users/${id}/${field}`);
    if(field === 'status'){
      const offline = 0;
      ref.onDisconnect().set(offline) // set offline
    }
    return ref.set(value);
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    signInAnonymously,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    confirmPasswordReset,
    getUserInfo,
    updateUserInfo,
    updateUserSpecialField,
    getServerTime,
    getVersion,
    getCurrentUser,
    setPersistenceLocal,
    getIdToken
  }

}

// let's return back our create method as the default.
export default create();
