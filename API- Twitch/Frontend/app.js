async function buscar() {
  const game = document.getElementById("gameInput").value;
  const res = await fetch(`http://localhost:3000/streams/${game}`);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach(stream => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${stream.user_name}</h3>
      <p>${stream.title}</p>
      <img src="${stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')}" />
    `;

    container.appendChild(div);
  });
}