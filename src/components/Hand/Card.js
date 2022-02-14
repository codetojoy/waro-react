import Button from "../UI/Button";

const Card = (props) => {
  const isTransparent = props.isTransparent;
  const value = props.isUser || isTransparent ? props.value : "X";

  return <Button disabled={!props.isUser}>{value}</Button>;
};

export default Card;
