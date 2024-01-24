import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HomeApp.css";

const countries = ["Arg", "Col", "Ven"];

const members = [
  {
    name: "Diego",
    description: "Hola soy Diego",
    nationality: "Colombia",
  },
  {
    name: "Karen",
    description: "Hola soy Karen",
    nationality: "Venezuela",
  },
  {
    name: "Maribel",
    description: "Hola soy Maribel",
    nationality: "Argentina",
  },
  {
    name: "Victor",
    description: "Hola soy Victor",
    nationality: "Colombia",
  },
  {
    name: "Daniel",
    description: "Hola soy Daniel",
    nationality: "Venezuela",
  },
  {
    name: "Fer",
    description: "Hola soy Fer",
    nationality: "Argentina",
  },
];

const HomeApp = () => {
  const [profiles, setProfiles] = useState([]);
  const [toggleNation, setToggleNation] = useState(false);

  useEffect(() => {
    getAllProfiles();
  }, []);

  const getAllProfiles = async () => {
    const data = (await axios.get("http://localhost:3001/profiles")).data;
    setProfiles(data);
  };

  console.log("Estos son los perfiles: ", profiles);

  return (
    <>
      <div className="page_order">
        <h1>Find your people</h1>
        <div className="nationality_filter_container">
          {countries.map((country, id) => (
            <div
              key={id}
              className={`nationality_filter ${
                toggleNation ? "checkNation" : ""
              }`}
              onClick={() => setToggleNation(!toggleNation)}
            >
              <h3>{country}</h3>
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
      </div>
    </>
  );
};

export default HomeApp;
