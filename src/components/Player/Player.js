import { useDispatch, useSelector } from "react-redux";

import Hand from "../Hand/Hand";

import classes from "./Player.module.css";

import { gameActions } from "../../store/game-slice";

const Player = (props) => {
  const dispatch = useDispatch();
  const clickHandler = (value) => {
    if (props.isUser) {
      console.log(`TRACER Player plays: ${value}`);
      dispatch(gameActions.playRound({ userBid: value }));
    }
  };
  return (
    <div className={classes.player}>
      <div>
        <p>{props.displayName}</p>
      </div>
      <div>
        <Hand onClick={clickHandler} cards={props.cards} isUser={props.isUser} isTransparent={props.isTransparent} />
      </div>
    </div>
  );
};

export default Player;
