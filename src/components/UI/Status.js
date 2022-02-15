import React from "react";

import classes from "./Status.module.css";

const Status = (props) => {
  return <div className={classes.status}>{props.status}</div>;
};

export default Status;
