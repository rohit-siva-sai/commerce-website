import React, { useState } from "react";
import { db } from "../config/firebase";
import { getDocs, addDoc, doc, collection } from "firebase/firestore";

const Addpro = () => {
  const [title, setTilte] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");
  const [info3, setInfo3] = useState("");
  const [badge, setBadge] = useState("");
  const [img, setImg] = useState("");
  const [rating, setRating] = useState("");
  const [org, setOrg] = useState("");
  const [per, setPer] = useState();
  const [disc, setDisc] = useState(0);

  const submitProduct = async () => {
    try {
      await addDoc(productCollection, {
        title: title,
        descripton: desc,
        rating: rating,
        originalPrice: org,
        discountPrice: disc,
        imageUrl: img,
        info1: info1,
        info2: info2,
        info3: info3,
        category: category,
        brand: brand,
        badge: badge,
        discount: per,
      });
      // getMovieList();
      alert("successfully added");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-col divide-y-4 space-y-4">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => {
            setTilte(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="rating"
          onChange={(e) => {
            setRating(Number(e.target.value));
          }}
        />
        <input
          type="string"
          placeholder="ogprice"
          onChange={(e) => {
            setOrg(e.target.value);
          }}
        />
        <input
          type="string"
          placeholder="dcprice"
          onChange={(e) => {
            setDisc(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="discountpercentage"
          onChange={(e) => {
            setPer(Number(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="info1"
          onChange={(e) => {
            setInfo1(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="info2"
          onChange={(e) => {
            setInfo2(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="info3"
          onChange={(e) => {
            setInfo3(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="imageUrl"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="brand"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="badge"
          onChange={(e) => {
            setBadge(e.target.value);
          }}
        />

        <button onClick={submitProduct}>Sumbit Product</button>
      </div>
    </div>
  );
};

export default Addpro;
