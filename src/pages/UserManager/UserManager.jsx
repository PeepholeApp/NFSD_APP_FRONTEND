import axios from "axios";
import React, { useState } from "react";
import "./UserManager.css";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/search/${userName}`
      );

      console.log("user:", response.data);
      setUsers(response.data);
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="userManagerFlex">
        <div className="userManagerContainer">
          <h2>Search</h2>
          <label htmlFor=""></label>
          <input onChange={(e) => setUserName(e.target.value)} type="text" />
          <button onClick={getUserByEmail}>Search</button>
        </div>
        <div className="background1 getUserContainer">
          <h2>User details</h2>
          {users &&
            users.map((user, id) => (
              <div key={id}>
                <h3>{user.name}</h3>
                <h3>{user.last_name}</h3>
                <h3>{user.user.email}</h3>
                <h3>{user.dob}</h3>
                <h3>{user.nationality}</h3>
                <h3>{user.gender}</h3>
                <h3>{user.languages}</h3>
                <h3>{user.bio}</h3>
                <h3>{user.interest}</h3>
              </div>
            ))}
          <button>Edit</button>
        </div>
      </div>
    </>
  );
};

export default UserManager;
