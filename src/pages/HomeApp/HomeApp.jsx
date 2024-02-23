import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterContainer from "../../container/FilterContainer.jsx/FilterContainer";
import NationalitiesFilterContainer from "../../container/NationalitiesFilterContainer/NationalitiesFilterContainer";
import UsersContainer from "../../container/UsersContainer/UsersContainer";
import { useFilters } from "../../context/FiltersContext";
import "./HomeApp.css";

const HomeApp = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nationalities, setNationalities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filters, updateFilters } = useFilters({});

  useEffect(() => {
    getAllNationalities();
  }, []);

  useEffect(() => {
    getFilterProfiles();
  }, [filters]);

  useEffect(() => {
    getPaginationProfiles();
  }, []);

  const getAllNationalities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/profiles/all");
      const users = response.data;
      setNationalities(getDataFromUsers(users, "nationality"));
      setGenders(getDataFromUsers(users, "gender"));
      setLanguages(getDataFromUsers(users, "languages"));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataFromUsers = (users, parameter) => {
    return users.reduce((acc, user) => {
      if (user[parameter]) {
        if (Array.isArray(user[parameter])) {
          user[parameter].forEach((value) => {
            if (!acc.includes(value)) {
              acc.push(value);
            }
          });
        } else {
          if (!acc.includes(user[parameter])) {
            acc.push(user[parameter]);
          }
        }
      }
      return acc;
    }, []);
  };

  const getFilterProfiles = async () => {
    console.log("get filters");
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/profiles`, {
        params: {
          page: 1,
          filters,
        },
      });
      const data = response.data;
      setProfiles(data);
      setCurrentPage(2);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPaginationProfiles = async () => {
    console.log("get with pagination", currentPage);
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/profiles`, {
        params: {
          page: currentPage,
          filters,
        },
      });
      const data = response.data;
      setProfiles([...profiles, ...data]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFilterSelected = (nameFilter, filterData) => {
    if (nameFilter === "age") {
      updateFilters({
        ...filters,
        age: filterData,
      });
    } else {
      if (filters[nameFilter] && filters[nameFilter].includes(filterData)) {
        const filterElements = filters[nameFilter].filter(
          (filter) => filter !== filterData
        );
        updateFilters({
          ...filters,
          [nameFilter]: [...filterElements],
        });
      } else {
        updateFilters({
          ...filters,
          [nameFilter]: [...filters[nameFilter], filterData],
        });
      }
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
  const getAgeFilter = (ageFilter) => {
    isFilterSelected("age", ageFilter);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={profiles.length}
        next={getPaginationProfiles}
        hasMore={true}
      >
        <div className="flex_display_filter">
          <div className="flex_Filter">
            <FilterContainer
              gendersData={genders}
              languagesData={languages}
              getGenderFilter={getGenderFilter}
              getLanguageFilter={getLanguageFilter}
              getAgeFilter={getAgeFilter}
            />
          </div>
          <div className="flex_page">
            <NationalitiesFilterContainer
              nationalities={nationalities}
              addCountryFilter={getNationalityFilter}
            />
            <UsersContainer profiles={profiles} />
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default HomeApp;
