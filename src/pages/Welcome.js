import { useHistory } from "react-router-dom";

import * as C from "../C";
import Button from "../components/UI/Button";

const Welcome = (props) => {
  const history = useHistory();
  const clickHandler = () => {
    history.push(C.ROUTE_GAME);
  };
  return (
    <div>
      <Button onClick={clickHandler}>New Game</Button>
    </div>
  );
};

export default Welcome;
