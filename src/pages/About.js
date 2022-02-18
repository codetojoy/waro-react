import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

import * as C from "../C";

import classes from "./About.module.css";

const About = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.updateStatus({ status: C.STATUS_ABOUT }));
  });
  return (
    <div className={classes.about}>
      <h2>Rules</h2>
      <p>Use a deck of N cards with no suits, just natural numbers from 1 to N. (similar to Rack-O)</p>
      <p>Shuffle and deal N cards evenly to X players and a kitty.</p>
      <div>
        For each round:
        <ul>
          <li>Reveal a card from the kitty. This is the 'prize card'.</li>
          <li>Each player selects a 'bid' from his/her hand.</li>
          <li>Bids are revealed: highest bid wins points according to value of the prize card.</li>
        </ul>
      </div>
      <p>After all rounds, player with most points wins.</p>
      <h2>Example</h2>
      <p></p>
      Deck is [1,2,3,4,5,6,7,8,9]
      <p>John's hand is [2,4,9] Alice's hand is [1,3,8] kitty is [5,6,7]</p>
      <p>Round 1, prize card is 5 John bids 4, Alice bids 8 so Alice wins 5 pts</p>
      <p>Round 2, prize card is 6 John bids 9, Alice bids 1 so John wins 6 pts</p>
      <p>Round 3, prize card is 7 John bids 2, Alice bids 3 so Alice wins 7 pts</p>
      <p>Alice wins (12 pts) over John (6 pts)</p>
    </div>
  );
};

export default About;
