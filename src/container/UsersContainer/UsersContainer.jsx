import moment from "moment/moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import gendersDataIcons from "../../data/genders.json";
import "./UsersContainer.css";

const UsersContainer = ({ profiles }) => {
  const navigate = useNavigate();
  const ageCalculator = (age) => {
    const fechaNacimientoMoment = moment(age);
    const edad = moment().diff(fechaNacimientoMoment, "years");
    return edad;
  };

  const getIconImg = (type, data) => {
    let foundIcon = {};

    if (type === "gender") {
      foundIcon = gendersDataIcons.genders.find(
        (gender) => gender.name === data
      );
    }
    if (type === "language") {
      foundIcon = languagesDataIcons.languages.find(
        (language) => language.shortName === data
      );
    }

    if (foundIcon) {
      return foundIcon.icon;
    }
    return null;
  };

  return (
    <>
      <div className="card_grid">
        {profiles.map((profile, id) => (
          <div
            key={id}
            className="card_profile"
            onClick={() => navigate(`/user/${profile._id}`)}
          >
            <h3>
              {profile.name} {profile.last_name}
            </h3>
            <div className="card_image">
              <img className="imageProfile" src={profile.photo[0]} />
            </div>
            <div className="flexUserInfo">
              <div className="flexData">
                <div className="titleUserData">Age</div>
                <div className="subtitleUserData">
                  {ageCalculator(profile.dob)}
                </div>
              </div>
              <div className="divisionData"></div>
              <div className="flexData">
                <div className="titleUserData">Nationality</div>
                <div className="subtitleUserData">{profile.nationality}</div>
              </div>
              <div className="divisionData"></div>
              <div className="flexData">
                <div className="titleUserData">Gender</div>
                <span role="img">{getIconImg("gender", profile.gender)}</span>
              </div>
            </div>
            <div className="card_details">
              <div>Bio:</div>
              <div>{profile.bio}</div>
              <div>Lenguajes:</div>
              <ProfileLanguages languages={profile.languages} />
              <div>Intereses:</div>
              <ProfileInterests interests={profile.interest} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersContainer;
