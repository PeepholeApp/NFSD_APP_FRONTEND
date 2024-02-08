import React, { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    nationality: [],
    gender: [],
    languages: [],
    age: [],
  });
  const [selectCountryFilter, setSelectCountryFilter] = useState({});
  const [selectOtherFilters, setSelectOthersFilters] = useState({
    gender: [],
    language: [],
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const updateCountryFilter = (nationality) => {
    setSelectCountryFilter(nationality);
  };

  const updateOtherFilter = (nationality) => {
    setSelectOthersFilters(nationality);
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
        selectCountryFilter,
        updateCountryFilter,
        selectOtherFilters,
        updateOtherFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FiltersContext);
};
