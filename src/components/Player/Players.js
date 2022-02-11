import Player from "./Player";

const Players = (props) => {
  return (
    <div>
      <Player name="Kitty" cards={props.game.kitty.cards} />
    </div>
  );
};

export default Players;
