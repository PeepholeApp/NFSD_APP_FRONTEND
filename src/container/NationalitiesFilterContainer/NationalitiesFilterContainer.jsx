import React from "react";
import "./NationalitiesFilterContainer.css";

const NationalitiesFilterContainer = ({
  nationalities,
  toggleNation,
  addCountryFilter,
}) => {
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
            <div>{nationality}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NationalitiesFilterContainer;
