import Card from "../Hand/Card";
import Hand from "../Hand/Hand";

import * as C from "../../C";

import classes from "./Kitty.module.css";

const Kitty = (props) => {
  const [prizeCard, ...kittyCards] = props.cards;
  return (
    <div className={classes.kitty}>
      <div className={classes.kittyPrize}>
        <p>Prize Card</p>
        <Card value={prizeCard} doShow={true} isTransparent={true} className={C.CSS_AMBER_BUTTON} />
      </div>
      <div className={classes.kittyCards}>
        <p>Kitty</p>
        <Hand cards={kittyCards} isTransparent={props.isTransparent} className={C.CSS_AMBER_BUTTON} />
      </div>
    </div>
  );
};

export default Kitty;
