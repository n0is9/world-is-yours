import React, { useState } from 'react';

const SizePicker = ({ sizes, selectedSize, setSelectedSize }) => {
  const bgColor = (size) => {
    let style = '';
    if (!size.quantity) {
      style = {
        backgroundColor: '#D6D6D6',
        color: '#888888',
        borderColor: '#D6D6D6',
        cursor: 'not-allowed',
      };
    } else if (selectedSize === size.name) {
      style = {
        backgroundColor: '#135CFB',
        color: '#fff',
        borderColor: '#135CFB',
      };
    } else {
      style = {
        backgroundColor: '#fff',
        color: '#515151',
        borderColor: '#888888',
      };
    }
    return style;
  };

  if (!sizes) {
    return;
  }

  return (
    <div className='flex flex-row mt-3 gap-4'>
      {sizes.map((size) => (
        <button
          key={`shoe-${size.name}`}
          className={`font-sans w-10 h-10 rounded-full duration-300 cursor-pointer border border-gray`}
          disabled={size.quantity === 0}
          style={bgColor(size)}
          onClick={() => setSelectedSize(size.name)}
        >
          <span className={`text-center text-inherit`}>{size.name}</span>
        </button>
      ))}
    </div>
  );
};

export default SizePicker;
