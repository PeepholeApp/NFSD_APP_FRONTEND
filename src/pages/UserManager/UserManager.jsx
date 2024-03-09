import axios from "axios";
import React, { useState } from "react";
import "./UserManager.css";

const UserManager = () => {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/search/${userEmail}`
      );
      console.log("user:", response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <div className="userManagerFlex">
        <div className="userManagerContainer">
          <h2>Search</h2>
          <label htmlFor=""></label>
          <input onChange={(e) => setUserEmail(e.target.value)} type="text" />
          <button onClick={getUserByEmail}>Search</button>
        </div>
        <div className="background1 getUserContainer">
          <h2>User details</h2>
          {/* <h3>{user && user.profile.name}</h3>
          <h3>{user && user.profile.last_name}</h3>
          <h3>{user && user.user.role}</h3> */}
          <button onClick={() => console.log(user)}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default UserManager;
