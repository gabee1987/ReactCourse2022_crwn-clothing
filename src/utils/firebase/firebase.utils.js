// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  //   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
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
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // If user data exists
  return userDocRef;
};
