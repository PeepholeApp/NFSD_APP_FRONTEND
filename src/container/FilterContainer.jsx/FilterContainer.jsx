import React, { useState } from "react";
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
  const [ageRange, setAgeRange] = useState({ min: 16, max: 80 });
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setAgeRange({ ...ageRange, [name]: parseInt(value, 10) });
  };

  const handleApplyFilter = () => {
    getAgeFilter({
      min: ageMin,
      max: ageMax,
    });
  };

  const handleGenderFilter = (gender) => {
    getGenderFilter(gender);
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handleLanguageFilter = (language) => {
    getLanguageFilter(language);
    setSelectedLanguage(language === selectedLanguage ? null : language);
  };

  return (
    <>
      <div className={`filters`}>
        <div className="title">FILTERS</div>
        <div className="division"></div>
        <div className="flexColumnFilter">
          <div className="title">Gender</div>
          {gendersData.map((gender, id) => (
            <div
              key={id}
              onClick={() => handleGenderFilter(gender)}
              className={`filterAction ${
                selectedGender === gender ? "selected" : ""
              }`}
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
              onClick={() => handleLanguageFilter(language)}
              className={`filterAction ${
                selectedLanguage === language ? "selected" : ""
              }`}
            >
              {language}
            </div>
          ))}
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
          <button onClick={handleApplyFilter}>Set age</button>
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
