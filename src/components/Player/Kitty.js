import Card from "../Hand/Card";
import Hand from "../Hand/Hand";

import * as C from "../../C";

const Kitty = (props) => {
  const [prizeCard, ...kittyCards] = props.cards;
  return (
    <div>
      <p>Prize Card</p>
      <Card value={prizeCard} doShow={true} isTransparent={props.isTransparent} className={C.CSS_AMBER_BUTTON} />
      <p>Kitty</p>
      <Hand cards={kittyCards} isTransparent={props.isTransparent} className={C.CSS_AMBER_BUTTON} />
    </div>
  );
};

export default Kitty;
