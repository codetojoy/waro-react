import Card from "../Hand/Card";
import Hand from "../Hand/Hand";

const Kitty = (props) => {
  const [prizeCard, ...kittyCards] = props.cards;
  return (
    <div>
      <p>Prize Card</p>
      <Card value={prizeCard} doShow={true} className="buttonAmber" />
      <p>Kitty</p>
      <Hand cards={kittyCards} isTransparent={props.isTransparent} className="buttonAmber" />
    </div>
  );
};

export default Kitty;
