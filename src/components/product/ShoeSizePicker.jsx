import { useState } from 'react';

const ShoeSizePicker = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const shoeSizes = Array.from({ length: 7 }, (_, i) => i + 36);

  return (
    <div className='flex flex-row mt-3 gap-4'>
      {shoeSizes.map((size) => (
        <div
          key={`shoe-${size}`}
          className={`font-sans relative w-10 h-10 rounded-full bg-gray-500 duration-300 cursor-pointer border border-gray`}
          style={{ backgroundColor: selectedSize === `shoe-${size}` ? '#135CFB' : '', borderColor: selectedSize === `shoe-${size}` ? '#135CFB' : '' }}
          onClick={() => setSelectedSize(`shoe-${size}`)}>
          <span className={`text-[#515151] flex justify-center items-center absolute inset-0 ${selectedSize === `shoe-${size}` ? 'text-[#FFF]' : ''}`}>{size}</span>
        </div>
      ))}
    </div>
  );
};

export default ShoeSizePicker;
