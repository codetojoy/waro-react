import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as C from "../C";
import Button from "../components/UI/Button";
import { uiActions } from "../store/ui-slice";

import classes from "./Welcome.module.css";

const Welcome = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.updateStatus({ status: C.STATUS_WELCOME }));
  });
  const clickHandler = () => {
    history.push(C.ROUTE_GAME);
  };
  return (
    <div className={classes.welcome}>
      <Button onClick={clickHandler}>New Game</Button>
    </div>
  );
};

export default Welcome;
