import React from "react";
import TentImg from "../../assets/temporary-img/tent.png";
import HeartIcon from "../../assets/icons/icon-heart.svg";
import Button from "./Button";
import Cart from '../../assets/icons/dark/icon-cart-dark.svg'

const Card = ({ data }) => {
  return (
    <div className=" m-3 border-2 border-gray-light rounded-lg relative"> 
      <img
        src={TentImg}
        alt=""
        className="w-21 max-w-200 rounded-lg"
      />
      <div className="absolute top-3 right-3 m-2">
        <img src={HeartIcon} alt="heart icon" width="26" />
      </div>
      <div className="flex flex-row justify-between items-center">
      <div className="p-5 ">
        <p className="text-custom-black">{data.name}</p>
        <p className="text-custom-black">{data.price}</p>
        <p className="text-custom-black">{data.colors.join(", ")}</p>
      </div>
      <Button classNameBtn='flex border rounded-md items-center py-3 px-3 mr-2'><img src={Cart} alt="cart"/></Button>
      </div>
    </div>
  );
};

export default Card;
