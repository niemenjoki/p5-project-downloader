import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const [value, toggleValue] = React.useState(props.value);

  const inputFieldClasses = [classes.InputField];
  if (value.length > 0) {
    inputFieldClasses.push(classes.Used);
  }
  return (
    <div className={classes.Input}>
      <input
        className={inputFieldClasses.join(" ")}
        type='text'
        onChange={(e) => {
          props.onChange(e.target.value);
          toggleValue(e.target.value);
        }}
        value={value}
      />
      <span className={classes.Highlight}></span>
      <span className={classes.Underline}></span>
      <label className={classes.InputLabel}>{props.label}</label>
      {<span className={classes.Error}>{props.error}</span>}
    </div>
  );
};

export default Input;
