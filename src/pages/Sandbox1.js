import { useParams } from "react-router-dom";

const Sandbox1 = (props) => {
  const params = useParams();
  const value = params.playerName;
  return <p>value is: {value}</p>;
};

export default Sandbox1;
