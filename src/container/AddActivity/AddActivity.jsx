import {
  faAdd,
  faCalendar,
  faFileText,
  faFileWord,
  faLocation,
  faSortNumericAsc,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBox } from "@mapbox/search-js-react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import categorties from "../../data/categories.json";
import "./AddActivity.css";

const AddActivity = ({ getAllActivities, onAddressChange, address }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [search, setSearch] = useState("");
  const [minDate, setMinDate] = useState("");

  const [messageAddActivity, setMessageAddActivity] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  useEffect(() => {
    setMinDate(moment().format("YYYY-MM-DD"));
  }, []);

  const addActivityFromAdmin = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !date || !capacity || !search) {
      setMessageAddActivity("You must fill all the fields to add the activity");
      setTypeMessage("Error");
      setTimeout(() => {
        setMessageAddActivity("");
        setTypeMessage("");
      }, 3000);
      return;
    }

    if (capacity > 50) {
      setMessageAddActivity(
        "The capacity of the activity should be a maximum of 50 members"
      );
      setTypeMessage("Error");
      setTimeout(() => {
        setMessageAddActivity("");
        setTypeMessage("");
      }, 3000);
      return;
    }

    const properties = address.features[0].properties;

    try {
      await axios.post(`http://localhost:3001/activities/`, {
        title,
        category,
        description,
        date,
        capacity,
        address: properties.name + ", " + properties.place_formatted,
        latitude: properties.coordinates.latitude,
        longitude: properties.coordinates.longitude,
      });
      getAllActivities();
      setTitle("");
      setCategory("");
      setDescription("");
      setDate("");
      setCapacity("");
      setSearch("");
      setMessageAddActivity("Activity successfully added");
      setTypeMessage("Successfully");
      setTimeout(() => {
        setMessageAddActivity("");
        setTypeMessage("");
      }, 3000);
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
          <FontAwesomeIcon icon={faFileWord} />
          <input
            className="inputStyle"
            id="activityTitle"
            type="text"
            name="activityTitle"
            placeholder="Title"
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="contentFlex">
          <FontAwesomeIcon icon={faLocation} />
          <div className="inputStyle locationInput">
            <SearchBox
              id="activityLocation"
              name="activityLocation"
              value={search}
              onChange={(value) => setSearch(value)}
              onRetrieve={(address) => onAddressChange(address)}
              accessToken={import.meta.env.VITE_MAPBOX}
            />
          </div>
        </div>

        <div className="contentFlexGroup">
          <div className="contentFlex contentInGroup">
            <FontAwesomeIcon icon={faVideo} />
            <select
              className="inputStyle"
              name="categorySelect"
              value={category}
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
              min={minDate}
              name="activityDate"
              value={date}
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
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>
        <button className="buttonAddStyle" onClick={addActivityFromAdmin}>
          <h3>Add activity</h3>
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <h3 className={`alertText alert${typeMessage}`}>
          {messageAddActivity}
        </h3>
      </div>
    </>
  );
};

export default AddActivity;
