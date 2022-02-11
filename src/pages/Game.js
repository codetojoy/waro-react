import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import * as C from "../C";
import * as Log from "../Log";
import Players from "../components/Player/Players";

import { gameActions } from "../store/game-slice";

const Game = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const game = useSelector((state) => {
    return state.game;
  });
  Log.logObj("game:: state", game);
  const isNewGame = game.stage === C.GAME_STAGE_NEW;
  const dealHandler = () => {
    dispatch(gameActions.newGame({ config: config }));
  };
  let content = <p>placeholder</p>;
  if (isNewGame) {
    content = (
      <button type="button" onClick={dealHandler}>
        Deal
      </button>
    );
  } else {
    content = <Players game={game} />;
  }
  return <div>{content}</div>;
};

export default Game;
