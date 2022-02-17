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
  /*
  const ui = useSelector((state) => {
    return state.ui;
  });
  */
  useEffect(() => {
    const isGameNew = game.stage === C.GAME_STAGE_NEW;
    const isGameInProgress = game.stage === C.GAME_STAGE_IN_PROGRESS;
    const isGameOver = game.stage === C.GAME_STAGE_COMPLETE;
    let status = "";
    if (isGameNew) {
      status = C.STATUS_GAME_NEW;
      dispatch(uiActions.updateStatus({ status }));
    } else if (isGameInProgress) {
      // status = C.STATUS_GAME_IN_PROGRESS;
    } else if (isGameOver) {
      dispatch(configActions.playerWinsGame({ name: game.gameWinnerName }));
      status = C.STATUS_GAME_OVER;
      dispatch(uiActions.updateStatus({ status }));
    }
  }, [game, dispatch]);

  Log.log(`game state stage: ${game.stage}`);
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
      </div>
    );
  }
  return <div>{content}</div>;
};

export default Game;
