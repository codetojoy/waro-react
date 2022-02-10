import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import * as C from "../../C";

import classes from "./NewPlayer.module.css";

const NewPlayer = (props) => {
  const [strategy, setStrategy] = useState(C.STRATEGY_NEXT_CARD);
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const strategyRef = useRef();
  const config = useSelector((state) => {
    return state.config;
  });
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
  const validate = (name, strategy) => {
    return validateName(name) && validateStrategy(strategy);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const ok = validate(name, strategy);
    setError(!ok);
    if (ok) {
      dispatch(configActions.newPlayer({ name: name, strategy: strategy }));
      history.push(C.ROUTE_CONFIG);
    }
  };

  const backHandler = (event) => {
    event.preventDefault();
    history.push(C.ROUTE_CONFIG);
  };
  return (
    <div className={classes.newPlayer}>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Name</legend>
          <input data-testid="playerName" type="text" ref={nameRef} onChange={() => {}} defaultValue=""></input>
        </fieldset>
        <fieldset>
          <legend>Strategy</legend>
          <select
            data-testid="strategySelect"
            onChange={() => {
              setStrategy(strategyRef.current.value);
            }}
            name="strategy"
            id="strategy"
            value={strategy}
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
      {error && <p className="error">illegal/duplicate value for name or strategy</p>}
    </div>
  );
};

export default NewPlayer;
