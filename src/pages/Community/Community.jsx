import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Community.css";

function Community() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getAllActivities();
  }, []);

  const getAllActivities = async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities/");
      setActivities(response.data);
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
                <div
                  className={`isAvailable ${
                    activity.available ? "" : "isNotAvailable"
                  }`}
                >
                  {activity.available ? "Is available" : "Is not available"}
                </div>
              </div>
              <div className="flexButtons">
                <button>Book</button>
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
