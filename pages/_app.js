import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const [cartOnly, setCartOnly] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cartonly")) {
        setCartOnly(JSON.parse(localStorage.getItem("cartonly")));
        saveCart(JSON.parse(localStorage.getItem("cartonly")));
      }
    } catch (err) {
      console.log(err);
      localStorage.clear();
    }
  }, [router]);

  const saveCart = (newCart) => {
    localStorage.setItem("cartonly", JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subt +=
        parseInt(newCart[keys[i]]["price"].replace(/,/g, "")) *
        newCart[keys[i]].qty;
    }
    setSubTotal(subt);
    console.log(newCart);
  };

  const addToCart = (itemcode, qty, title, price) => {
    if (Object.keys(cartOnly).length === 0) {
      setKey(Math.random());
    }
    let newCart = cartOnly;
    console.log(cartOnly, "rohit siva sai");

    if (itemcode in cartOnly) {
      newCart[itemcode].qty = cartOnly[itemcode].qty + qty;
    } else {
      newCart[itemcode] = { qty: 1, title, price };
    }
    setCartOnly(newCart);
    saveCart(newCart);

    toast.success(`${title} is added to cart`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const removeFromCart = (itemcode, qty, title, price) => {
    let newCart = cartOnly;
    if (itemcode in cartOnly) {
      newCart[itemcode].qty = cartOnly[itemcode].qty - qty;
    }
    if (newCart[itemcode]["qty"] <= 0) {
      delete newCart[itemcode];
    }
    setCartOnly(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCartOnly({});
    saveCart({});
    toast.success(`Your cart is cleared is Successfully`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const buyNow = (itemcode, qty, title, price) => {
    let newCart = {};
    newCart[itemcode] = { qty: 1, title, price };
    setCartOnly(newCart);
    saveCart(newCart);
    toast.success(`Fill out the checkout details to Buy Now`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.push("/checkout");
  };
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-CKGGXCJ4DY");
  });

  return (
    <>
      <Head>
        <title>CrazyShop </title>
        <link rel="icon" href="/icon1.png" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CKGGXCJ4DY"
        ></script>
       
      </Head>
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
      <Navbar
        key={key}
        cartOnly={cartOnly}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cartOnly={cartOnly}
        subTotal={subTotal}
        addToCart={addToCart}
        buyNow={buyNow}
        removeFromCart={removeFromCart}
        {...pageProps}
      />
    </>
  );
}
