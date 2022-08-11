import './form-input.styles.scss';

// If we get the component properties as a single object, instead of spreading multiple values, we can use the object we declaired, like this ->
// const FormInput = ({ label, inputOptions }) => {

// With "...otherProps" we can spread multiple values as arguments from outside of this component
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-input-group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
