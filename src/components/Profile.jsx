import React, { useContext, useEffect, useState } from "react";
import "../styles/profile.css";
import ProfileInformation from "../subComponents/ProfileInformation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Wishlist from "../subComponents/Wishlist";

const Profile = () => {
  const pName = localStorage.getItem("username") ||  'user';
  const [windowSize, setWindowSize] = useState(false);
  const [proInfo, setProInfo] = useState(true);
  const [proInfo2, setProInfo2] = useState(true);
  const [wishInfo, setWishInfo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth > 768) {
      setWindowSize(true);
    } else {
      setWindowSize(false);
    }
  });

  const logoutHandler = () => {
    if(window.confirm("Log Out?")){
      localStorage.clear();
      toast.error("Logged out")
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  }
  return (
    <>
    <ToastContainer />
      <div className="profile container">
        <div className="profile__wrapper">
          <div className="pro1">
            <div className="subpro1">
              <img src="/jicon2.png" alt="pro-pic" />
              <span>
                <h3>Hello,</h3>
                <h1>{pName}</h1>
              </span>
            </div>

            <div className="subpro2">
              <div className="head">
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                My Orders
              </div>
              <div className="pro_nav">
                <span className="sub_head">
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Account Settings
                </span>
                <span
                  style={
                    proInfo
                      ? { backgroundColor: "#e5e7eb", color: "#1d4ed8" }
                      : {}
                  }
                  className="sub__pro__nav"
                  onClick={() => {
                    setProInfo((prev) => !prev);
                    setProInfo2((prev) => !prev);
                  }}
                >
                  Profile Information
                </span>
                <section>
                  {!windowSize && proInfo && <ProfileInformation />}
                </section>
                <span className="sub__pro__nav">Manage Addresses</span>
                <span className="sub__pro__nav">PAN Card Information</span>
              </div>
              <div className="pro_nav">
                <span className="sub_head">
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
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  Payments
                </span>
                <span className="sub__pro__nav">Gift Cards</span>
                <span className="sub__pro__nav">Saved UPI</span>
                <span className="sub__pro__nav">Saved Cards</span>
              </div>
              <div className="pro_nav">
                <span className="sub_head">
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
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  My Stuffs
                </span>
                <span className="sub__pro__nav">My Coupons</span>
                <span className="sub__pro__nav">My Reviews & Ratings</span>
                <span className="sub__pro__nav"
                onClick={() => setWishInfo(prev => !prev)}
                style={
                  wishInfo
                    ? { backgroundColor: "#e5e7eb", color: "#1d4ed8" }
                    : {}
                }
                >My Wishlist</span>
                <section>
                  {!windowSize && wishInfo && <Wishlist />}
                </section>
              </div>
              <div className="head" onClick={logoutHandler}>
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
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
                Logout
              </div>
            </div>
          </div>

          <div className="pro2">
            {windowSize && proInfo2 && <ProfileInformation />}
            {windowSize && wishInfo && <Wishlist />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
