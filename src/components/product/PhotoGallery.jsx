import React, { useEffect, useState } from 'react';

import HeartIcon from '../../assets/icons/icon-heart.svg';
import HeartIconRed from '../../assets/icons/icon-heart-red.svg';

import { addItem, removeItem } from '../../redux/wishlistSlice';
import { $api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';

const PhotoGallery = ({ data }) => {
  const dispatch = useDispatch();
  const [isLiked, setLike] = useState(false);

  const { image_1, image_2, image_3, image_4 } = data;

  const [largeImage, setLargeImage] = useState(image_1);
  const [smallImages, setSmallImages] = useState([image_2, image_3, image_4]);

  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (wishlist.includes(data.id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [data, wishlist]);

  const toggleWishList = async () => {
    try {
      if (!isLiked) {
        await $api.post(`/api/wishlist/`, { product: data.id });
        dispatch(addItem(data.id));
      } else {
        await $api.delete(`/api/wishlist/${data.id}/`);
        dispatch(removeItem(data.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <img src={isLiked ? HeartIconRed : HeartIcon} alt='heart icon' width='36' className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
