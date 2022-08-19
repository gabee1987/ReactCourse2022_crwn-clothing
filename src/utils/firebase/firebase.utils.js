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
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // Uploading data to firestore
  collection,
  writeBatch,
  // Getting the data from firestore
  query,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';

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

// Uploading the data to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
  // someFieldValue // Here we can add additional values we want to use at the upload process
) => {
  // This collection reference can tell what db the documents are from
  const collectionRef = collection(db, collectionKey);

  // This is a single transaction
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    // The second argument here is the name of the collection, the key
    const docRef = doc(collectionRef, object.title.toLowerCase()); // We can use additional field values -> object[someFieldValue].toLowerCase()

    // Creating a document ref for each of the objects we want to add to the db, with the title of the objects
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('writing to firestore is done');
};

// Get the data from the db
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  // We are generating a query
  const q = query(collectionRef);

  // Fetch the doc snapshots from firestore
  const querySnapShot = await getDocs(q);

  // We are mapping the data to the structure we want
  const categoryMap = querySnapShot.docs.reduce((accumulator, docSnapshot) => {
    // Destructure the values of the data from the snapshot
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // Normally there is no displayName in the auth object, so we provide it through the user input
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
        ...additionalInformation,
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
