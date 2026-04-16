# 🎮 API Twitch Streams Web App

## 1. Título del proyecto

**Aplicación web para consulta de transmisiones en vivo de Twitch por videojuego**

## 2. Descripción general del proyecto

Este proyecto es una aplicación web desarrollada con **Node.js**, **Express** y **JavaScript** que permite consultar transmisiones en vivo de **Twitch** a partir del nombre de un videojuego ingresado por el usuario.

La aplicación combina un frontend simple con un backend que actúa como intermediario entre la interfaz y la API de Twitch. De este modo, el usuario puede buscar un juego, enviar la solicitud al servidor y visualizar los canales en vivo disponibles junto con información relevante como el título del stream, cantidad de espectadores y enlace al canal. 🚀

Además, el proyecto trabaja bajo el enfoque de una **API REST**, es decir, una interfaz que permite intercambiar información entre cliente y servidor mediante rutas HTTP bien definidas y respuestas en formato JSON.

## 3. Objetivos

- Desarrollar una aplicación web capaz de consumir datos desde una API externa.
- Implementar una arquitectura básica cliente-servidor con Express.
- Consultar la API de Twitch para obtener streams en vivo según un videojuego.
- Mostrar la información de forma clara y útil para el usuario.
- Comprender el funcionamiento práctico de una API REST en una aplicación real.

## 4. Tecnologías utilizadas

- **Node.js**: entorno de ejecución para JavaScript en el servidor.
- **Express**: framework para crear rutas y gestionar el backend.
- **JavaScript**: lenguaje utilizado tanto en frontend como en backend.
- **HTML**: estructura de la interfaz web.
- **CSS**: estilos para la presentación visual.
- **dotenv**: manejo de variables de entorno para credenciales.
- **API de Twitch (Helix)**: fuente de datos de las transmisiones en vivo.

## 5. Funcionamiento del sistema

### ¿Qué es una API REST?

Una **API REST** es un mecanismo de comunicación entre sistemas basado en el protocolo HTTP. Permite acceder a recursos mediante rutas, por ejemplo `GET /api/streams/:game`, y normalmente devuelve la información en formato **JSON**, lo que facilita su consumo desde aplicaciones web.

### Flujo de funcionamiento paso a paso

1. El usuario escribe el nombre de un videojuego en el formulario del frontend.
2. El navegador envía una solicitud al servidor mediante la ruta `GET /api/streams/:game`.
3. El servidor Express recibe el nombre del juego y llama al servicio encargado de comunicarse con Twitch.
4. El servicio solicita primero un **access token** a Twitch usando `CLIENT_ID` y `CLIENT_SECRET`.
5. Con ese token, el sistema consulta la API de Twitch para buscar la categoría o videojuego correspondiente.
6. Una vez obtiene el `game_id`, realiza una segunda consulta para recuperar los streams en vivo asociados a ese juego.
7. El backend procesa la respuesta, selecciona los datos más importantes y los devuelve al frontend en formato JSON.
8. Finalmente, el frontend muestra la lista de transmisiones disponibles al usuario. 📡

### ¿Cómo se obtiene la información desde Twitch?

La información se obtiene en dos etapas:

- Primero se solicita un token OAuth a `https://id.twitch.tv/oauth2/token`.
- Después se consulta la API Helix de Twitch:
  - Búsqueda del juego: `https://api.twitch.tv/helix/search/categories`
  - Consulta de streams: `https://api.twitch.tv/helix/streams`

Este enfoque permite que el backend controle la autenticación y entregue al frontend solo la información necesaria.

## 6. Endpoints implementados

### `GET /api/streams/:game`

Obtiene una lista de transmisiones en vivo relacionadas con el videojuego indicado en la URL.

**Parámetro:**

- `game`: nombre del videojuego a consultar.

**Ejemplo de solicitud:**

```http
GET /api/streams/Valorant
```

**Ejemplo de respuesta JSON:**

```json
{
  "game": "Valorant",
  "total": 2,
  "streams": [
    {
      "id": "318286476128",
      "user_name": "s0mcs",
      "title": "W STREAMER NRG s0m",
      "viewer_count": 4969,
      "started_at": "2026-04-16T11:53:48Z",
      "language": "en",
      "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_s0mcs-320x180.jpg",
      "url": "https://www.twitch.tv/s0mcs"
    },
    {
      "id": "316904894040",
      "user_name": "tarik",
      "title": "DAY 1 - Twitter @tarik",
      "viewer_count": 4873,
      "started_at": "2026-04-16T18:35:56Z",
      "language": "en",
      "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_tarik-320x180.jpg",
      "url": "https://www.twitch.tv/tarik"
    }
  ]
}
```

**Ejemplo de respuesta cuando no se encuentran resultados:**

```json
{
  "game": "JuegoInexistente",
  "total": 0,
  "streams": []
}
```

## 7. Instrucciones de instalación y ejecución

### Requisitos previos

- Tener instalado **Node.js**.
- Contar con credenciales de desarrollador de Twitch:
  - `CLIENT_ID`
  - `CLIENT_SECRET`

### Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Ingresa a la carpeta del proyecto:

```bash
cd API_PROJECT
```

3. Instala las dependencias:

```bash
npm install
```

4. Crea un archivo `.env` dentro de `API- Twitch/` con el siguiente contenido:

```env
CLIENT_ID=tu_client_id
CLIENT_SECRET=tu_client_secret
PORT=3000
```

### Ejecución

1. Accede a la carpeta de la aplicación:

```bash
cd "API- Twitch"
```

2. Inicia el servidor:

```bash
node server.js
```

3. Abre el navegador en:

```text
http://localhost:3000
```

## 8. Ejemplos de uso

### Uso desde el navegador

- Escribir un videojuego, por ejemplo: `Valorant`
- Presionar el botón **Buscar**
- Visualizar los streams en vivo disponibles

### Uso desde la URL del endpoint

```text
http://localhost:3000/api/streams/Valorant
```

### Uso con `fetch`

```javascript
fetch("http://localhost:3000/api/streams/Valorant")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## 9. Capturas de pantalla

Puedes reemplazar estas rutas por las imágenes reales dentro del repositorio:

![Pantalla principal](docs/captura-principal.png)
![Resultado de búsqueda](docs/captura-resultados.png)
![Respuesta JSON](docs/captura-json.png)

## 10. Estructura del proyecto

```text
API_PROJECT/
├── API- Twitch/
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   ├── public/
│   │   ├── app.js
│   │   └── index.html
│   └── services/
│       └── twitchService.js
├── package.json
├── package-lock.json
└── README.md
```

## 11. Conclusiones

Este proyecto demuestra cómo integrar una API externa en una aplicación web de forma organizada y funcional. A través del uso de **Express** y la **API de Twitch**, se construyó una solución que transforma solicitudes del usuario en información útil y visualmente accesible.

Además de cumplir con la búsqueda de streams en vivo, el desarrollo permitió aplicar conceptos importantes como autenticación con tokens, consumo de servicios REST, manejo de respuestas JSON y separación entre frontend y backend. En conjunto, representa una base sólida para futuros proyectos web orientados al consumo de APIs. ✅
