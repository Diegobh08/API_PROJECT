require("dotenv").config();
const express = require("express");
const { getStreamsByGame } = require("./services/twitchService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/streams/:game", async (req, res) => {
    try {
        const game = req.params.game?.trim();

        if (!game) {
            return res.status(400).json({ error: "Debes indicar un juego." });
        }

        const streams = await getStreamsByGame(game);

        return res.json({
            game,
            total: streams.length,
            streams
        });
    } catch (error) {
        console.error("Error consultando Twitch:", error.message);

        return res.status(error.statusCode || 500).json({
            error: error.message || "No se pudo consultar Twitch."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
