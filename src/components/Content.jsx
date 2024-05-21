import React, { useContext, useEffect, useState } from "react";
import "../styles/content.css";
import axios from "axios";
import Items from "./Items";
import SearchContent from "./SearchContent";
import { Context } from "./HomePage";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [data, setData] = useState("");
  const [skip, setSkip] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Use context from Homepage
  const [searchData] = useContext(Context);
  console.log(searchData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(`https://dummyjson.com/products?skip=${skip}&limit=20`)
        .then((res) => {
          setIsLoading(false);
          setData((prev) => [...prev, ...res.data.products]);
        });
    };

    // const fetchData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const res = await fetch(
    //       `https://dummyjson.com/products?skip=${skip}&limit=20`
    //     );
    //     const data = await res.json();
    //     setIsLoading(false);
    //     setData((prev) => [...prev, ...data.products]);
    //     console.log(data.products);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    fetchData();
  }, [skip]);
  console.log(data);

  return (
    <>
      <div className="content container">
        {!data && (
          <div className="loading">
            <div className="loader"></div>
          </div>
        )}
        <div className="content__wrapper">
          <SearchContent searchData={searchData} />
          {!searchData &&
            data &&
            data.map((data, ind) => (
              <div key={ind} className="content__items" onClick={() => navigate('items/'+data.id)}>
                <Items data={data} />
              </div>
            ))}
        </div>
        <div className="container loadBtn">
          {data && (
            <>
              {!searchData && skip < 80 && (
                <button onClick={() => setSkip((prev) => prev + 20)}>
                  {loading ? "Loading. . ." : "Load More"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
