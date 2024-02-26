import {
  faAdd,
  faCalendar,
  faFileText,
  faSortNumericAsc,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import categorties from "../../data/categories.json";
import "./AddActivity.css";

const AddActivity = ({ getAllActivities }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [capacity, setCapacity] = useState(0);

  const addActivityFromAdmin = async () => {
    try {
      await axios.post(`${process.env.DATABASE_URL}/activities/`, {
        title,
        category,
        description,
        date,
        capacity,
      });
      getAllActivities();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="addActivity_Container">
        <h1 className="titleFlex">Add Activity</h1>
        <h3 className="subTitleFlex">
          Complete information and create a new activity to share with everyone
        </h3>
        <div className="divisorActivityForm"></div>
        <div className="contentFlex">
          <FontAwesomeIcon icon={faFileText} />
          <input
            className="inputStyle"
            id="activityTitle"
            type="text"
            name="activityTitle"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="contentFlex">
          <FontAwesomeIcon icon={faFileText} />
          <input
            className="inputStyle"
            id="activityDescription"
            type="text"
            name="activityDescription"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="contentFlexGroup">
          <div className="contentFlex contentInGroup">
            <FontAwesomeIcon icon={faVideo} />
            <select
              className="inputStyle"
              name="categorySelect"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="null">Category:</option>
              <option value="null" disabled>
                ----------------
              </option>
              {categorties.map((category, id) => (
                <option key={id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="contentFlex contentInGroup">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              className="inputStyle"
              id="activityDate"
              type="date"
              name="activityDate"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="contentFlex contentInGroup">
            <FontAwesomeIcon icon={faSortNumericAsc} />
            <input
              className="inputStyle"
              id="activityParticipant"
              type="number"
              name="activityParticipant"
              placeholder="# Participants"
              max={50}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>
        <button className="buttonAddStyle" onClick={addActivityFromAdmin}>
          <h3>Add activity</h3>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
    </>
  );
};

export default AddActivity;
