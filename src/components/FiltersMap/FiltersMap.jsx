import React from "react";

const FiltersMap = ({ type, filterData, clickFilter }) => {
  return (
    <>
      {filterData.map((data, id) => (
        <div key={id} onClick={() => clickFilter(type, data)}>
          {data}
        </div>
      ))}
    </>
  );
};

export default FiltersMap;
