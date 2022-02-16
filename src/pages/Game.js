import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import * as C from "../C";
import * as Log from "../Log";
import Players from "../components/Player/Players";
import Kitty from "../components/Player/Kitty";

import { gameActions } from "../store/game-slice";

import Button from "../components/UI/Button";
import Status from "../components/UI/Status";

import classes from "./Game.module.css";

const Game = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const game = useSelector((state) => {
    return state.game;
  });
  Log.logObj("game:: state", game);
  const isTransparent = config.isTransparent;
  const isNewGame = game.stage === C.GAME_STAGE_NEW;
  const isGameOver = game.stage === C.GAME_STAGE_COMPLETE;
  const dealHandler = () => {
    dispatch(gameActions.newGame({ config: config }));
  };
  let content = <p>placeholder</p>;
  if (isNewGame) {
    content = <Button onClick={dealHandler}>Deal</Button>;
  } else if (isGameOver) {
    content = (
      <div className={classes.game}>
        <div>
          <Players players={game.players} isTransparent={isTransparent} />
        </div>
        <div>
          <Status status={game.status} />
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.game}>
        <div>
          <Kitty cards={game.kitty.cards} isTransparent={isTransparent} />
        </div>
        <div>
          <Players players={game.players} isTransparent={isTransparent} />
        </div>
        <div>
          <Status status={game.status} />
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default Game;
