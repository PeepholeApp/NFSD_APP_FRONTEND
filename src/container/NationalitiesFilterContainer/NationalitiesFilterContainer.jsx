import React from "react";
import countriesData from "../../data/countries.json";
import "./NationalitiesFilterContainer.css";

const NationalitiesFilterContainer = ({
  nationalities,
  toggleNation,
  addCountryFilter,
}) => {
  const getIconImg = (type, data) => {
    let foundIcon = {};

    if (type === "nationality") {
      foundIcon = countriesData.countries.find(
        (gender) => gender.acronym === data
      );
    }

    if (foundIcon) {
      console.log(foundIcon);
      return foundIcon.icon;
    }
    return null;
  };

  return (
    <>
      <div className="nationality_filter_container">
        {nationalities.map((nationality, id) => (
          <div
            key={id}
            className={`nationality_filter ${
              toggleNation ? "checkNation" : ""
            }`}
            onClick={() => addCountryFilter(nationality)}
          >
            <img
              className="iconCountry"
              src={getIconImg("nationality", nationality)}
              alt={nationality}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default NationalitiesFilterContainer;
