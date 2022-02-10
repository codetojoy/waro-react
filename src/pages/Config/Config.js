import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import * as C from "../../C";
import * as Log from "../../Log";

import classes from "./Config.module.css";

const Config = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const testClickHandler = (event) => {
    Log.log(`Config.tCH`);
    dispatch(configActions.playerWinsGame({ name: "Mozart" }));
  };
  const newPlayerHandler = (event) => {
    history.push("/config/player/new");
  };
  const players = config.players.map((p) => {
    const isUser = p.name === C.PLAYER_USERNAME;
    const editLink = isUser ? "" : <NavLink to={`/config/player/${p.name}`}>edit</NavLink>;

    return (
      <li key={p.name}>
        {p.name} ({p.strategy}) {editLink}
      </li>
    );
  });
  return (
    <div className={classes.config}>
      <ul className={classes.playerList}>{players}</ul>
      <button onClick={testClickHandler}>TRACER mozart wins game</button>
      <button onClick={newPlayerHandler}>new player</button>
    </div>
  );
};

export default Config;
