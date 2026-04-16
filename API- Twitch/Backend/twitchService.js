const fetch = require("node-fetch");
const { clientId, accessToken } = require("./config");

async function getStreamsByGame(gameName) {
  // 1. Buscar ID del juego
  const gameRes = await fetch(`https://api.twitch.tv/helix/games?name=${gameName}`, {
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${accessToken}`
    }
  });

  const gameData = await gameRes.json();
  const gameId = gameData.data[0]?.id;

  if (!gameId) return [];

  // 2. Buscar streams por game_id
  const streamRes = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}`, {
    headers: {
      "Client-ID": clientId,
      "Authorization": `Bearer ${accessToken}`
    }
  });

  const streams = await streamRes.json();
  return streams.data;
}

module.exports = { getStreamsByGame };