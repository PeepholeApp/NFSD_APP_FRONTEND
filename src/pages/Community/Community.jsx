import axios from "axios";
import React, { useEffect, useState } from "react";
import Activities from "../../components/Activities/Activities";
import { ButtonDark, ButtonLight } from "../../components/Button";
import Map from "../../components/Map/Map";
import AddActivity from "../../container/AddActivity/AddActivity";
import FilterActivity from "../../container/FilterActivity/FilterActivity";
import { useAuth } from "../../context/Login";
import categories from "../../data/categories.json";
import "./Community.css";

function Community() {
  const [activities, setActivities] = useState([]);
  const [activitiesFilters, setActivitiesFilters] = useState({});
  const [category, setCategory] = useState({});
  const { user, loading } = useAuth();
  const [address, setAddress] = useState(null);
  const [mapView, setMapView] = useState(false);

  useEffect(() => {
    getAllActivities();
  }, [activitiesFilters, mapView]);

  const getAllActivities = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/activities/`
      );
      setActivities(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getIconImg = (type, data) => {
    let foundIcon = {};
    if (type === "categories") {
      foundIcon = categories.find((category) => category.name === data);
    }
    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  const bookUserInActivity = async (activity) => {
    const updatedParticipants = [...activity.participants, user.profileId];
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/activities/${activity._id}`,
        {
          participants: updatedParticipants,
        }
      );
      getAllActivities();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const cancelBookUserInActivity = async (activity) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/activities/${
          activity._id
        }/participants/${user.profileId}`
      );
      getAllActivities();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const userIsInActivity = (activity) => {
    return activity.participants
      .map((participant) => participant._id)
      .includes(user.profileId);
  };

  const getCategorySelection = (categorySelection) => {
    setActivitiesFilters(categorySelection);
  };

  return (
    <>
      <div className="flexCommunity">
        <AddActivity
          address={address}
          getAllActivities={getAllActivities}
          onAddressChange={(address) => setAddress(address)}
        />
        <ButtonDark onClick={() => setMapView(false)}>List</ButtonDark>
        <ButtonLight onClick={() => setMapView(true)}>Map</ButtonLight>
        <div className={`mapContainer ${mapView ? "showMap" : "notShowMap"}`}>
          <Map address={address} mapView={mapView} activities={activities} />
        </div>
        <FilterActivity getCategorySelection={getCategorySelection} />
        <div className="activitiesContainer">
          <Activities
            activities={activities}
            bookUserInActivity={bookUserInActivity}
            cancelBookUserInActivity={cancelBookUserInActivity}
            userIsInActivity={userIsInActivity}
            getIconImg={getIconImg}
          />
        </div>
      </div>
    </>
  );
}

export default Community;
