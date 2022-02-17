import React from "react";
import { useSelector } from "react-redux";

import classes from "./Status.module.css";

const Status = (props) => {
  const ui = useSelector((state) => {
    return state.ui;
  });
  return <div className={classes.status}>{ui.status}</div>;
};

export default Status;
