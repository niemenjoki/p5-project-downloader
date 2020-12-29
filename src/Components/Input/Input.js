import React from "react";
import classes from "./Input.module.css";
import content from "../../content";

const Input = props => {
  const [username, toggleUsername] = React.useState("");

  const inputFieldClasses = [classes.InputField];
  if (username.length > 0) {
    inputFieldClasses.push(classes.Used);
  }
  return (
    <div className={classes.Input}>
      <input
        className={inputFieldClasses.join(" ")}
        type="text"
        onChange={e => {
          props.onChange(e.target.value);
          toggleUsername(e.target.value);
        }}
        value={props.value}
      />
      <span className={classes.Highlight}></span>
      <span className={classes.Underline}></span>
      <label className={classes.InputLabel}>
        {content.username[props.language]}
      </label>
      {<span className={classes.Error}>{props.error}</span>}
    </div>
  );
};

export default Input;
