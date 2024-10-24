import React, { useEffect, useState } from 'react';

const ClothingSizePicker = () => {
  const [selectedSize, setSelectedSize] = useState([]);

  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  useEffect(() => {
    console.log(selectedSize);
  }, [selectedSize]);

  const handleSizeToggle = (size) => {
    if (selectedSize.includes(size)) {
      setSelectedSize(selectedSize.filter((item) => item !== size));
    } else {
      setSelectedSize((selectedSize) => [size, ...selectedSize]);
    }
  };

  return (
    <div className='flex flex-row flex-wrap gap-5 mt-2 mb-4'>
      {clothingSizes.map((size) => (
        <div key={`clothing-${size}`} className={`relative w-10 h-10 rounded-full cursor-pointer duration-300 border border-gray ${selectedSize.includes(size) ? 'bg-blue border-white' : ''}`} style={{}} onClick={() => handleSizeToggle(size)}>
          <span className={`text-gray text-sm flex justify-center items-center absolute inset-0 ${selectedSize.includes(size) ? 'text-white' : ''}`}>{size}</span>
        </div>
      ))}
    </div>
  );
};

export default ClothingSizePicker;
