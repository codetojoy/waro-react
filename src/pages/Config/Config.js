import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import classes from "./Config.module.css";

const Config = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const testClickHandler = (event) => {
    console.log(`TRACER Config.clickHandler`);
    dispatch(configActions.playerWinsGame({ name: "Mozart" }));
  };
  const newPlayerHandler = (event) => {
    console.log(`TRACER Config.newPlayerHandler`);
    history.push("/config/player/new");
  };
  const players = config.players.map((p) => (
    <li key={p.name}>
      {p.name} ({p.strategy}) <NavLink to={`/config/player/${p.name}`}>edit</NavLink>
    </li>
  ));
  return (
    <div className={classes.config}>
      <ul className={classes.playerList}>{players}</ul>
      <button onClick={testClickHandler}>TRACER mozart wins game</button>
      <button onClick={newPlayerHandler}>new player</button>
    </div>
  );
};

export default Config;
