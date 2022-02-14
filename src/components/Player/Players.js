import Player from "./Player";

import * as C from "../../C";

const Players = (props) => {
  const players = props.players.map((p) => {
    const name = `${p.name} (${p.numPointsForRound})`;
    const isUser = p.name === C.PLAYER_USERNAME;
    return (
      <li key={p.name}>
        <Player name={name} cards={p.cards} isTransparent={props.isTransparent} isUser={isUser} />
      </li>
    );
  });
  return (
    <div>
      <ul>{players}</ul>
    </div>
  );
};

export default Players;
