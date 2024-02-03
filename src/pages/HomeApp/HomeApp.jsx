import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import FilterContainer from "../../container/FilterContainer.jsx/FilterContainer";
import NationalitiesFilterContainer from "../../container/NationalitiesFilterContainer/NationalitiesFilterContainer";
import "./HomeApp.css";

const HomeApp = () => {
  const [profiles, setProfiles] = useState([]);
  const [toggleNation, setToggleNation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nationalities, setNationalities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(true);
  const [filters, setFilters] = useState({
    nationality: [],
    gender: [],
    languages: [],
  });

  useEffect(() => {
    getAllNationalities();
  }, []);

  useEffect(() => {
    getPaginationProfiles();
  }, [currentPage, filters]);

  const getAllNationalities = async () => {
    try {
      const response = await axios.get("http://localhost:3001/profiles/all");
      const users = response.data;
      setNationalities(getDataFromUsers(users, "nationality"));
      setGenders(getDataFromUsers(users, "gender"));
      setLanguages(getDataFromUsers(users, "languages"));
    } catch (error) {
      console.error(error);
    }
  };

  const getDataFromUsers = (users, parameter) => {
    return users.reduce((acc, user) => {
      if (acc.includes(user[parameter])) {
        return acc;
      }
      acc.push(user[parameter]);
      return acc;
    }, []);
  };

  const getPaginationProfiles = async () => {
    try {
      console.log(filters);
      const response = await axios.get(`http://localhost:3001/profiles`, {
        params: {
          page: currentPage,
          filters,
        },
      });
      const data = response.data;
      setProfiles(data);
      if (data.length < 9) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFilterSelected = (nameFilter, filterData) => {
    if (filters[nameFilter] && filters[nameFilter].includes(filterData)) {
      const filterElements = filters[nameFilter].filter(
        (filter) => filter !== filterData
      );
      setFilters({ ...filters, [nameFilter]: [...filterElements] });
    } else {
      setFilters({
        ...filters,
        [nameFilter]: [...filters[nameFilter], filterData],
      });
    }
  };

  const getNationalityFilter = (country) => {
    isFilterSelected("nationality", country);
  };

  const getGenderFilter = (genderFilter) => {
    isFilterSelected("gender", genderFilter);
  };
  const getLanguageFilter = (languageFilter) => {
    isFilterSelected("languages", languageFilter);
  };

  return (
    <>
      <div className="flex_display_filter">
        <FilterContainer
          gendersData={genders}
          languagesData={languages}
          getGenderFilter={getGenderFilter}
          getLanguageFilter={getLanguageFilter}
        />
        <div className="page_order">
          <NationalitiesFilterContainer
            nationalities={nationalities}
            toggleNation={toggleNation}
            addCountryFilter={getNationalityFilter}
          />
          {/* <button onClick={() => setToggleFilter(!toggleFilter)}> */}
          <button onClick={() => console.log(filters)}>Show filters</button>
          <div className="card_grid">
            {profiles.map((profile, id) => (
              <div key={id} className="card_profile">
                <h3>
                  {profile.name} {profile.last_name}
                </h3>
                <div className="card_image"></div>
                <div className="card_details">
                  <div>Bio:</div>
                  <div>{profile.bio}</div>
                  <div>Lenguajes:</div>
                  <ProfileLanguages languages={profile.languages} />
                  <div>Intereses:</div>
                  <ProfileInterests interests={profile.interest} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={lastPage === true}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeApp;
