import Card from "./Card";

import * as C from "../../C";

import classes from "./Hand.module.css";

const Hand = (props) => {
  const cards = props.cards.map((c) => {
    let classStr = props.className;
    if (!props.className) {
      classStr = props.isUser ? C.CSS_GREEN_BUTTON : C.CSS_DEFAULT_BUTTON;
    }
    return (
      <div key={c}>
        <Card
          onClick={props.onClick}
          key={c}
          value={c}
          isUser={props.isUser}
          isTransparent={props.isTransparent}
          className={classStr}
        />
      </div>
    );
  });
  return <div className={classes.hand}>{cards}</div>;
};

export default Hand;
