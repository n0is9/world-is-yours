import Input from '@common/Input';

const FormSection = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className='flex flex-col'>
      <label
        htmlFor={label.toLowerCase()}
        className='mb-1 ml-1 text-textLight font-medium font-raleway text-sm'
      >
        {label}
      </label>
      <Input
        classNameInput='font-light text-base text-gray border
        rounded-xl p-3 border-black font-raleway'
        typeInput={type}
        placeholderInput={placeholder}
        value={value}
        onChangeInput={(e) => onChange(e.target.value)}
        className='font-light'
      />
      {error && <p className='text-red-400 text-xs ml-1'>{error}</p>}
    </div>
  );
};

export default FormSection;
