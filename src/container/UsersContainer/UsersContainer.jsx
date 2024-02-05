import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInterests from "../../components/ProfileInterests/ProfileInterests";
import ProfileLanguages from "../../components/ProfileLanguages/ProfileLanguages";
import "./UsersContainer.css";

const UsersContainer = ({ profiles }) => {
  const navigate = useNavigate();
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
            <div className="card_image"></div>
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
