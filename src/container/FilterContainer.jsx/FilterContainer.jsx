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
          <div>Gender</div>
          {gendersData.map((gender, id) => (
            <div
              key={id}
              onClick={() => {
                getGenderFilter(gender);
              }}
            >
              {gender}
            </div>
          ))}
        </div>
        <div className="division"></div>
        <div>
          <div>Language</div>
          {languagesData.map((language, id) => (
            <div
              key={id}
              onClick={() => {
                getLanguageFilter(language);
              }}
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
