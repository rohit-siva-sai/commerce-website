import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartDashFill,BsCartXFill } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

const Checkout = ({ cartOnly, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  const router = useRouter()

  useEffect(() => {
    
    
  },[]);

  const handleChange = async (e) => {
    // console.log(user,email);

    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    }
  };
  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, pincode, address]);

  const initiatePayment = async () => {
    toast.success("Your Payment is Initiated", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const CancelOrder = ()=>{
    // clearCart()
    router.push("/")
    
  }

  return (
    <div className="container m-auto pb-12 mx-1">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Head>
        <title>CrazyShop / Checkout </title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <h1 className="font-bold text-center text-3xl my-8">Checkout</h1>
      <div className="md:w-10/12 mx-auto">
        <h2 className="text-xl font-bold">1. Delivery Details</h2>
        <div className="flex my-2 ">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                value={name}
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2 ">
            <div className=" mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  
                />
              
            
            </div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              value={address}
              onChange={handleChange}
              name="address"
              id="address"
              cols="30"
              rows="2"
              className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        <div className="flex my-2 ">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone Number
              </label>
              <input
                value={phone}
                onChange={handleChange}
                type="number"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2 ">
            <div className=" mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pincode
              </label>
              <input
                value={pincode}
                onChange={handleChange}
                type="number"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                onChange={handleChange}
                value={state}
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2 ">
            <div className=" mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                District
              </label>
              <input
                onChange={handleChange}
                value={city}
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold">2. Review Cart Items & Pay</h2>
        <div className="sideCart  bg-orange-200 px-8 py-6 my-4    z-10  ">
          <ul className="list-decimal font-semibold">
            {Object.keys(cartOnly).length == 0 && (
              <div className="my-4">Your Cart is Empty!</div>
            )}
            {Object.keys(cartOnly).map((item) => {
              return (
                <li key={item}>
                  <div className="item md:w-1/2 w-full flex my-4">
                    <div className="">{cartOnly[item].title}</div>
                    <div className="w-1/2  ml-auto flex items-center justify-center text-xl">
                      <AiFillMinusCircle
                        className="text-orange-600"
                        onClick={() => {
                          removeFromCart(
                            item,
                            1,
                            cartOnly[item].title,
                            cartOnly[item].price,
                           
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
                            cartOnly[item].price,
                            
                          );
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <span className="total font-bold">SubTotal: ₹ {subTotal}</span>
        </div>
        <div className="mx-4 flex space-x-4">
          {/* <Link href="/checkout"> */}
            <button
              disabled={disabled}
              onClick={initiatePayment}
              className=" disabled:bg-orange-300  text-white text-md bg-orange-500 border-0 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded  flex "
            >
              <BsFillCartCheckFill className="mt-1 mx-1 " />
              Pay ₹ {subTotal}
            </button>
            <button
             
             onClick={CancelOrder}
             className=" disabled:bg-orange-300  text-white text-md bg-orange-500 border-0 py-1 px-2 focus:outline-none hover:bg-orange-600 rounded  flex "
           >
             <BsCartXFill className="mt-1 mx-1" />
             Cancel Order 
           </button>
          {/* </Link> */}
          {/* <p hidden={!disabled} className="text-sm mt-2 ">
            Fill all the details to pay &gt; 5 characters each
          </p> */}
         
        </div>
      </div>
    </div>
  );
};

export default Checkout;
