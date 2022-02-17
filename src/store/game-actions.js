import { gameActions } from "./game-slice";
import { uiActions } from "./ui-slice";

import * as C from "../C";

import * as Strategy from "../Functions/strategies";
import * as Round from "../Functions/round";
import * as Players from "../Functions/players";

/*
// TODO: move to ./Functions/players.js
const findPlayer = (allPlayers, targetPlayerName) => {
  // TODO: just use find twice with opposite conditions!
  let target = null;
  let others = [];
  allPlayers.forEach((player) => {
    if (player.name === targetPlayerName) {
      target = player;
    } else {
      others.push(player);
    }
  });
  return [target, others];
};
*/

export const playRound = ({ userBid }) => {
  return async (dispatch, getState) => {
    console.log(`new play round with userBid: ${userBid}`);

    dispatch(uiActions.updateStatus({ status: "fetching bids..." }));

    const game = getState().game;
    const [user, computerPlayers] = Players.findPlayerByName(game.players, C.PLAYER_USERNAME);
    const prizeCard = game.kitty.cards[0];
    const newKittyCards = game.kitty.cards.slice(1);
    const computerBids = Strategy.getBids(computerPlayers, prizeCard);
    const bids = [...computerBids, { name: user.name, bidValue: userBid }];
    const roundWinnerName = Round.findRoundWinner(bids);
    const tmpNewPlayers = Round.applyBids(game.players, bids);
    const newPlayers = Round.applyRound(tmpNewPlayers, roundWinnerName, prizeCard);

    const isGameOver = newKittyCards.length === 0;
    const gameWinnerName = isGameOver ? Round.findGameWinner(newPlayers) : null;
    const stage = isGameOver ? C.GAME_STAGE_COMPLETE : game.stage;

    if (isGameOver) {
      // gameWinnerName = Round.findGameWinner(game.players);
      // state.gameWinnerName = gameWinnerName;
      dispatch(uiActions.updateStatus({ status: `${gameWinnerName} wins game!` }));
      // stage = C.GAME_STAGE_COMPLETE;
    } else {
      dispatch(uiActions.updateStatus({ status: `${roundWinnerName} wins round for ${prizeCard} points` }));
    }
    dispatch(
      gameActions.updateStateForRound({
        kittyCards: newKittyCards,
        players: newPlayers,
        stage: stage,
        gameWinnerName: gameWinnerName,
      })
    );
  };
};
