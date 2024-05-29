import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [btnVal, setBtnVal] = useState("Sign up");
  const [linkVal, setLinkVal] = useState("login");
  const [isUser, setIsUser] = useState("Already have an account?");
  const [eye, setEye] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location ", location);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pwHandler = () => {
    setEye((prev) => !prev);
    // console.log(eye);
  };

  const notify = () => {
    // toast('Signing up')
  };

  const regHandler = (e) => {
    e.preventDefault();

    // === Login ===
    if (location.pathname === "/login") {
      if (username == "") {
        toast.warning("Enter your username");
      } else if (password == "") {
        toast.warning("Enter a password");
      } else {
        const logInfo = {
          username: username,
          password: password,
        };
        axios.post("http://localhost:8080/login", logInfo).then((res) => {
          console.log(res);
          if (res.data.message == "Email or password is incorrect") {
            toast.error("Email or password is incorrect");
          } else {
            if (res.data.message == "Login successful") {
              toast.success("Login successful");
              localStorage.setItem("id", res.data.results[0].id);
              localStorage.setItem("username", res.data.results[0].username);
              localStorage.setItem("email", res.data.results[0].email);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }
          }
        });
      }

      // === Signup ===
    } else {
      if (username == "") {
        toast.warning("Enter your username");
      } else if (email == "") {
        toast.warning("Enter your email id");
      } else if (password == "") {
        toast.warning("Enter a password");
      } else {
        const info = {
          username: username,
          email: email,
          password: password,
        };
        axios.post("http://localhost:8080/signup", info).then((res) => {
          console.log(res);
          if (res.data.message == "Username taken") {
            toast.warning("Username taken");
          } else if (res.data.message == "Email already exist") {
            toast.warning("Email already exist");
          } else if (res.data.message == "Sign up successful") {
            toast.success("Sign up successful");
            setUsername("");
            setEmail("");
            setPassword("");
            setEye(false);
            navigate("/login");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (location.pathname == "/login") {
      setBtnVal("Login");
      setLinkVal("signup");
      setIsUser("Don't have an account?");
    }
    if (location.pathname == "/signup") {
      setBtnVal("Sign up");
      setLinkVal("login");
      setIsUser("Already have an account?");
    }
  });

  return (
    <>
      <div className="register container">
        <ToastContainer autoClose={2000} />
        <div className="signup">
          <svg
            onClick={() => navigate("/")}
            className="closeForm"
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

          <svg
            className="cloud"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
          </svg>

          <h1>{btnVal}</h1>
          <form onSubmit={regHandler}>
            <div className="signup__wrapper">
              <div className="input__box">
                <input
                  className={username ? "has-value" : ""}
                  type="type"
                  autoComplete="off"
                  id="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="input">Username</label>
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="spinner"></span>
              </div>
              {btnVal == "Sign up" && (
                <div className="input__box">
                  <input
                    className={email ? "has-value" : ""}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
              )}
              <div className="input__box">
                <input
                  className={password ? "has-value" : ""}
                  type={eye ? "text" : "password"}
                  id="pw"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                <span className="eye" onClick={() => pwHandler()}>
                  {eye && (
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                  {!eye && (
                    <svg
                      id="eye-close"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <span className="check">
              {btnVal == "Sign up" && (
                <>
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">Rerember me</label>
                </>
              )}
              {btnVal == "Login" && <a>Forget password?</a>}
            </span>
            <button className="regBtn" onClick={notify}>
              <p>{btnVal}</p>
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
            <span className="hasAcc">
              <p>
                {isUser}{" "}
                <a
                  onClick={() => {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setEye(false);
                    navigate(`/${linkVal}`);
                  }}
                >
                  {linkVal}
                </a>
              </p>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
