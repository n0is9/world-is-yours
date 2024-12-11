const Input = (props) => {
  return (
    <input
      className={props.classNameInput}
      type={props.typeInput}
      value={props.valueInput}
      name={props.nameInput}
      placeholder={props.placeholderInput}
      onChange={props.onChangeInput}
    />
  );
};

export default Input;
