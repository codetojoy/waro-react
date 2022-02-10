import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import * as C from "../../C";

import classes from "./PlayerConfig.module.css";

const PlayerConfig = (props) => {
  const history = useHistory();
  const strategyRef = useRef();
  const params = useParams();
  const playerName = params.playerName;
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const player = config.players.find((p) => p.name === playerName);
  // const [name] = useState(player.name);
  const nameRef = useRef(player.name);
  const options = config.visibleStrategies.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const newName = nameRef.current.value;
    // TODO: validate
    dispatch(configActions.setPlayerName({ name: player.name, newName: newName }));
    history.push(C.ROUTE_CONFIG);
  };
  const selectHandler = () => {
    const strategy = strategyRef.current.value;
    // TODO: validate
    dispatch(configActions.setPlayerStrategy({ name: player.name, strategy: strategy }));
  };

  const backHandler = (event) => {
    event.preventDefault();
    history.push(C.ROUTE_CONFIG);
  };

  return (
    <div className={classes.playerConfig}>
      <p>PlayerConfig page for {player.name}</p>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Name</legend>
          <input data-testid="playerName" type="text" ref={nameRef} defaultValue={player.name}></input>
        </fieldset>
        <fieldset>
          <legend>Strategy</legend>
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
        </fieldset>
        <button data-testid="saveButton" type="submit">
          Save
        </button>
      </form>
      <button data-testid="backButton" type="button" onClick={backHandler}>
        Back
      </button>
    </div>
  );
};

export default PlayerConfig;
