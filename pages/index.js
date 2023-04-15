import Image from "next/image";
import { Inter } from "next/font/google";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "../config/firebase";
import { getDocs, addDoc, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Display from "@/components/display";

import { useRouter } from "next/router";

export default function Home({ addToCart, buyNow }) {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterLoad, setFilterLoad] = useState(false);
  // const [checkPrice,setCheckPrice] = ([false,false,false,false,false])
  const [price1, setPrice1] = useState(false);
  const [price2, setPrice2] = useState(false);
  const [price3, setPrice3] = useState(false);
  const [price4, setPrice4] = useState(false);
  const [price5, setPrice5] = useState(false);
  const [discount1, setDiscount1] = useState(false);
  const [discount2, setDiscount2] = useState(false);
  const [discount3, setDiscount3] = useState(false);
  const [discount4, setDiscount4] = useState(false);
  const [rating1, setRating1] = useState(false);
  const [rating2, setRating2] = useState(false);
  const [badge1, setBadge1] = useState(false);
  const [badge2, setBadge2] = useState(false);
  const [badge3, setBadge3] = useState(false);
  const [badge4, setBadge4] = useState(false);
  const router = useRouter();

  const productCollection = collection(db, "products");

  const filterSearch = (value) => {
    setFilterLoad(true);
    let tempProducts = products;
    if (value.length > 3) {
      tempProducts = tempProducts.filter((curElement) => {
        return (
          curElement.title.toLowerCase().includes(value) ||
          curElement.category.toLowerCase().includes(value)
        );
      });

      setTimeout(() => {
        setProducts(tempProducts);
        setFilterLoad(false);
      }, 500);
    } else {
      setTimeout(() => {
        setFilterLoad(false);
        setProducts(items);
      }, 100);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await getDocs(productCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);

      setProducts(filteredData);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setItems(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, [router]);

  const filterPrice = async (value, loyal, value2) => {
    let pro2 = products;

    setFilterLoad(true);
    console.log(filterLoad, "loDISDHBD");

    if (loyal) {
     
      pro2 = pro2.filter((curElement) => {
        const price = parseInt(curElement.discountPrice.replace(/,/g, ""));
        return price < Number(value) && price > value2;
      });
      

      console.log(loyal, "roehierbjrejvr");

      setTimeout(() => {
        setFilterLoad(false);
        setProducts(pro2);
      }, 500);
      console.log(pro2, "after");
      return;
    } else {
      
      setTimeout((e) => {
        setFilterLoad(false);
        setProducts(items);
      }, 100);
      console.log("syyyyyy");
    }
    // getProducts();
  };

  const filterRating = (value, loyal) => {
    let tempProducts = products;
    setFilterLoad(true);

    if (loyal) {
      tempProducts = tempProducts.filter((curElement) => {
        return curElement.rating >= value;
      });

      setTimeout(() => {
        setFilterLoad(false);
        setProducts(tempProducts);
      }, 500);
    } else {
      setTimeout((e) => {
        setFilterLoad(false);
        setProducts(items);
        // getProducts()
      }, 100);
    }
  };

  const filterDiscount = (value, loyal) => {
    let tempProducts = products;
    setFilterLoad(true);
    if (loyal) {
      tempProducts = tempProducts.filter((curElement) => {
        return curElement.discount >= value;
      });
      setTimeout(() => {
        setFilterLoad(false);
        setProducts(tempProducts);
      }, 500);
    } else {
      setTimeout((e) => {
        setFilterLoad(false);
        setProducts(items);
      }, 100);
    }
  };

  const filterBadge = (value, loyal) => {
    let tempProducts = products;
    setFilterLoad(true);

    if (loyal) {
      tempProducts = tempProducts.filter((curElement) => {
        return curElement.badge == value;
      });
      setTimeout(() => {
        setFilterLoad(false);
        setProducts(tempProducts);
      }, 500);
    } else {
      setTimeout((e) => {
        setFilterLoad(false);
        setProducts(items);
      }, 100);
    }
  };
  const filters = () => {
    const pro = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].discount >= 20) {
        pro.push(products[i]);
      }
    }
    setProducts(pro);
  };

  return (
    <div className="">
     
      <div className="w-full sticky top-20 z-10 md:hidden block px-4 my-2 ">
        <input
          type="search"
          name="seachvalue"
          id=""
          placeholder="search by product,brand"
          className="w-full  bg-white rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 text-base  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => {
            filterSearch(e.target.value);
          }}
        />
      </div>
      {loading && (
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-40 ">
          <picture>
            <img
              src="https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif"
              alt=""
            />
          </picture>
        </div>
      )}
      {filterLoad && (
        <div className="fixed top-[50%] z-30 left-[50%] -translate-x-[50%] -translate-y-[50%] ">
          <picture>
            <img
              src="/filterLoading2.gif"
              alt=""
              className="bg-transparent"
              width={110}
            />
          </picture>
        </div>
      )}

      <div className="flex">
        <div className=" sticky left-0 md:top-16 top-32 overflow-y-scroll overscroll-contain md:h-[90vh] h-fit md:border-none border bg-transparent      shadow-inner md:px-4 px-1 py-4 max-h-max ">
          <div>
            <div className="md:block hidden ">
              <input
                type="search"
                name="seachvalue"
                id=""
                placeholder="search by product,brand"
                className="w-full  bg-white rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 text-base placeholder:text-sm placeholder:text-gray-400  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => {
                  filterSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex space-y-1 ml-2  flex-col my-4  justify-center items-start">
            <div>
              <p className="md:text-lg text-xs text-orange-500 font-bold ">
                Filter by Price
              </p>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="price12"
                value={5000}
                disabled={price1}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setPrice2(!price2);
                  setPrice3(!price3);
                  setPrice4(!price4);
                  setPrice5(!price5);
                  filterPrice(e.target.value, e.target.checked, 1);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                ₹1 - ₹5000
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="price32"
                value={10000}
                disabled={price2}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setPrice1(!price1);
                  setPrice3(!price3);
                  setPrice4(!price4);
                  setPrice5(!price5);
                  filterPrice(e.target.value, e.target.checked, 5000);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                ₹5001 - ₹10000
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="price1"
                value={20000}
                disabled={price3}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setPrice2(!price2);
                  setPrice1(!price1);
                  setPrice4(!price4);
                  setPrice5(!price5);
                  filterPrice(e.target.value, e.target.checked, 10000);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                ₹10001 - ₹20000
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="price2"
                value={30000}
                disabled={price4}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setPrice2(!price2);
                  setPrice3(!price3);
                  setPrice1(!price1);
                  setPrice5(!price5);
                  filterPrice(e.target.value, e.target.checked, 20000);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                ₹20001 - ₹30000
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="price3"
                value={1000000}
                disabled={price5}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setPrice2(!price2);
                  setPrice3(!price3);
                  setPrice4(!price4);
                  setPrice1(!price1);
                  filterPrice(e.target.value, e.target.checked, 30000);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                ₹30001 - ₹ *
              </label>
            </div>
          </div>
          {/* fro discount */}
          <div className="flex space-y-1 ml-2  flex-col my-4  justify-center items-start">
            <div>
              <p className="md:text-lg text-xs text-orange-500 font-bold ">
                Filter by Discount
              </p>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="discount1"
                value={10}
                disabled={discount1}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setDiscount2(!discount2);
                  setDiscount3(!discount3);
                  setDiscount4(!discount4);
                  filterDiscount(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                10% or more
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="discount2"
                value={20}
                disabled={discount2}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setDiscount1(!discount1);
                  setDiscount3(!discount3);
                  setDiscount4(!discount4);
                  filterDiscount(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                20% or more
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="discount3"
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                disabled={discount3}
                value={30}
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setDiscount2(!discount2);
                  setDiscount1(!discount1);
                  setDiscount4(!discount4);
                  filterDiscount(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                30% or more
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="discount4"
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                value={40}
                disabled={discount4}
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setDiscount2(!discount2);
                  setDiscount3(!discount3);
                  setDiscount1(!discount1);
                  filterDiscount(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                40% or more
              </label>
            </div>
          </div>
          {/* for rating */}

          <div className="flex space-y-1 ml-2  flex-col my-4  justify-center items-start">
            <div>
              <p className="md:text-lg text-xs text-orange-500 font-bold ">
                Filter by Ratings
              </p>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="rating1"
                disabled={rating1}
                value={3}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setRating2(!rating2);
                  filterRating(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base flex items-center text-xs tracking-normal  font-medium"
              >
                <div className="bg-lime-400  p-1 flex   font-semibold items-center w-fit rounded-lg">
                  <p> 3 </p>
                  <AiFillStar className="md:w-3 w-2  " />
                </div>
                &nbsp;or more
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="rating2"
                disabled={rating2}
                value={4}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setRating1(rating1);
                  filterRating(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base flex items-center text-xs tracking-normal  font-medium"
              >
                <div className="bg-lime-400  p-1 flex  font-semibold items-center w-fit rounded-lg">
                  <p> 4 </p>
                  <AiFillStar className="md:w-3  w-2  " />
                </div>
                &nbsp;or more
              </label>
            </div>
          </div>
          <div className="flex space-y-1 ml-2  flex-col my-4  justify-center  items-start">
            <div>
              <p className="md:text-lg text-xs text-orange-500 font-bold ">
                Filter by Badges
              </p>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="badge1"
                value={"same day dispatch"}
                disabled={badge1}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setBadge2(!badge2);
                  setBadge3(!badge3);
                  setBadge4(!badge4);
                  filterBadge(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-[8px] tracking-normal  font-medium"
              >
                Same Day Dispatch
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="badge2"
                value={"In Demand"}
                disabled={badge2}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setBadge1(!badge1);
                  setBadge3(!badge3);
                  setBadge4(!badge4);
                  filterBadge(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                In Demand
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="badge3"
                value={"OFFER50"}
                disabled={badge3}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setBadge2(!badge2);
                  setBadge1(!badge1);
                  setBadge4(!badge4);
                  filterBadge(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                OFFER50
              </label>
            </div>
            <div className="flex items-center md:space-x-3 space-x-1 ">
              <input
                type="checkbox"
                name="badge1"
                value={"Top Seller"}
                disabled={badge4}
                className="md:w-4 md:h-4 accent-orange-400 cursor-pointer "
                id=""
                onChange={(e) => {
                  setCheck(e.target.checked);
                  setBadge2(!badge2);
                  setBadge3(!badge3);
                  setBadge1(!badge1);
                  filterBadge(e.target.value, e.target.checked);
                }}
              />
              <label
                htmlFor=""
                className="md:text-base text-xs tracking-normal  font-medium"
              >
                Top Seller
              </label>
            </div>
          </div>
          <div
            onClick={getProducts}
            className="p-2 text-sm font-bold border hover:ring-2 hover:ring-orange-300 focus:shadow-md border-orange-500 text-orange-500 rounded-lg cursor-pointer w-fit text-center mx-auto"
          >
            Clear Filters
          </div>
        </div>

        {!loading && (
          <main
            className={`flex flex-1 flex-wrap mt-4  z-0   justify-center ${
              filterLoad ? "blur-sm" : "blur-none"
            }  `}
          >
            {products.map((item) => {
              return (
                <Display
                  id={item.id}
                  title={item.title}
                  descripton={item.descripton}
                  category={item.category}
                  info1={item.info1}
                  info2={item.info2}
                  info3={item.info3}
                  imageUrl={item.imageUrl}
                  brand={item.brand}
                  badge={item.badge}
                  rating={item.rating}
                  originalPrice={item.originalPrice}
                  discountPrice={item.discountPrice}
                  discount={item.discount}
                  addToCart={addToCart}
                  buyNow={buyNow}
                />
              );
            })}
          </main>
        )}
      </div>
      
    </div>
  );
}
