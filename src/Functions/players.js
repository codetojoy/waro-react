export const findPlayerByName = (allPlayers, targetPlayerName) => {
  // not efficient but the list is small
  const target = allPlayers.filter((p) => p.name === targetPlayerName)[0];
  const others = allPlayers.filter((p) => p.name !== targetPlayerName);
  return [target, others];
};
