import Card from "./Card";

import * as C from "../../C";

const Hand = (props) => {
  const cards = props.cards.map((c) => {
    let classStr = props.className;
    if (!props.className) {
      classStr = props.isUser ? C.CSS_GREEN_BUTTON : C.CSS_DEFAULT_BUTTON;
    }
    return <Card key={c} value={c} isUser={props.isUser} isTransparent={props.isTransparent} className={classStr} />;
  });
  return <div>{cards}</div>;
};

export default Hand;
