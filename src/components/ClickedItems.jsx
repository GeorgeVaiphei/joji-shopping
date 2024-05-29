import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/citems.css";
import { ToastContainer, toast } from "react-toastify";

const ClickedItems = () => {
  const params = useParams();
  // const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState("");
  const navigate = useNavigate();

  const [cart, setCart] = useState(false);
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState([]);
  const [cartId, setCartId] = useState([]);

  var id = params.id;
  console.log("Id : " + id);
  useEffect(() => {
    wishId.map((item) => {
      console.log("items are : ", item.wish_id);
      if (item.wish_id == id) {
        setWish(true);
      }
    });
    cartId.map((item) => {
      console.log("items are : ", item.item_id);
      if (item.item_id == id) {
        setCart(true);
      }
    });
  }, [cartId]);

  useEffect(() => {
    // setIsLoading(true);
    axios.get("https://dummyjson.com/products/" + id).then((res) => {
      console.log(res.data);
      setItem(res.data);
    });
    axios.get("http://localhost:8080/cartlist").then((res) => {
      console.log(res.data.message);
      setCartId(res.data.message);
    });
    axios.get("http://localhost:8080/wishlist").then((res) => {
      console.log(res.data.message);
      setWishId(res.data.message);
    });
    // setIsLoading(false);
  }, [id]);

  const offers = [
    "Bank OfferGet ₹50 instant discount on first Joji.com UPI txn on order of ₹200 and above",
    "Bank Offer5% Cashback on Joji.com Axis Bank Card",
    "Bank Offer10% off up to ₹1,000 on HDFC Bank Credit Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹7500",
    "Special PriceGet extra ₹20901 off (price inclusive of cashback/coupon)",
    "FreebieFlat ₹1000 off on Cleartrip hotels booking along with 300 supercoins on booking",
    "FreebieFlat ₹650 off on Cleartrip flights booking along with 300 supercoins on booking",
    "Bank Offer₹1000 off on UPI Transactions",
    "FreebieSpotify Premium - 12M at ₹699",
    "Buy for 2000 get ₹500 off your Next Buy",
    "Get ₹2000 off on combo offer",
    "EMI starting from ₹2,075/month",
  ];

  const buyHandler = () => {
    if (!localStorage.getItem("email")) {
      toast.warning("Please login first");
    }
  };

  // ====== CART HANDLER ======

  const cartHandler = () => {
    if (!localStorage.getItem("email")) {
      toast.warning("Please login first");
    } else {
      if (cart) {
        let uid = id;
        console.log("uid ", uid);
        axios.delete("http://localhost:8080/deleteitem/" + uid).then((res) => {
          console.log(res);
          if (res.data.message == "Deleted") {
            setCart(false);
            console.log("Cart Deleted");
          }
        });
      } else {
        let data = {
          item_id: item.id,
          item_title: item.title,
          item_thumbnail: item.thumbnail,
          item_price: item.price,
          item_stock: item.stock,
          item_discountPercentage: item.discountPercentage,
        };

        axios.post("http://localhost:8080/storedata", data).then((res) => {
          console.log(res);
          if (res.data.message == "Data stored") {
            setCart(true);
            console.log("Cart added");
          }
        });
        console.log("Cart ", data);
      }
    }
  };

  // ====== WISH HANDLER ======

  const wishHandler = () => {
    if (!localStorage.getItem("email")) {
      toast.warning("Please login first");
    } else {
      if (wish) {
        let uid = id;
        console.log("uid ", uid);
        axios.delete("http://localhost:8080/deletewishitem/" + uid).then((res) => {
          console.log(res);
          if (res.data.message == "Deleted") {
            setWish(false);
            console.log("Wish Deleted");
          }
        });
      } else {
        let data = {
          wish_id: item.id,
          item_title: item.title,
          item_thumbnail: item.thumbnail,
          item_price: item.price,
          item_stock: item.stock,
          item_discountPercentage: item.discountPercentage,
        };

        axios.post("http://localhost:8080/storewish", data).then((res) => {
          console.log(res);
          if (res.data.message == "Data stored") {
            setWish(true);
            console.log("Wish added");
          }
        });
        console.log("Wish ", data);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="cItems container">
        <div className="cItems__wrapper">
          <div className="thumbnail">
            <img src={item.thumbnail} alt="thumbnail" />
            <div className="choice">
              <button className="cartBtn" onClick={cartHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={cart ? "#aaa" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={cart ? "0.5" : "1.5"}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                {cart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button className="wishBtn" onClick={wishHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={wish ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={wish ? "0" : "1.5"}
                  // stroke={wish ? "red" : "currentColor"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                {wish ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

          <div className="detail">
            <div className="shipping">Free Shipping</div>
            {/* <h3 className="brand">{item.brand}</h3> */}
            <h2 className="title">{item.title}</h2>

            <div className="price_box">
              <h1 className="price">${item.price}</h1>
              <span className="dis">{item.discountPercentage}% off</span>
            </div>
            <span className="stock">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              {item.stock} pcs left
            </span>

            <div className="des">{item.description}</div>
            <button className="buyBtn" onClick={buyHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              Buy now
            </button>

            <div className="offers">
              <span>Available offers</span>
              <div className="offersss">
                {offers.map((offs) => (
                  <>
                    <div className="offer-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6Z"
                        />
                      </svg>
                      <p>{offs}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClickedItems;
