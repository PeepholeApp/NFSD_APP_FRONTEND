import { faAdd } from "@fortawesome/free-solid-svg-icons";
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
      await axios.post("http://localhost:3001/activities/", {
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
        <h2 className="titleFlex">Add Activity</h2>
        <div className="contentFlex">
          <div>
            <div>
              <label htmlFor="activityTitle">Title: </label>
              <input
                className="inputStyle"
                id="activityTitle"
                type="text"
                name="activityTitle"
                placeholder="Write name of activity"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="formFlex">
              <p>Category: </p>
              <select
                className="inputStyle"
                name="categorySelect"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="null"> - </option>
                {categorties.map((category, id) => (
                  <option key={id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="activityDescription">Description: </label>
              <input
                className="inputStyle"
                id="activityDescription"
                type="text"
                name="activityDescription"
                placeholder="Write name of activity"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="activityDate">Date: </label>
              <input
                className="inputStyle"
                id="activityDate"
                type="date"
                name="activityDate"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="activityParticipant">
                Number of participants:{" "}
              </label>
              <input
                className="inputStyle"
                id="activityParticipant"
                type="number"
                name="activityParticipant"
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </div>
          <button className="buttonAddStyle" onClick={addActivityFromAdmin}>
            <h3>Add activity</h3>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
