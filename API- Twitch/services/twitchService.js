const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken = null;
let accessTokenExpiresAt = 0;

function assertEnvVars() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        const error = new Error("Faltan CLIENT_ID o CLIENT_SECRET en el archivo .env.");
        error.statusCode = 500;
        throw error;
    }
}

async function requestJson(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || "Error al consultar la API de Twitch.");
        error.statusCode = response.status;
        error.details = data;
        throw error;
    }

    return data;
}

async function getAccessToken() {
    assertEnvVars();

    if (accessToken && Date.now() < accessTokenExpiresAt) {
        return accessToken;
    }

    const data = await requestJson("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials"
        })
    });

    accessToken = data.access_token;
    accessTokenExpiresAt = Date.now() + ((data.expires_in || 0) - 60) * 1000;

    return accessToken;
}

async function getStreamsByGame(gameName) {
    const token = await getAccessToken();
    const encodedGameName = encodeURIComponent(gameName);

    const gameData = await requestJson(
        `https://api.twitch.tv/helix/search/categories?query=${encodedGameName}&first=1`,
        {
            headers: {
                "Client-ID": CLIENT_ID,
                Authorization: `Bearer ${token}`
            }
        }
    );

    const gameId = gameData.data?.[0]?.id;

    if (!gameId) {
        return [];
    }

    const streamsData = await requestJson(
        `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=20`,
        {
            headers: {
                "Client-ID": CLIENT_ID,
                Authorization: `Bearer ${token}`
            }
        }
    );

    return streamsData.data.map((stream) => ({
        id: stream.id,
        user_name: stream.user_name,
        title: stream.title,
        viewer_count: stream.viewer_count,
        started_at: stream.started_at,
        language: stream.language,
        thumbnail_url: stream.thumbnail_url
            .replace("{width}", "320")
            .replace("{height}", "180"),
        url: `https://www.twitch.tv/${stream.user_login}`
    }));
}

module.exports = { getStreamsByGame };
