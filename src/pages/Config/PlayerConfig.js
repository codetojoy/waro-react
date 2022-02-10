import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import * as C from "../../C";

import classes from "./PlayerConfig.module.css";

const PlayerConfig = (props) => {
  const [errorName, setErrorName] = useState(false);
  const [errorStrategy, setErrorStrategy] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const history = useHistory();
  const strategyRef = useRef();
  const params = useParams();
  const playerName = params.playerName;
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  const player = config.players.find((p) => p.name === playerName);
  const nameRef = useRef(player.name);
  const options = config.visibleStrategies.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });

  const validateName = (newName) => {
    const found = config.players.find((p) => p.name === newName);
    const result = !found;
    return result;
  };
  const validateStrategy = (strategy) => {
    const found = config.visibleStrategies.find((s) => s === strategy);
    return found;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (nameTouched) {
      const newName = nameRef.current.value;
      const ok = validateName(newName);
      if (ok) {
        dispatch(configActions.setPlayerName({ name: player.name, newName: newName }));
        history.push(C.ROUTE_CONFIG);
      }
      setErrorName(!ok);
    } else {
      history.push(C.ROUTE_CONFIG);
    }
  };
  const nameHandler = () => {
    setNameTouched(true);
  };
  const selectHandler = () => {
    const strategy = strategyRef.current.value;
    const ok = validateStrategy(strategy);
    if (ok) {
      dispatch(configActions.setPlayerStrategy({ name: player.name, strategy: strategy }));
      setErrorStrategy(false);
    } else {
      setErrorStrategy(true);
    }
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
          <input
            data-testid="playerName"
            type="text"
            ref={nameRef}
            defaultValue={player.name}
            onChange={nameHandler}
          ></input>
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
      {errorName && <p className="error">name must be unique</p>}
      {errorStrategy && <p className="error">illegal strategy</p>}
    </div>
  );
};

export default PlayerConfig;
