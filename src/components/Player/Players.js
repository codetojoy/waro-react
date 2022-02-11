import Player from "./Player";

const Players = (props) => {
  const players = props.game.players.map((p) => {
    const name = `${p.name} (${p.numPointsForRound})`;
    return (
      <li key={p.name}>
        <Player name={name} cards={p.cards} />
      </li>
    );
  });
  return (
    <div>
      <Player name="Kitty" cards={props.game.kitty.cards} />
      <hr />
      <ul>{players}</ul>
    </div>
  );
};

export default Players;
