import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import "./UserDetails.css";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/profiles/user/${userId}`
      );
      const users = response.data;
      setUser(users);
    } catch (error) {
      console.error(error);
    }
  };

  const ageCalculator = (age) => {
    const fechaNacimientoMoment = moment(age);
    const edad = moment().diff(fechaNacimientoMoment, "years");
    return edad;
  };

  return (
    <>
      <div className="flexContainer">
        <div className="backgroundContainer userContainer">
          <div className="title">
            {user.name} {user.last_name}
          </div>
          <div className="imagesProfile">image</div>
          <div className="flexDataUser">
            <div className="flexEachData">
              <div className="subtitleDataBold">Age</div>
              <div className="subtitleDataLight">{ageCalculator(user.dob)}</div>
            </div>
            <div className="divisionData"></div>
            <div className="flexEachData">
              <div className="subtitleDataBold">Nationality</div>
              <div className="subtitleDataLight">{user.nationality}</div>
            </div>
            <div className="divisionData"></div>
            <div className="flexEachData">
              <div className="subtitleDataBold">Gender</div>
              <div className="subtitleDataLight">{user.gender}</div>
            </div>
          </div>
          <div className="subtitle">{user.bio}</div>
          <div className="subtitleDataBold">Languages</div>
          <ProfileLanguages languages={user.languages} />
          <div className="subtitleDataBold">Interest</div>
          <ProfileInterests interests={user.interest} />
        </div>
        <div
          className="backButton"
          onClick={() => navigate("/home")}
        >{`</ Back`}</div>
      </div>
    </>
  );
};

export default UserDetails;
