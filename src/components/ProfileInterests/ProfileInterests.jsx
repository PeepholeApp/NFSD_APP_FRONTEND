import React from "react";
import iconData from "../../data/interests.json";
import "./ProfileInterests.css";

const ProfileInterests = ({ interests }) => {
  const getIcon = (interestName) => {
    for (const category in iconData) {
      const interestsInCategory = iconData[category];
      const foundInterest = interestsInCategory.find(
        (interest) => interest.name === interestName
      );
      if (foundInterest) {
        return foundInterest.icon;
      }
    }
    return null;
  };

  return (
    <>
      <div>
        <div className="flex_interests">
          {interests.map((interest, index) => (
            <div key={index} className="style_interests">
              <span role="img">{getIcon(interest[0])}</span>
              {interest}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileInterests;
