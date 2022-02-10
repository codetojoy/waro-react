import { useHistory } from "react-router-dom";

import * as C from "../C";

const Welcome = (props) => {
  const history = useHistory();
  const clickHandler = () => {
    history.push(C.ROUTE_GAME);
  };
  return (
    <div>
      <button type="button" onClick={clickHandler}>
        New Game
      </button>
    </div>
  );
};

export default Welcome;
