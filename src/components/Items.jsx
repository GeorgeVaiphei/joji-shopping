import React from "react";
import "../styles/content.css";

const Items = (props) => {
  return (
    <>
      <img src={props.data.thumbnail} alt="thumbnail" />
      <h3 className="brand">{props.data.brand}</h3>
      <h2 className="title">{props.data.title}</h2>
      <div className="price_box">
        <h1 className="price">${props.data.price}</h1>
        <span className="dis">{props.data.discountPercentage}% off</span>
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
        {props.data.stock} pcs left
      </span>
    </>
  );
};

export default Items;
