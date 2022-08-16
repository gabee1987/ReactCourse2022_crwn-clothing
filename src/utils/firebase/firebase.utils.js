// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  //   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDaKtRYLeTTukroFNQdeZEdi1uDTmbnH3E',
  authDomain: 'reactcourse-crwn-clothing-db.firebaseapp.com',
  projectId: 'reactcourse-crwn-clothing-db',
  storageBucket: 'reactcourse-crwn-clothing-db.appspot.com',
  messagingSenderId: '587298134870',
  appId: '1:587298134870:web:680fe4d2fc66c7c17014f7',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalinformation = {} // Normally there is no displayName in the auth object, so we provide it through the user input
) => {
  // If we dont get a user from Google auth, we dont want this method to run further
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // We can check if the document exists in our database
  console.log(userSnapshot.exists());

  // If user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalinformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // If user data exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // If we dont get an email or password from the user, we dont want this method to run further
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// We need to dispose this listener if we dont need it anymore to prevent memory leak
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
