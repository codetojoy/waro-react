import { useSelector } from "react-redux";

import classes from "./Stats.module.css";

const Stats = (props) => {
  const config = useSelector((state) => {
    return state.config;
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
