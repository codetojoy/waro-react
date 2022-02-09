import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { configActions } from "../../store/config-slice";

const PlayerConfig = (props) => {
  const strategyRef = useRef();
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
  const selectHandler = () => {
    const strategy = strategyRef.current.value;
    dispatch(configActions.setPlayerStrategy({ name: player.name, strategy: strategy }));
  };

  return (
    <div>
      <p>PlayerConfig page for {player.name}</p>
      <form onSubmit={submitHandler}>
        <label htmlFor="strategy">Strategy</label>
        <select
          data-testid="strategySelect"
          onChange={selectHandler}
          name="strategy"
          id="strategy"
          value={player.strategy}
          ref={strategyRef}
        >
          {options}
        </select>
      </form>
      <Link to="/config">Back</Link>
    </div>
  );
};

export default PlayerConfig;
