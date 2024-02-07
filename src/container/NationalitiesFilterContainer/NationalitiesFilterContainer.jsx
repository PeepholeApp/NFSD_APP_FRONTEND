import React, { useState } from "react";
import countriesData from "../../data/countries.json";
import "./NationalitiesFilterContainer.css";

const NationalitiesFilterContainer = ({
  nationalities,
  toggleNation,
  addCountryFilter,
}) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const getIconImg = (type, data) => {
    let foundIcon = {};

    if (type === "nationality") {
      foundIcon = countriesData.countries.find(
        (country) => country.acronym === data
      );
    }

    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  const handleFilterClick = (nationality) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [nationality]: !prevFilters[nationality],
    }));

    addCountryFilter(nationality);
  };

  return (
    <>
      <div className="nationality_filter_container">
        {nationalities.map((nationality, id) => (
          <div
            key={id}
            className={`nationality_filter ${
              selectedFilters[nationality] ? "checkNation" : ""
            }`}
            onClick={() => handleFilterClick(nationality)}
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
