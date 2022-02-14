import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  // const qualifier = props.disabled ? "disabled" : "";
  const clickHandler = () => {
    console.log(`TRACER Button click handler`);
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <button className={classes.button} type={props.type || "button"} onClick={clickHandler} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
