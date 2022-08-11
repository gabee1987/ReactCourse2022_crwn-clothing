import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './sign-in.styles.scss';

const SignIn = () => {
  return (
    <div className="signin-and-signup-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default SignIn;
