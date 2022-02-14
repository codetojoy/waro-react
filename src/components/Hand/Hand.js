import Card from "./Card";

const Hand = (props) => {
  const cards = props.cards.map((c) => {
    let classStr = "";
    if (props.className) {
      classStr = props.className;
    } else {
      classStr = props.isUser ? "buttonGreen" : "buttonDefault";
    }
    return <Card key={c} value={c} isUser={props.isUser} isTransparent={props.isTransparent} className={classStr} />;
  });
  return <div>{cards}</div>;
};

export default Hand;
