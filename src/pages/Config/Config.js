import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { configActions } from "../../store/config-slice";

import * as C from "../../C";
import * as Log from "../../Log";

import classes from "./Config.module.css";

const Config = (props) => {
  const [errorNumCards, setErrorNumCards] = useState(false);
  const numCardsRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  /*
  const testClickHandler = (event) => {
    Log.log(`Config.tCH`);
    dispatch(configActions.playerWinsGame({ name: "Mozart" }));
  };
  */
  const newPlayerHandler = (event) => {
    history.push("/config/player/new");
  };
  const players = config.players.map((p) => {
    const isUser = p.name === C.PLAYER_USERNAME;
    const editLink = isUser ? "" : <NavLink to={`/config/player/${p.name}`}>edit</NavLink>;

    return (
      <li key={p.name}>
        {p.name} ({p.strategy}) {editLink}
      </li>
    );
  });
  const numCardsStep = config.players.length + 1;

  const validateNumCards = (newNumCards) => {
    return newNumCards > 0 && newNumCards % numCardsStep === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newNumCards = numCardsRef.current.value;
    const ok = validateNumCards(newNumCards);
    setErrorNumCards(!ok);
    if (ok) {
      dispatch(configActions.setNumCards({ numCards: newNumCards }));
    }
    Log.log(`C.submitHandler ${newNumCards} ${ok}`);
  };

  return (
    <div className={classes.config}>
      <ul className={classes.playerList}>{players}</ul>
      <button onClick={newPlayerHandler}>new player</button>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Num Cards</legend>
          <input
            data-testid="numCards"
            defaultValue={config.numCards}
            ref={numCardsRef}
            type="number"
            step={numCardsStep}
            min={numCardsStep}
          ></input>
        </fieldset>
        <button data-testid="saveButton" type="submit">
          Save
        </button>
      </form>
      {errorNumCards && <p className="error">illegal num cards</p>}
    </div>
  );
};

export default Config;
