import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import * as C from "../C";
import Players from "../components/Player/Players";

// import { configActions } from "../store/config-slice";
import { gameActions } from "../store/game-slice";

// import { deal } from "../Functions/dealer";

const Game = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const game = useSelector((state) => {
    return state.game;
  });
  const isNewGame = game.stage === C.GAME_STAGE_NEW;
  const dealHandler = () => {
    // const newGame = deal(config, game);
    dispatch(gameActions.newGame({ config: config }));
  };
  return (
    <div>
      {isNewGame && (
        <button type="button" onClick={dealHandler}>
          Deal
        </button>
      )}
      {!isNewGame && <Players />}
    </div>
  );
};

export default Game;
