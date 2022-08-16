import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Declare the usercontext value
  const { setCurrentUser } = useContext(UserContext);

  // After a successful sign in we need to clear the form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Login with Google Popup
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // Login with email & password
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // Store the user in the UserContext
      setCurrentUser(user);

      // Clear out the form fields after a successful sign in
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('No user associated with this email!');
          break;
        case 'auth/wrong-password':
          alert('Cannot log in, check your email or password!');
          break;

        default:
          console.log(error);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password or with Google</span>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
