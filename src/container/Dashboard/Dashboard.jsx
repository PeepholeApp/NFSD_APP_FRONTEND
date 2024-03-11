import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import countriesData from "../../data/countries.json";
import gendersData from "../../data/genders.json";
import "./Dashboard.css";

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [dsbNationalities, setDsbNationalities] = useState([]);
  const [dsbGenders, setDsbGenders] = useState([]);
  const [dsbAges, setDsbAges] = useState([]);

  useEffect(() => {
    getAllProfiles();
  }, []);

  const getAllProfiles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/get`
      );
      const users = response.data;
      setDsbNationalities(accumulator("nationality", users));
      setDsbGenders(accumulator("gender", users));
      setDsbAges(accumulator("dob", users));
      setProfiles(users);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const accumulator = (type, data) => {
    if (type === "dob") {
      data.map((data, id) => {
        return (data.dob = ageCalculator(data.dob));
      });
    }
    const numberOf = data.reduce((acc, profile) => {
      if (acc.find((item) => item[type] === profile[type])) {
        acc.find((item) => item[type] === profile[type]).count += 1;
      } else {
        acc.push({ [type]: profile[type], count: 1 });
      }
      return acc;
    }, []);
    numberOf.sort((a, b) => b.count - a.count);
    return numberOf;
  };

  const ageCalculator = (age) => {
    const fechaNacimientoMoment = moment(age);
    const edad = moment().diff(fechaNacimientoMoment, "years");
    return edad;
  };

  const getIconImg = (type, data) => {
    let foundIcon = {};
    if (type === "nationality") {
      foundIcon = countriesData.countries.find(
        (country) => country.acronym === data
      );
    }
    if (type === "gender") {
      foundIcon = gendersData.genders.find((gender) => gender.name === data);
      console.log(foundIcon);
    }
    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  return (
    <>
      <div className="dashboardContainer">
        <h3>Nationalities:</h3>
        <div className="styleDashboardContainer flexDashboardContainer">
          {dsbNationalities.map((dsbNationality, id) => (
            <div className="infoDashboard" key={id}>
              <img
                className="iconCountry"
                src={getIconImg("nationality", dsbNationality.nationality)}
                alt={dsbNationality.nationality}
              />
              <h4 className="countText">
                {dsbNationality.nationality}: {dsbNationality.count}
              </h4>
            </div>
          ))}
        </div>
        <h3>Genders:</h3>
        <div className="styleDashboardContainer flexDashboardContainer">
          {dsbGenders.map((dsbGender, id) => (
            <div className="infoDashboard" key={id}>
              <h1 className="countText">
                {getIconImg("gender", dsbGender.gender)}
              </h1>
              <h4 className="countText">
                {dsbGender.gender}: {dsbGender.count}
              </h4>
            </div>
          ))}
        </div>
        <h3>Ages:</h3>
        <div className="styleDashboardContainer flexDashboardContainer">
          {dsbAges.map((dsbAge, id) => (
            <div className="infoDashboard" key={id}>
              Age of {dsbAge.dob}: {dsbAge.count}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
