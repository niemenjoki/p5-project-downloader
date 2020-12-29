import React from "react";
import content from "../../content.js";

import { availableLanguages } from "../../content.js";
const LanguageToggler = ({ language }) => {
  const languageList = availableLanguages.map(lang => {
    return (
      <span
        style={{
          margin: "0 5px",
          color: "#4a89dc",
          cursor: "pointer",
          textDecoration: lang === language ? "underline" : "none"
        }}
        key={lang}
        onClick={() => {
          localStorage.setItem("languagePreference", lang);
          window.location.reload();
        }}
      >
        {lang}
      </span>
    );
  });
  return (
    <div style={{ textAlign: "right" }}>
      {content.language[language]} {languageList}
    </div>
  );
};

export default LanguageToggler;
