import React, { useContext, useEffect, useState } from "react";
import "../styles/header.css";
import { Context } from "./HomePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [pname, setPName] = useState("");
  const [menu, setMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobOpen, setMobOpen] = useState(false);
  console.log(mobOpen);
  console.log("logged in ", isLoggedIn);

  // Use context from Homepage
  const [searchData, setSearchData] = useContext(Context);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  let user_id = localStorage.getItem("id");
  
  useEffect(() => {
    localStorage.getItem("email") ? setIsLoggedIn("true") : "";
    
    setPName(localStorage.getItem("username"));
    
    // Menu open overflow handling
    let overflow;
    menu ? (overflow = "hidden") : (overflow = "auto");
    document.body.style.overflowY = overflow;

    // Scroll Nav show/hide
    let top = 0;
    window.addEventListener(
      "scroll",
      () => {
        let { scrollY } = window;
        if (scrollY > top) {
          setShowNav(false);
        } else if (scrollY < top) {
          setShowNav(true);
        }
        top = scrollY <= 0 ? 0 : scrollY;
      },
      { passive: true }
    );
    top = scrollY <= 0 ? 0 : scrollY;
  }, []);

  // Search Handling
  const searchHandler = (input) => {
    if (input == "") {
      setSearchData("");
    } else {
      axios.get(`https://dummyjson.com/products`).then((res) => {

        let results = res.data.products.filter((data) => {
          if (input !== "") {
            return (
              (data && data.title.toLowerCase().includes(input)) ||
              data.category.toLowerCase().includes(input)
            );
          }
        });

        setSearchData(results);
        console.log("Rus header 1 ", results);
      });
    }
  };

  return (
    <>
      <header className="header">
        <nav className={showNav ? "navbar showNav" : "navbar"}>
          {/* === LOGO === */}
          <ul className="nav__item-1">
            <a href="/" className="logo">
              JOJI.com
            </a>
          </ul>
          {/* === Search === */}
          <ul className={mobOpen ? "mobOpen" : "nav__item-2"}>
            <input
              type="text"
              placeholder="Search Products"
              onChange={(e) => {
                setSearchInput(e.target.value);
                searchHandler(searchInput);
              }}
            />
            <svg
              onClick={() => searchHandler(searchInput)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {mobOpen && (
              <svg
                onClick={() => setMobOpen((prev) => !prev)}
                id="closeSearchBtn"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </ul>

          {/* === Mobile search === */}
          {!mobOpen && (
            <ul className="s-icon">
              <svg
                onClick={() => setMobOpen((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </ul>
          )}

          {/* === Nav Items === */}
          <ul className={menu ? "nav__item-3" : "close"}>
            <div className="link__wrapper">
              {!isLoggedIn && (
                <li className="nav__links" onClick={() => navigate("/signup")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <a href="">Signup</a>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav__links" onClick={() => navigate("/profile")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <a href="">{pname}</a>
                </li>
              )}
              <li className="nav__links" onClick={() => navigate("/cart")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <a href="#">Cart</a>
              </li>
              <li className="nav__links">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                <a href="#">Services</a>
              </li>
            </div>
          </ul>
          <ul className="menu" onClick={() => setMenu((prev) => !prev)}>
            <div id="menuOpen" className={menu ? "close" : ""}>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            <div id="menuClose" className={menu ? "" : "close"}>
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
