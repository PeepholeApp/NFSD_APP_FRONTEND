import React, { useState } from "react";
import "./FilterContainer.css";

const FilterContainer = ({
  gendersData,
  languagesData,
  getGenderFilter,
  getLanguageFilter,
  getAgeFilter,
}) => {
  const [ageRange, setAgeRange] = useState({ min: 16, max: 80 });

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setAgeRange({ ...ageRange, [name]: parseInt(value, 10) });
  };

  const handleApplyFilter = () => {
    getAgeFilter(ageRange);
  };

  return (
    <>
      {/* <div className={`filters ${toggleFilter ? "" : "hidden"}`}> */}
      <div className={`filters`}>
        <div className="title">FILTERS</div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Gender</div>
          {gendersData.map((gender, id) => (
            <div
              key={id}
              onClick={() => {
                getGenderFilter(gender);
              }}
              className="filterAction"
            >
              {gender}
            </div>
          ))}
        </div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Language</div>
          {languagesData.map((language, id) => (
            <div
              key={id}
              onClick={() => {
                getLanguageFilter(language);
              }}
              className="filterAction"
            >
              {language}
            </div>
          ))}
        </div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Age Range</div>
          <div>
            {ageRange.min} - {ageRange.max} years
          </div>
          <div>min:</div>
          <input
            type="range"
            min="16"
            max={ageRange.max - 1}
            name="min"
            value={ageRange.min}
            onChange={handleSliderChange}
          />
          <div>max:</div>
          <input
            type="range"
            min={ageRange.min + 1}
            max="80"
            name="max"
            value={ageRange.max}
            onChange={handleSliderChange}
          />
          <button onClick={handleApplyFilter}>Set age</button>
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
