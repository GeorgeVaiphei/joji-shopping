import React from "react";
import Items from "./Items";
import { useNavigate } from "react-router-dom";

const SearchContent = (props) => {
  const navigate = useNavigate();
    let data = props.searchData;
    console.log(props.searchData)
  return (
    <>
      {data && data.map((data, ind) => (
        <div key={ind} className="content__items" onClick={() => navigate('/items/'+data.id)}>
          <Items data={data} />
        </div>
      ))}
    </>
  );
};

export default SearchContent;
