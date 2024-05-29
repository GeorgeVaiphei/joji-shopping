import React, { useState } from "react";
import Header2 from "./Header2";
import Cart from "./Cart";
import Footer from "./Footer";
import CartHas from "./CartHas";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState("");

  axios.get("http://localhost:8080/cartlist").then((res) => {
    setCartItems(res.data.message);
  });
  return (
    <>
      <Header2 />
      {cartItems && <CartHas />}
      {!cartItems && <Cart />}
      <Footer />
    </>
  );
};

export default CartPage;
