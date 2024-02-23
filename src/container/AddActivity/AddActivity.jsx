import React, { useState } from "react";
import categorties from "../../data/categories.json";
import "./AddActivity.css";

const AddActivity = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [numOfParticipants, setNumOfParticipants] = useState(0);

  const addActivityFromAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities/");
      setActivities(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="addActivity_Container">
        <h2>Add Activity</h2>
        <div>
          <label htmlFor="activityTitle">Title: </label>
          <input
            id="activityTitle"
            type="text"
            name="activityTitle"
            placeholder="Write name of activity"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Category: </p>
          <select
            name="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>
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
            id="activityDate"
            type="date"
            name="activityDate"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="activityParticipant">Number of participants: </label>
          <input
            id="activityParticipant"
            type="number"
            name="activityParticipant"
            onChange={(e) => setNumOfParticipants(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            console.log(title, category, description, date, numOfParticipants)
          }
        >
          Add Activity
        </button>
      </div>
    </>
  );
};

export default AddActivity;
