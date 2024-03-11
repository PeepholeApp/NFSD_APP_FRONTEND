import { faBook, faCancel, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Login";
import "./Activities.css";

const Activities = ({
  activities,
  bookUserInActivity,
  cancelBookUserInActivity,
  deleteActivity,
  userIsInActivity,
  getIconImg,
}) => {
  const [todayDate, setTodayDate] = useState("");
  const { user, loading } = useAuth();

  useEffect(() => {
    setTodayDate(moment().format("YYYY-MM-DD"));
  }, []);

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

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
            {activity.date <= todayDate ? (
              <h3 className="expiredText">Expired</h3>
            ) : (
              <></>
            )}

            <div className="titleText">{activity.title}</div>
            <div className="descriptionText">{activity.description}</div>
            <div className="descriptionText">
              Date: {formatDateString(activity.date)}
            </div>
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
              <div className="eachParticipant">
                {activity.participants.map((participant, index) => (
                  <span className="participantStyle" key={index}>
                    {participant.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flexButtonsResponsive">
              <button
                className={`buttonBookStyle ${
                  userIsInActivity(activity) ||
                  activity.participants.length === activity.capacity ||
                  activity.date <= todayDate
                    ? "disabledBookButton"
                    : "bookButton"
                }`}
                disabled={
                  userIsInActivity(activity) ||
                  activity.participants.length === activity.capacity ||
                  activity.date <= todayDate
                }
                onClick={() => bookUserInActivity(activity)}
              >
                <FontAwesomeIcon icon={faBook} />
              </button>
              <button
                className={`buttonBookStyle ${
                  !userIsInActivity(activity) || activity.date <= todayDate
                    ? "disabledBookButton"
                    : "cancelBookButton"
                }`}
                disabled={
                  !userIsInActivity(activity) || activity.date <= todayDate
                }
                onClick={() => cancelBookUserInActivity(activity)}
              >
                <FontAwesomeIcon icon={faCancel} />
              </button>
              {user.role === "admin" ? (
                <button
                  className={`buttonBookStyle deleteButton`}
                  onClick={() => deleteActivity(activity)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flexButtons">
            <button
              className={`buttonBookStyle ${
                userIsInActivity(activity) ||
                activity.participants.length === activity.capacity ||
                activity.date <= todayDate
                  ? "disabledBookButton"
                  : "bookButton"
              }`}
              disabled={
                userIsInActivity(activity) ||
                activity.participants.length === activity.capacity ||
                activity.date <= todayDate
              }
              onClick={() => bookUserInActivity(activity)}
            >
              <FontAwesomeIcon icon={faBook} />
            </button>
            <button
              className={`buttonBookStyle ${
                !userIsInActivity(activity) || activity.date <= todayDate
                  ? "disabledBookButton"
                  : "cancelBookButton"
              }`}
              disabled={
                !userIsInActivity(activity) || activity.date <= todayDate
              }
              onClick={() => cancelBookUserInActivity(activity)}
            >
              <FontAwesomeIcon icon={faCancel} />
            </button>
            {user.role === "admin" ? (
              <button
                className={`buttonBookStyle deleteButton`}
                onClick={() => deleteActivity(activity)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Activities;
