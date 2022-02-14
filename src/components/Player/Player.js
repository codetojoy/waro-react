import Hand from "../Hand/Hand";

const Player = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <Hand cards={props.cards} isUser={props.isUser} isTransparent={props.isTransparent} />
    </div>
  );
};

export default Player;
