import React from "react";

import classes from "./Status.module.css";

const Status = (props) => {
  return (
    <div className={classes.status}>
      <p>{props.status}</p>
    </div>
  );
};

export default Status;
