import { faBook, faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Activities.css";

const Activities = ({
  activities,
  bookUserInActivity,
  cancelBookUserInActivity,
  userIsInActivity,
  getIconImg,
}) => {
  return (
    <>
      {activities.map((activity, id) => (
        <div key={id} className="flexActivity">
          <div className="activityCategory">
            <img
              className="styleCategory"
              src={getIconImg("categories", activity.category)}
            />
            <div className="descriptionText">{activity.category}</div>
          </div>
          <div className="divisionActivity"></div>
          <div className="activityContainer">
            <div className="titleText">{activity.title}</div>
            <div className="descriptionText">{activity.description}</div>
            <div className="descriptionText">Date: {activity.date}</div>
            <div className="descriptionText">Location: {activity.address}</div>
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
    </>
  );
};

export default Activities;
