import React, { useState } from "react";
import Header2 from "./Header2";
import ClickedItems from "./ClickedItems";
import Footer from "./Footer";
import Cart from "./Cart";

const ItemPage = () => {
  return (
    <>
      <Header2 />
      <ClickedItems />
      <Footer />
    </>
  );
};

export default ItemPage;
