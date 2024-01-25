import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HomeApp.css";

const countries = ["Arg", "Col", "Ven"];

const HomeApp = () => {
  const [profiles, setProfiles] = useState([]);
  const [toggleNation, setToggleNation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    getPaginationProfiles();
    getAllProfiles();
  }, [currentPage]);

  const getAllProfiles = async () => {
    const response = await axios.get("http://localhost:3001/profiles/all");
    const users = response.data;
    const countries = users.reduce((acc, user) => {
      if (acc.includes(user.nationality)) {
        return acc;
      }
      acc.push(user.nationality);
      return acc;
    }, []);
    setNationalities(countries);
  };

  const getPaginationProfiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/profiles?page=${currentPage}`
      );
      setProfiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="page_order">
        <h1>Find your people</h1>
        <div className="nationality_filter_container">
          {nationalities.map((nationality, id) => (
            <div
              key={id}
              className={`nationality_filter ${
                toggleNation ? "checkNation" : ""
              }`}
              onClick={() => setToggleNation(!toggleNation)}
            >
              <h3>{nationality}</h3>
            </div>
          ))}
        </div>
        <div className="cards_container">
          <ul className="card_flex">
            {profiles.map((profile, id) => (
              <li key={id} className="card_profile">
                <div className="card_image">
                  <h3>
                    {profile.name} {profile.last_name}
                  </h3>
                </div>
                <div className="card_details">
                  <h3>{profile.bio}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
};

export default HomeApp;
