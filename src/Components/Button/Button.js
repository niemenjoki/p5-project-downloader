import React from "react";
import Loader from "../Loader/Loader";
import classes from "./Button.module.css";
import content from "../../content";

const Button = props => {
  switch (props.status) {
    case "DISABLED":
      return (
        <button
          type="button"
          className={[classes.Button, classes.Disabled].join(" ")}
        >
          {content.projectData[props.language]}
        </button>
      );
    case "ENABLED":
      return (
        <button
          type="button"
          className={classes.Button}
          onClick={props.getProjectData}
        >
          {content.projectData[props.language]}
        </button>
      );
    case "LOADING":
      return (
        <button type="button" className={classes.Button}>
          <Loader />
        </button>
      );
    case "DOWNLOAD":
      return (
        <button
          type="button"
          className={classes.Button}
          onClick={props.downloadFiles}
        >
          {content.download[props.language]}
        </button>
      );
    default:
      return (
        <button
          type="button"
          className={[classes.Button, classes.Error].join(" ")}
        >
          {content.projectData[props.language]}
        </button>
      );
  }
};

export default Button;
