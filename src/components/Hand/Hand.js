import Card from "./Card";

const Hand = (props) => {
  const cards = props.cards.map((c) => {
    return <Card key={c} value={c} isUser={props.isUser} isTransparent={props.isTransparent} />;
  });
  return <div>{cards}</div>;
};

export default Hand;
