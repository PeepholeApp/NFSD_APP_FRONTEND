import { faBook, faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getAllActivities();
  }, [activitiesFilters]);

  const getAllActivities = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/activities/`, {
        params: {
          category: activitiesFilters,
        },
      });
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
      await axios.put(`http://localhost:3001/activities/${activity._id}`, {
        participants: updatedParticipants,
      });
      getAllActivities();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const cancelBookUserInActivity = async (activity) => {
    try {
      await axios.delete(
        `http://localhost:3001/activities/${activity._id}/participants/${user.profileId}`
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
        <AddActivity getAllActivities={getAllActivities} />
        <FilterActivity getCategorySelection={getCategorySelection} />
        <div className="activitiesContainer">
          {activities.map((activity, id) => (
            <div key={id} className="flexActivity">
              <div className="activityCategory">
                <img
                  className="styleCategory"
                  src={getIconImg("categories", activity.category)}
                  alt={activity.category}
                />
                <div className="descriptionText">{activity.category}</div>
              </div>
              <div className="divisionActivity"></div>
              <div className="activityContainer">
                <div className="titleText">{activity.title}</div>
                <div className="descriptionText">{activity.description}</div>
                <div className="descriptionText">Date: {activity.date}</div>
                <div className="progressContainer">
                  <div
                    className="progressBar"
                    style={{
                      width: `${
                        (activity.participants.length / activity.capacity) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div>
                  {activity.participants.length}/{activity.capacity}
                </div>
                <div className="flexParticipants">
                  <div>Participants:</div>
                  <div>
                    {activity.participants.map((participant, index) => (
                      <span className="participantStyle" key={index}>
                        {participant.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flexButtons">
                <button
                  className={`buttonBookStyle ${
                    userIsInActivity(activity) ||
                    activity.participants.length === activity.capacity
                      ? "disabledBookButton"
                      : "bookButton"
                  }`}
                  disabled={
                    userIsInActivity(activity) ||
                    activity.participants.length === activity.capacity
                  }
                  onClick={() => bookUserInActivity(activity)}
                >
                  <FontAwesomeIcon icon={faBook} />
                </button>
                <button
                  className={`buttonBookStyle ${
                    !userIsInActivity(activity)
                      ? "disabledBookButton"
                      : "cancelBookButton"
                  }`}
                  disabled={!userIsInActivity(activity)}
                  onClick={() => cancelBookUserInActivity(activity)}
                >
                  <FontAwesomeIcon icon={faCancel} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Community;
