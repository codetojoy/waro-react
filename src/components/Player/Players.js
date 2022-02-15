import Player from "./Player";

import * as C from "../../C";

import classes from "./Players.module.css";

const Players = (props) => {
  const players = props.players.map((p) => {
    const displayName = `${p.name} (${p.numPointsForRound})`;
    const isUser = p.name === C.PLAYER_USERNAME;
    return (
      <div key={p.name}>
        <Player
          key={p.name}
          displayName={displayName}
          cards={p.cards}
          isTransparent={props.isTransparent}
          isUser={isUser}
        />
      </div>
    );
  });
  return <div className={classes.players}>{players}</div>;
};

export default Players;
