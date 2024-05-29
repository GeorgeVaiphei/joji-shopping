import React, { useEffect, useState } from "react";
import "../styles/profileInfo.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileInformation = () => {
  const [pinfo, setPinfo] = useState(false);
  const [einfo, setEinfo] = useState(false);
  const [minfo, setMinfo] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [male, setMale] = useState(true);

  let user_id = localStorage.getItem("id");

  useEffect(() => {
    axios.get("http://localhost:8080/singleuserlist/" + user_id).then((res) => {
      console.log(res);
      setFname(res.data.message[0].username);
      setLname(res.data.message[0].id);
      setEmail(res.data.message[0].email);
      setMob(res.data.message[0].mob);
    });
  }, []);

  const updateHandler = () => {
    let updateData = {
      username: fname,
      email: email,
      mob: mob,
    };

    console.log(user_id);
    console.log(updateData);

    axios
      .put("http://localhost:8080/update/" + user_id, updateData)
      .then((res) => {
        console.log(res.data.message);
      });
    
      localStorage.setItem('username', fname)
      localStorage.setItem('email', email)
      localStorage.setItem('id', id)
  };

  return (
    <>
      <section className="profile__info container">
        <section className="pro__info__wrapper">
          <section className="pro__info__box">
            {" "}
            <div className="_info">
              <h1>Personal Information</h1>{" "}
              <span onClick={() => setPinfo((prev) => !prev)}>
                {pinfo ? "Cancel" : "Edit"}
              </span>
            </div>
            <span className="pro_info_input">
              <input
                type="text"
                className={pinfo ? "" : "disabled"}
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <input
                type="text"
                className={pinfo ? "" : "disabled"}
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              {pinfo && (
                <button className="saveBtn" onClick={() => {
                  updateHandler();
                  setPinfo(false)}}>
                  Save
                </button>
              )}
            </span>
            <h2>Your Gender</h2>
            <span className="gender">
              <input type="radio" name="gender" id="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" />
              <label htmlFor="female">Female</label>
            </span>
          </section>
          <section className="pro__info__box">
            <div className="_info">
              <h1>Email Address</h1>{" "}
              <span onClick={() => setEinfo((prev) => !prev)}>
                {einfo ? "Cancel" : "Edit"}
              </span>
            </div>
            <span className="pro_info_input">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={einfo ? "info_input" : "info_input disabled"}
                type="text"
              />
              {einfo && (
                <button className="saveBtn" onClick={() => {
                  updateHandler();
                  setEinfo(false)}}>
                  Save
                </button>
              )}
            </span>
          </section>
          <section className="pro__info__box">
            <div className="_info">
              <h1>Mobile Number</h1>{" "}
              <span onClick={() => setMinfo((prev) => !prev)}>
                {minfo ? "Cancel" : "Edit"}
              </span>
            </div>
            <span className="pro_info_input">
              <input
                value={mob}
                onChange={(e) => setMob(e.target.value)}
                className={minfo ? "info_input" : "info_input disabled"}
                type="text"
              />
              {minfo && (
                <button
                  className="saveBtn"
                  onClick={() => {
                    updateHandler();
                    setMinfo(false);
                  }}
                >
                  Save
                </button>
              )}
            </span>
          </section>
        </section>
      </section>
    </>
  );
};

export default ProfileInformation;
