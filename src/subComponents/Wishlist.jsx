import React, { useState } from "react";
import "../styles/wishlist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState("");

  axios.get("http://localhost:8080/wishlist").then((res) => {
    setWishlist(res.data.message);
  });

  return (
    <>
      <div className="wishlist container">
        <div className="wishlist__wrapper">
          {wishlist &&
            wishlist.map((item, index) => (
              <div className="wish__item" onClick={() => navigate('items/'+item.wish_id)}>
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

export default Wishlist;
