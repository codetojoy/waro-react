import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { configActions } from "../../store/config-slice";
import { uiActions } from "../../store/ui-slice";

import * as C from "../../C";
import * as Log from "../../Log";

import Button from "../../components/UI/Button";
import Status from "../../components/UI/Status";

import classes from "./Config.module.css";

const Config = (props) => {
  const [errorNumCards, setErrorNumCards] = useState(false);
  const numCardsRef = useRef();
  const isTransparentRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const config = useSelector((state) => {
    return state.config;
  });
  useEffect(() => {
    dispatch(uiActions.updateStatus({ status: C.STATUS_CONFIG }));
  });
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
    console.log(`TRACER Config val ${newNumCards} ${numCardsStep}`);
    return newNumCards > 0 && newNumCards % numCardsStep === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newNumCards = numCardsRef.current.value;
    const ok = validateNumCards(newNumCards);
    setErrorNumCards(!ok);
    const isTransparent = isTransparentRef.current.checked;
    if (ok) {
      dispatch(configActions.updateTopLevel({ isTransparent: isTransparent, numCards: newNumCards }));
    }
    Log.log(`C.submitHandler ${newNumCards} ${ok}`);
  };

  return (
    <div className={classes.config}>
      <ul className={classes.playerList}>{players}</ul>
      <Button onClick={newPlayerHandler}>new player</Button>
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
        <fieldset>
          <legend>Transparency</legend>
          <input
            data-testid="transparency"
            defaultChecked={config.isTransparent}
            ref={isTransparentRef}
            type="checkbox"
          ></input>
        </fieldset>
        <Button dataTestId="saveButton" type="submit">
          Save
        </Button>
      </form>
      {errorNumCards && <p className="error">illegal num cards</p>}
    </div>
  );
};

export default Config;
