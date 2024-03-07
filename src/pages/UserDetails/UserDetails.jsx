import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDark } from "../../components/Button";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import { useAuth } from "../../context/Login";
import countriesData from "../../data/countries.json";
import "./UserDetails.css";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [connectionSent, setConnectionSent] = useState(false);

  useEffect(() => {
    getProfileUser();
    // getConnectionRequest();
  }, []);

  const getProfileUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/user/${userId}`
      );
      const users = response.data;
      setUser(users);
      console.log("user:", users);
    } catch (error) {
      console.error(error);
    }
  };

  // conecta si el usuario ya esta
  const getConnectionRequest = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/connections/${userId}`,
        {
          headers: {
            //manda el token del usuario verificado
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const connection = response.data;
      setConnectionSent(connection || false);
    } catch (error) {
      console.error(error);
    }
  };

  const ageCalculator = (age) => {
    const fechaNacimientoMoment = moment(age);
    const edad = moment().diff(fechaNacimientoMoment, "years");
    return edad;
  };

  const sendConnection = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/connections/${userId}`,
      {},
      {
        headers: {
          //manda el token del usuario verificado
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    setConnectionSent(true);
  };

  const nationalityCountry = countriesData.countries.find(
    (country) => country.acronym === user.nationality
  );

  return (
    <>
      <div className="flexContainer">
        <div className="backgroundContainer userContainer">
          {currentUser?.profileId === userId ? (
            <ButtonDark onClick={() => navigate("/editProfile")}>
              Editar
            </ButtonDark>
          ) : null}
          <div className="title">
            {user.name} {user.last_name}
          </div>
          <ButtonDark onClick={sendConnection} disabled={connectionSent}>
            {connectionSent ? "Connection Request Sent" : "Connect"}
          </ButtonDark>
          <div className="imagesProfile">
            <img className="imageFit" src={user.photo} alt="" />
          </div>
          <div className="flexDataUser">
            <div className="flexEachData">
              <div className="subtitleDataBold">Age</div>
              <div className="subtitleDataLight">{ageCalculator(user.dob)}</div>
            </div>
            <div className="divisionData"></div>
            <div className="flexEachData">
              <div className="subtitleDataBold">Nationality</div>
              <div className="subtitleDataLight">
                {nationalityCountry ? (
                  <>
                    <img src={nationalityCountry.icon} />
                    {nationalityCountry.name}
                  </>
                ) : (
                  user.nationality
                )}{" "}
              </div>
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
