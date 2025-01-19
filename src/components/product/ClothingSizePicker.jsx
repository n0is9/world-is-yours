const ClothingSizePicker = ({ clothingSizes, activeFilters, toggleButton }) => {
  const activeSize = activeFilters[3].active;

  return (
    <div className="flex flex-row flex-wrap gap-5 mt-2 mb-4">
      {clothingSizes.map((size) => (
        <div
          key={`clothing-${size.value}`}
          className={`relative w-10 h-10 rounded-full cursor-pointer duration-300 border border-gray ${
            activeSize.includes(size.value) ? 'bg-blue border-transparent' : ''
          }`}
          style={{}}
          onClick={() => toggleButton(size.value, 3, size.exclusive)}
        >
          <span
            className={`text-gray text-sm flex justify-center items-center absolute inset-0 ${
              activeSize.includes(size.value) ? 'text-white' : ''
            }`}
          >
            {size.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ClothingSizePicker;
