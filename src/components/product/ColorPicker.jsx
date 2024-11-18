import React, { useState } from 'react';

const ColorPicker = ({ setColor, selectedColor, colors }) => {
  return (
    <div className='flex flex-row mt-3 gap-4'>
      {colors &&
        colors.map((color) => (
          <div
            key={color.name}
            className={`w-10 h-10 p-[2px] rounded-full cursor-pointer ${selectedColor === color.name ? 'border border-blue border-1' : ''}`}
            onClick={() => setColor(color.name)}
          >
            <span
              className={`block h-full w-full rounded-full`}
              style={{ backgroundColor: color.color }}
            ></span>
          </div>
        ))}
    </div>
  );
};

export default ColorPicker;
