import React, { useState } from "react";
import { ButtonDark } from "../../components/Button";
import gendersDataIcons from "../../data/genders.json";
import languagesDataIcons from "../../data/languages.json";
import "./FilterContainer.css";

const FilterContainer = ({
  gendersData,
  languagesData,
  getGenderFilter,
  getLanguageFilter,
  getAgeFilter,
}) => {
  const [ageMin, setAgeMin] = useState(16);
  const [ageMax, setAgeMax] = useState(80);
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    language: [],
  });

  const handleApplyFilter = () => {
    getAgeFilter({
      min: ageMin,
      max: ageMax,
    });
  };

  const handleFilter = (filterType, filterValue) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType].includes(filterValue)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (value) => value !== filterValue
        );
      } else {
        newFilters[filterType].push(filterValue);
      }
      return newFilters;
    });

    if (filterType === "gender") {
      getGenderFilter(filterValue);
    } else if (filterType === "language") {
      getLanguageFilter(filterValue);
    }
  };

  const getIconImg = (type, data) => {
    let foundIcon = {};

    if (type === "gender") {
      foundIcon = gendersDataIcons.genders.find(
        (gender) => gender.name === data
      );
    }
    if (type === "language") {
      foundIcon = languagesDataIcons.languages.find(
        (language) => language.shortName === data
      );
    }

    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  return (
    <>
      <div className={`filters`}>
        <div className="title">FILTERS</div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Genders</div>
          {gendersData.map((gender, id) => (
            <div
              key={id}
              className={`style_icons ${
                selectedFilters.gender.includes(gender) ? "selected" : ""
              }`}
              onClick={() => handleFilter("gender", gender)}
            >
              <span role="img">{getIconImg("gender", gender)}</span>
              {gender}
            </div>
          ))}
        </div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Languages</div>
          <div className="flex_filters_icons">
            {languagesData &&
              languagesData.map((language, id) => (
                <div
                  key={id}
                  className={`style_icons ${
                    selectedFilters.language.includes(language)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleFilter("language", language)}
                >
                  <span role="img">{getIconImg("language", language)}</span>
                  {language}
                </div>
              ))}
          </div>
        </div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Age Range</div>
          <div>
            {ageMin} - {ageMax} years
          </div>
          <div>min:</div>
          <input
            type="range"
            min="16"
            max={parseInt(ageMax, 10) - 1}
            name="min"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
          <div>max:</div>
          <input
            type="range"
            min={parseInt(ageMin, 10) + 1}
            max="80"
            name="max"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
          <ButtonDark onClick={handleApplyFilter}>Apply filter</ButtonDark>
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
