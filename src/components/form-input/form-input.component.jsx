import { FormInputLabel, Input, Group } from './form-input.styles';

// If we get the component properties as a single object, instead of spreading multiple values, we can use the object we declaired, like this ->
// const FormInput = ({ label, inputOptions }) => {

// With "...otherProps" we can spread multiple values as arguments from outside of this component
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
