import React, { useState } from 'react';
import image1 from '../../assets/img/why-us-image-1.png';
import image2 from '../../assets/img/why-us-image-2.png';
import image3 from '../../assets/img/why-us-image-3.png';
import image4 from '../../assets/img/why-us-image-4.png';
import HeartIcon from '../../assets/icons/icon-heart.svg';

const PhotoGallery = () => {
  const [largeImage, setLargeImage] = useState(image4);
  const [smallImages, setSmallImages] = useState([image1, image2, image3]);

  const handleImageClick = (id) => {
    const clickedImage = smallImages[id];
    setSmallImages((prevImages) => {
      const updatedImages = prevImages.slice();
      updatedImages[id] = largeImage;
      return updatedImages;
    });
    setLargeImage(clickedImage);
  };

  return (
    <div className='flex grow'>
      <div className='flex flex-col'>
        {smallImages.map((image, id) => (
          <img key={id} src={image} alt={`Image ${id + 1}`} className='w-32 h-32 mb-4 cursor-pointer rounded object-cover' onClick={() => handleImageClick(id)} />
        ))}
      </div>

      <div className='w-100 h-100 ml-4 cursor-pointer relative'>
        <img src={largeImage} alt='Large Image' className='object-cover w-full h-full rounded-xl' />
        <div className='absolute top-3 right-3 m-2'>
          <img src={HeartIcon} alt='heart icon' width='36' className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
