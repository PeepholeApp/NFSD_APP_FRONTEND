import React from "react";
import "./ProfileLanguages.css";

const ProfileLanguages = ({ languages }) => {
  return (
    <>
      <div className="flex_languages">
        {languages.map((language, index) => (
          <div key={index} className="style_languages">
            {language}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileLanguages;
