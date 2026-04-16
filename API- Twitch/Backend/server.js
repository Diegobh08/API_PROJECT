const express = require("express");
const { getStreamsByGame } = require("./twitchService");

const app = express();

app.get("/streams/:game", async (req, res) => {
  const game = req.params.game;
  const data = await getStreamsByGame(game);
  res.json(data);
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));