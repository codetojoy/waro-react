import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import classes from "./Stats.module.css";

import * as C from "../C";

const Stats = (props) => {
  const config = useSelector((state) => {
    return state.config;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.updateStatus({ status: C.STATUS_STATS }));
  });
  const content = config.players.map((p) => {
    return (
      <div>
        <p>{p.name}</p>
        <p>games won: {p.numGamesWon}</p>
      </div>
    );
  });
  return <div className={classes.stats}>{content}</div>;
};

export default Stats;
