import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as C from "../C";
import * as Log from "../Log";
import Players from "../components/Player/Players";
import Kitty from "../components/Player/Kitty";

import { configActions } from "../store/config-slice";
import { gameActions } from "../store/game-slice";
import { uiActions } from "../store/ui-slice";

import Button from "../components/UI/Button";

import classes from "./Game.module.css";

const Game = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const game = useSelector((state) => {
    return state.game;
  });
  useEffect(() => {
    const isGameNew = game.stage === C.GAME_STAGE_NEW;
    const isGameOver = game.stage === C.GAME_STAGE_COMPLETE;
    if (isGameNew) {
      const status = C.STATUS_GAME_NEW;
      dispatch(uiActions.updateStatus({ status }));
    } else if (isGameOver) {
      dispatch(configActions.playerWinsGame({ name: game.gameWinnerName }));
      // const status = C.STATUS_GAME_OVER;
      // dispatch(uiActions.updateStatus({ status }));
    }
  }, [game, dispatch]);

  Log.log(`game state stage: ${game.stage}`);
  const isTransparent = config.isTransparent;
  const isNewGame = game.stage === C.GAME_STAGE_NEW;
  const isGameOver = game.stage === C.GAME_STAGE_COMPLETE;
  const dealHandler = () => {
    dispatch(gameActions.newGame({ config: config }));
  };
  if (isNewGame) {
    return (
      <div className={classes.game}>
        <Button onClick={dealHandler}>Deal</Button>
      </div>
    );
  } else if (isGameOver) {
    return (
      <div className={classes.game}>
        <div>
          <Players players={game.players} isTransparent={isTransparent} />
        </div>
        <Button onClick={dealHandler}>Deal</Button>
      </div>
    );
  } else {
    return (
      <div className={classes.game}>
        <div>
          <Kitty cards={game.kitty.cards} isTransparent={isTransparent} />
        </div>
        <div>
          <Players players={game.players} isTransparent={isTransparent} />
        </div>
      </div>
    );
  }
};

export default Game;
