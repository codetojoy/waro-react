import Hand from "../Hand/Hand";

import classes from "./Player.module.css";

const Player = (props) => {
  const clickHandler = (value) => {
    if (props.isUser) {
      console.log(`TRACER Player click: ${value}`);
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
