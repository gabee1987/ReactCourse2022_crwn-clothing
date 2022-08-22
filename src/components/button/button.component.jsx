import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

// We will have 3 different styles of buttons in the application, so we need to create 3 different classname for this button component
export const BUTTON_TYPES_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
  ({
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;

  // Old button format for sass styling
  // return (
  //   <button
  //     className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
  //     {...otherProps}
  //   >
  //     {children}
  //   </button>
  // );
};

export default Button;
