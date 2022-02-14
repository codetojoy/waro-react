import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const clickHandler = () => {
    console.log(`TRACER Button click handler`);
    if (props.onClick) {
      props.onClick();
    }
  };
  const classKey = props.className ? props.className : `buttonDefault`;
  return (
    <button
      className={classes[classKey]}
      type={props.type || "button"}
      onClick={clickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
