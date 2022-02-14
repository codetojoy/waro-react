import Card from "../Hand/Card";
import Hand from "../Hand/Hand";

const Kitty = (props) => {
  const [prizeCard, ...kittyCards] = props.cards;
  return (
    <div>
      <p>Prize Card</p>
      <Card value={prizeCard} doShow={true} />
      <p>Kitty</p>
      <Hand cards={kittyCards} isTransparent={props.isTransparent} />
    </div>
  );
};

export default Kitty;
