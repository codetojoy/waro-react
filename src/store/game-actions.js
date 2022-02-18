import { gameActions } from "./game-slice";
import { uiActions } from "./ui-slice";

import * as C from "../C";

import * as Strategy from "../Functions/strategies";
import * as Round from "../Functions/round";
import * as Players from "../Functions/players";

export const playRound = ({ userBid }) => {
  return async (dispatch, getState) => {
    console.log(`new play round with userBid: ${userBid}`);

    dispatch(uiActions.updateStatus({ status: "fetching bids..." }));

    const game = getState().game;
    const maxCard = getState().config.numCards;
    const [user, computerPlayers] = Players.findPlayerByName(game.players, C.PLAYER_USERNAME);
    const prizeCard = game.kitty.cards[0];
    const newKittyCards = game.kitty.cards.slice(1);
    const computerBids = await Strategy.getBids(computerPlayers, prizeCard, maxCard);
    const bids = [...computerBids, { name: user.name, bidValue: userBid }];
    const roundWinnerName = Round.findRoundWinner(bids);
    const tmpNewPlayers = Round.applyBids(game.players, bids);
    const newPlayers = Round.applyRound(tmpNewPlayers, roundWinnerName, prizeCard);

    const isGameOver = newKittyCards.length === 0;
    const gameWinnerName = isGameOver ? Round.findGameWinner(newPlayers) : null;
    const stage = isGameOver ? C.GAME_STAGE_COMPLETE : C.GAME_STAGE_IN_PROGRESS;

    if (isGameOver) {
      const verb = gameWinnerName === C.PLAYER_USERNAME ? "win" : "wins";
      dispatch(uiActions.updateStatus({ status: `${gameWinnerName} ${verb} the game!` }));
    } else {
      const verb = roundWinnerName === C.PLAYER_USERNAME ? "win" : "wins";
      dispatch(uiActions.updateStatus({ status: `${roundWinnerName} ${verb} the round: ${prizeCard} points` }));
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
