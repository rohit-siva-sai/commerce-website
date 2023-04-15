import React, { useEffect, useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import AOS from "aos";

import "aos/dist/aos.css";

const Display = ({
  id,
  title,
  descripton,
  info1,
  info2,
  info3,
  originalPrice,
  discountPrice,
  discount,
  imageUrl,
  rating,
  brand,
  badge,
  category,
  addToCart,
  buyNow,
}) => {
  useEffect(() => {
    AOS.init();
  });

  const [show, setShow] = useState(false);
  const showDown = () => {
    setShow(!show);
  };

  return (
    <div
      className={`lg:w-1/5 md:w-1/2 p-4 h-fit w-full ${
        show
          ? "shadow-md  duration-750 ease-in-out   shadow-orange-300"
          : "shadow-md  "
      } lg:mx-4 lg:my-2 relative  transition scroll-smooth`}
      onMouseOver={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      data-aos="flip-right"
      data-aos-duration="2000"
    >
      <div className="block relative  transition  duration-700 ease-in-out hover:scale-110 scroll-smooth  rounded overflow-hidden">
        <picture>
          <img
            alt="ecommerce"
            className={`   ${show ? "md:h-[20vh] h-[12vh] " : "md:h-[32vh]  h-[20vh]"} m-auto`}
            src={imageUrl}
            data-aos="zoom-out"
            data-aos-duration="1000"
          />
        </picture>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 ">
          {category}
        </h3>
        <h2 className="text-gray-900  text-sm font-bold">{title}</h2>
        <p className="uppercase text-slate-400 font-bold text-xs">
          by: {brand}
        </p>
        <div className="mt-1  font-bold leading-5 text-center ">
          <p> ₹{discountPrice}.00</p>
          <del className="text-xs pr-2 font-medium  text-gray-400  ">
            ₹{originalPrice}{" "}
          </del>
          <span className="text-sm font-semibold text-teal-800  ">
            {discount}% OFF
          </span>
        </div>
        {show && (
          <div
            className="mt-4 flex flex-col space-y-3 justify-center "
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="flex justify-center space-x-4 items-center">
              <div
                onClick={() => {
                  addToCart(id, 1, title, discountPrice);
                }}
                className="flex space-x-2 items-center px-2 py-2 font-semibold border-orange-500 border rounded-lg  cursor-pointer hover:ring-2 hover:ring-orange-300 text-orange-500 text-sm  "
              >
                <BsCartPlusFill className="text-base" />
                <p>Add To Cart</p>
              </div>
              <div
                onClick={() => {
                  buyNow(id, 1, title, discountPrice);
                }}
                className="px-2 py-2 border font-semibold text-sm border-orange-500 rounded-lg hover:ring-2 hover:ring-orange-300  cursor-pointer text-orange-500 "
              >
                Buy Now
              </div>
            </div>
            <ul className="text-xs  text-start flex flex-col ml-8 space-y-1 font-medium font-sans text-zinc-500 list-disc">
              <li>{info1}</li>
              <li>{info2}</li>
              {info3 && <li>{info3}</li>}
            </ul>
          </div>
        )}
      </div>
      <div
        className={`absolute top-2 right-2  font-bold text-xs p-1 rounded-lg ${
          badge == "same day dispatch" ? "bg-yellow-400" : badge == "In Demand" ? "bg-green-400" : badge=="Top Seller" ? "bg-blue-400" : "bg-red-400"
        } `}
      >
        <p>{badge}</p>
      </div>

     {!show && <div className="bg-lime-400 absolute bottom-4 left-4 p-1 flex  text-xs font-semibold items-center w-fit rounded-lg" >
        <p>{rating}</p>
        <AiFillStar className="w-3  " />
      </div>}
    </div>
  );
};

export default Display;
