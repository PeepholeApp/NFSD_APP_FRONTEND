import React from "react";
import languagesData from "../../data/languages.json";
import "./ProfileLanguages.css";

const ProfileLanguages = ({ languages }) => {
  const getIcon = (languageName) => {
    const foundlanguage = languagesData.languages.find(
      (language) => language.shortName === languageName
    );
    if (foundlanguage) {
      return foundlanguage.icon;
    }

    return null;
  };
  return (
    <>
      <div className="flex_languages">
        {languages.map((language, id) => (
          <div key={id} className="style_languages">
            <span role="img">{getIcon(language)}</span>
            {language}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileLanguages;
