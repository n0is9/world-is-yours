import { useState } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = ['red', 'green', 'purple', 'gray', 'black', 'white'];

  return (
    <div className="flex flex-row mt-3 gap-4">
      {colors &&
        colors.map((color) => (
          <div
            key={color.id}
            className={`w-10 h-10 p-[2px] rounded-full cursor-pointer ${
              selectedColor === color ? 'border border-blue border-1' : ''
            }`}
            onClick={() => setSelectedColor(color)}
          >
            <span className={`block h-full w-full rounded-full bg-[#000}]`}></span>
          </div>
        ))}
    </div>
  );
};

export default ColorPicker;
