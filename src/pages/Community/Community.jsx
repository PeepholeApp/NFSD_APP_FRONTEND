import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Community.css";

function Community() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getAllActivities();
  }, [activities]);

  const getAllActivities = async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities/");
      setActivities(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateCapacity = async (activity) => {
    try {
      await axios.put(`http://localhost:3001/activities/increase/${activity}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="flexCommunity">
        <div className="activitiesContainer">
          {activities.map((activity, id) => (
            <div key={id} className="flexActivity">
              <div className="activityCategory">
                <div className="styleCategory">.</div>
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
                        (activity.capacity / activity.availability) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="">
                  {activity.capacity}/{activity.availability}
                </div>
                <div className="flexAvailable">
                  <div
                    className={`isAvailable ${
                      activity.available ? "" : "isNotAvailable"
                    }`}
                  >
                    {activity.available ? "Available" : "Not available"}
                  </div>
                </div>
              </div>
              <div className="flexButtons">
                <button onClick={() => updateCapacity(activity._id)}>
                  Book
                </button>
                <button>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Community;
