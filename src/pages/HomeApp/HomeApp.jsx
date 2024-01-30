import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import "./HomeApp.css";

const HomeApp = () => {
  const [profiles, setProfiles] = useState([]);
  const [toggleNation, setToggleNation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nationalities, setNationalities] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(true);

  useEffect(() => {
    getPaginationProfiles();
    getAllNationalities();
  }, [currentPage]);

  const getAllNationalities = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  const getPaginationProfiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/profiles?page=${currentPage}`
      );
      const data = response.data;
      setProfiles(data);
      if (data.length < 9) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex_display_filter">
        <div className={`filters ${toggleFilter ? "" : "hidden"}`}>Filters</div>
        <div className="page_order">
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
          <button onClick={() => setToggleFilter(!toggleFilter)}>
            Show filters
          </button>
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
                    <div>Bio:</div>
                    <div>{profile.bio}</div>
                    <div>Lenguages:</div>
                    <ProfileLanguages languages={profile.languages} />
                    <div>Intereses:</div>
                    <ProfileInterests interests={profile.interest} />
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
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={lastPage === true}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeApp;
