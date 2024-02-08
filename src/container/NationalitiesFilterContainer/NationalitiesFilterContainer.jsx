import React from "react";
import { useFilters } from "../../context/FiltersContext";
import countriesData from "../../data/countries.json";
import "./NationalitiesFilterContainer.css";

const NationalitiesFilterContainer = ({ nationalities, addCountryFilter }) => {
  const { selectCountryFilter, updateCountryFilter } = useFilters();

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
    updateCountryFilter((prevFilters) => ({
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
              selectCountryFilter[nationality] ? "checkNation" : ""
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
