import React from "react";
import "./ProfileInterests.css";

const interests = ["uno", "dos", "tres", "cuatro"];

const ProfileInterests = ({ interests }) => {
  return (
    <>
      <div>
        <div className="flex_interests">
          {interests.map((interest, index) => (
            <div key={index} className="style_interests">
              {interest}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileInterests;
