import axios from "axios";
import React, { useState } from "react";
import Dashboard from "../../container/Dashboard/Dashboard";
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
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      setUser();
      console.log(error);
    } finally {
    }
  };

  const updateUser = async (userId) => {
    if (role === "null") {
      return;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        role,
      });
      setEditToggle(false);
      getUserByEmail();
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
        {user && (
          <div className="background1 getUserContainer">
            <h2>User details</h2>
            <h3>
              {user && user.profile.name} {user && user.profile.last_name}
            </h3>
            {editToggle ? (
              <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                <option value="null">Select option</option>
                <option value="null" disabled>
                  ---------------------
                </option>
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
        )}
        <div className="dashboardStyle">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default UserManager;
