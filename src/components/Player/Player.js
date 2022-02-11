const Player = (props) => {
  const tmpCards = `${props.cards}`;
  return (
    <div>
      <p>
        name: {props.name} cards: {tmpCards}
      </p>
    </div>
  );
};

export default Player;
