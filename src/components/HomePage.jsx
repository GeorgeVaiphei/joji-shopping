import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export const Context = React.createContext();

const HomePage = () => {
  const [searchData, setSearchData] = useState("");

  return (
    <>
      <Context.Provider value={[searchData, setSearchData]}>
        <Header />
        <Content />
        <Footer />
      </Context.Provider>
    </>
  );
};

export default HomePage;
