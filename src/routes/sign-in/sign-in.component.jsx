import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  //   auth,
  signInWithGooglePopup,
  //   signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  // Login with Google Redirect
  // After the redirect login this useEffect will remount the app
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await getRedirectResult(auth);
  //       console.log(response);

  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user); // If there was a response, create the user
  //       }
  //     };

  //     fetchData().catch(console.error);
  //   }, []);

  // Login with Google Popup
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(user);
  };

  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}

      <SignUpForm />
    </div>
  );
};

export default SignIn;
