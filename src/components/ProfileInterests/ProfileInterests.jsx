import React from "react";
import iconData from "../../data/interestIcons.json";
import "./ProfileInterests.css";

const ProfileInterests = ({ interests }) => {
  const icons = iconData.interests;

  const getIcon = (interestName) => {
    const foundInterest = icons.find(
      (interest) => interest.name === interestName
    );
    return foundInterest ? foundInterest.icon : null; // Retorna null si no se encuentra el icono
  };

  return (
    <>
      <div>
        <div className="flex_interests">
          {interests.map((interest, index) => (
            <div key={index} className="style_interests">
              <span role="img" aria-label="interest-icon">
                {getIcon(interest[0])}
              </span>
              {interest}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileInterests;
