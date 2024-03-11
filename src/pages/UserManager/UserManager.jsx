import axios from "axios";
import React, { useState } from "react";
import "./UserManager.css";

const UserManager = () => {
  const [user, setUser] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [role, setRole] = useState("");

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/search/${userEmail}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/search/${userEmail}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateUser = async (userId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        role,
      });
      setEditToggle(true);
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
          <h3>
            {user && user.profile.name} {user && user.profile.last_name}
          </h3>
          {editToggle ? (
            <select name="" id="" onChange={(e) => setRole(e.target.value)}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          ) : (
            <h3>{user && user.user.role}</h3>
          )}
          <button onClick={() => setEditToggle(!editToggle)}>
            {editToggle ? "Cancel" : "Edit"}
          </button>
          {editToggle ? (
            <button onClick={() => updateUser(user.user._id)}>Accept</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default UserManager;
