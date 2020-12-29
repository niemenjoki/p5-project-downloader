import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import zipper from "./zipper";
import LanguageToggler from "./Components/LanguageToggler/LanguageToggler";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import "./index.css";
import content from "./content.js";

const App = () => {
  const [username, updateUsername] = React.useState("");
  const [projects, updateProjects] = React.useState([]);
  const [buttonStatus, setButtonStatus] = React.useState("DISABLED");
  const [error, setError] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  React.useEffect(() => {
    const languagePreference = localStorage.getItem("languagePreference");
    if (languagePreference) setLanguage(languagePreference);
  });
  const updateUsernameHandler = value => {
    if (!value.length > 0) {
      setButtonStatus("DISABLED");
    } else {
      setButtonStatus("ENABLED");
    }
    updateUsername(value);
  };
  const getProjectData = async () => {
    if (username.length > 0) {
      setButtonStatus("LOADING");
      const URL = `/u/${username}`;
      try {
        const response = await axios.get(URL);
        updateProjects(response.data);
        setButtonStatus("DOWNLOAD");
      } catch (e) {
        setError(content.errorMessage[language]);
        setButtonStatus("ERROR");
        setInterval(() => {
          setError(false);
          setButtonStatus("DISABLED");
        }, 6000);
      }
    }
  };

  const downloadFiles = async () => {
    if (projects.length > 0) {
      zipper(projects);
    }
  };

  return (
    <>
      <LanguageToggler language={language} />
      <hgroup>
        <h1>P5.js Project Downloader</h1>
        <p>{content.info[language]}</p>
      </hgroup>
      <form>
        <Input
          onChange={updateUsernameHandler}
          value={username}
          error={error}
          language={language}
        />
        <Button
          status={buttonStatus}
          getProjectData={getProjectData}
          downloadFiles={downloadFiles}
          language={language}
        />
      </form>
      <footer>
        <p>
          {content.problemBefore[language]}{" "}
          <a
            href="https://github.com/jnsjknn/p5-project-downloader/issues/new"
            target="_blank"
            rel="noreferrer"
          >
            {content.problemLink[language]}
          </a>
          {content.problemAfter[language]}
        </p>
        <p>
          {content.contributeBefore[language]}{" "}
          <a
            href="https://github.com/jnsjknn/p5-project-downloader"
            target="_blank"
            rel="noreferrer"
          >
            {content.contributeLink[language]}
          </a>
          {content.contributeAfter[language]}
        </p>
        <p>
          {content.createdBy[language]}{" "}
          <a href="https://github.com/jnsjknn" target="_blank" rel="noreferrer">
            jnsjknn
          </a>
        </p>
      </footer>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
