import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { configActions } from "../../store/config-slice";

const PlayerConfig = (props) => {
  const params = useParams();
  const playerName = params.playerName;
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const player = config.players.find((p) => p.name === playerName);
  const options = config.visibleStrategies.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
  };
  const selectHandler = (event) => {
    const strategy = event.value;
    dispatch(configActions.setPlayerStrategy({ name: player.name, strategy: strategy }));
  };

  return (
    <div>
      <p>PlayerConfig page for {player.name}</p>
      <form onSubmit={submitHandler}>
        <label htmlFor="strategy">Strategy</label>
        <select onChange={selectHandler} name="strategy" id="strategy" value={player.strategy}>
          {options}
        </select>
      </form>
    </div>
  );
};

export default PlayerConfig;
