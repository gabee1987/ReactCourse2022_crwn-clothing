import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// Components
import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // After a successful registration we need to clear the form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Need to confirm that the passwords matches
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // We need to check if the user is authenticated
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Create the user document
      await createUserDocumentFromAuth(user, { displayName });

      // Clear out the form fields after a successful registration
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use!');
      }
      console.log('user creation encountered an error', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-form-container">
      <h1>Sign up with your email and password</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        {/* We can use a single object to pass component properties, in this case "inputOptions" */}
        {/* <FormInput
          label="Display Name"
          inputOptions={{
            type: 'text',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName,
          }}
        /> */}

        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
