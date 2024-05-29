import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/wishlist.css"

const CartHas = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState("");

    axios.get("http://localhost:8080/cartlist").then((res) => {
        setCartItems(res.data.message);
      });
      
  return (
    <>
      <div className="wishlist container">
        <div className="wishlist__wrapper">
        {cartItems &&
            cartItems.map((item, index) => (
              <div className="wish__item" onClick={() => navigate('items/'+item.item_id)}>
                <div className="img">
                  <img src={item.item_thumbnail} alt="" />
                </div>
                <div className="item_des">
                  <p className="title">{item.item_title}</p>
                  <p className="price">
                    ${item.item_price}
                    <p id="dc">{item.item_discountPercentage}%</p>
                  </p>

                  <p className="stock">{item.item_stock} pcs. in stock</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CartHas;
