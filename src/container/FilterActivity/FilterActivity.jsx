import axios from "axios";
import React, { useEffect, useState } from "react";
import categoriesData from "../../data/categories.json";
import "./FilterActivity.css";

const FilterActivity = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities/");
      const activities = response.data;
      const categoriesNotRepeat = activities.reduce((acc, activity) => {
        if (acc.includes(activity.category)) {
          return acc;
        }
        acc.push(activity.category);
        return acc;
      }, []);
      setCategories(categoriesNotRepeat);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryIcon = (data) => {
    let foundIcon = {};
    foundIcon = categoriesData.find((category) => category.name === data);
    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  return (
    <>
      <div className="backgroundFilters">
        <h2>Filters</h2>
        <div>
          {categories.map((category, id) => (
            <div key={id}>
              {category}
              <img src={getCategoryIcon(category)} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterActivity;
