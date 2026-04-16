const form = document.querySelector("#search-form");
const input = document.querySelector("#game-input");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

function renderStreams(game, streams) {
    if (!streams.length) {
        results.innerHTML = `<p>No se encontraron streams para <strong>${game}</strong>.</p>`;
        return;
    }

    results.innerHTML = streams
        .map(
            (stream) => `
                <article class="card">
                    <img src="${stream.thumbnail_url}" alt="Miniatura de ${stream.user_name}">
                    <div class="card-body">
                        <h3>${stream.user_name}</h3>
                        <p>${stream.title}</p>
                        <p><strong>Viewers:</strong> ${stream.viewer_count}</p>
                        <a href="${stream.url}" target="_blank" rel="noreferrer">Ver canal</a>
                    </div>
                </article>
            `
        )
        .join("");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const game = input.value.trim();
    if (!game) {
        status.textContent = "Escribe un juego.";
        results.innerHTML = "";
        return;
    }

    status.textContent = "Consultando Twitch...";
    results.innerHTML = "";

    try {
        const response = await fetch(`/api/streams/${encodeURIComponent(game)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "No se pudo obtener la información.");
        }

        status.textContent = `Se encontraron ${data.total} streams para ${data.game}.`;
        renderStreams(data.game, data.streams);
    } catch (error) {
        status.textContent = error.message;
        results.innerHTML = "";
    }
});
