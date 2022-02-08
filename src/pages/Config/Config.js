import { useDispatch, useSelector } from "react-redux";

import { configActions } from "../../store/config-slice";

const Config = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const clickHandler = (event) => {
    console.log(`TRACER Config.clickHandler`);
    dispatch(configActions.playerWinsGame({ name: "Mozart" }));
  };
  const items = config.players.map((p) => (
    <li key={p.name}>
      {p.name} ({p.strategy}) #games: {p.numGamesWon}
    </li>
  ));
  return (
    <div>
      <ul>{items}</ul>
      <button onClick={clickHandler}>Award Game to Mozart</button>
    </div>
  );
};

export default Config;
