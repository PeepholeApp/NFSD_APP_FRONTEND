import React from "react";
import "./FilterContainer.css";

const FilterContainer = ({
  gendersData,
  languagesData,
  getGenderFilter,
  getLanguageFilter,
}) => {
  return (
    <div>
      {/* <div className={`filters ${toggleFilter ? "" : "hidden"}`}> */}
      <div className={`filters`}>
        <h3>Filters</h3>
        <div className="division"></div>
        <div>
          <h3>Gender</h3>
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
        <div>
          <h3>Language</h3>
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
      </div>
    </div>
  );
};

export default FilterContainer;
