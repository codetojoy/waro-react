import Button from "../UI/Button";

const Card = (props) => {
  const isTransparent = props.isTransparent;
  const displayValue = props.isUser || isTransparent ? props.value : "*";
  const clickHandler = () => {
    if (props.onClick) {
      props.onClick(props.value);
    } else {
      console.log(`TRACER card no click handler`);
    }
  };
  return (
    <Button disabled={!props.isUser} className={props.className} onClick={clickHandler}>
      {displayValue}
    </Button>
  );
};

export default Card;
