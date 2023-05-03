import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartDashFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FcShop } from "react-icons/fc";
import { useRouter } from "next/router";

const Navbar = ({
  cartOnly,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter()

  useEffect(()=>{
    let exempted = [
      "/checkout"
    ];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  },[router])

  const toggleCart = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="sticky top-0 z-30 mb-2  ">
      <div
        className={`sticky top-0 flex shadow-md justify-between items-center md:px-12 px-6 bg-gray-100 z-20 py-1  ${
          !sidebar && "overflow-hidden"
        } `}
      >
        <div className="flex  items-center md:space-x-8  space-x-4 text-basetext-black font-bold ">
          <Link href={"/"}>
            <div className="flex md:flex-row flex-col items-center space-x-1" >
              <FcShop className="md:text-4xl text-5xl " />
              <p className="md:text-2xl text-sm  font-bold first-letter:text-black text-orange-500 font-serif ">
                CrazyShop
              </p>
            </div>
          </Link>
          <Link href={"/emailSender"}>
            emailsender
          </Link>
          {/* <Link href={"/"}>
            <div className="hover:text-gray-500 font-bold text-lg ">Home</div>
          </Link>
          <Link href={"/checkout "}>
            <div className="hover:text-gray-500 font-bold md:-ml-4 text-lg ">
              Checkout
            </div>
          </Link> */}
        </div>

        <div onClick={toggleCart} className=" cursor-pointer relative p-2">
          {Object.keys(cartOnly).length != 0 && (
            <span className="absolute text-sm font-semibold   top-0 -right-1 bg-orange-500 px-2  rounded-full text-white  ">
              {Object.keys(cartOnly).length}
            </span>
          )}
          <AiOutlineShoppingCart
            className="text-4xl  text-orange-500"
            onClick={toggleCart}
          />
        </div>
      </div>

      <div
        //   ref={ref}
        className={`sideCart lg:w-96 w-72  h-[100vh] overflow-y-scroll fixed z-30  top-1 md:top-0  bg-orange-200 p-10  transition-all  ${
          sidebar && cartOnly ? "right-0" : "-right-96"
        }  z-40 `}
      >
        <span
          className="absolute top-2 right-7 text-2xl text-orange-600 w-1 "
          onClick={toggleCart}
        >
          <AiFillCloseCircle />
        </span>
        <h2 className="font-bold text-xl text-center underline underline-offset-2">
          Shopping-Cart
        </h2>
        <ul className="list-decimal font-semibold">
          {Object.keys(cartOnly).length == 0 && (
            <div className="my-4">Your Cart is Empty!</div>
          )}
          {Object.keys(cartOnly).map((item) => {
            return (
              <li key={item}>
                <div className="item flex my-4">
                  <div className="w-2/3 font-semibold">
                    {cartOnly[item].title}
                  </div>
                  <div className="w-1/3 flex items-center justify-center text-lg">
                    <AiFillMinusCircle
                      className="text-orange-600"
                      onClick={() => {
                        removeFromCart(
                          item,
                          1,
                          cartOnly[item].title,
                          cartOnly[item].price
                        );
                      }}
                    />
                    <span className="mx-2 text-lg">{cartOnly[item].qty}</span>
                    <AiFillPlusCircle
                      className="text-orange-600"
                      onClick={() => {
                        addToCart(
                          item,
                          1,
                          cartOnly[item].title,
                          cartOnly[item].price
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="total font-bold my-2">SubTotal: {subTotal}</div>
        <div className="flex space-x-2">
          <Link href="/checkout">
            <button
              disabled={Object.keys(cartOnly).length === 0}
              className="disabled:bg-orange-300 text-white text-md bg-orange-500 border-0 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded  flex "
            >
              <BsFillCartCheckFill className="mt-1 mx-1 " />
              CheckOut
            </button>
          </Link>
          <button
            disabled={Object.keys(cartOnly).length === 0}
            onClick={clearCart}
            className="disabled:bg-orange-300 text-white text-md bg-orange-500 border-0 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded  flex "
          >
            <BsFillCartDashFill className="mt-1 mx-1 " />
            Clearcart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
