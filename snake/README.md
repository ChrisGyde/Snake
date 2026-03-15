# Snake

Classic Snake game built as a minimal, dependency-free web project. It runs as static files with a tiny Node.js server for local development.

## How it was created
- Implemented as plain HTML, CSS, and JavaScript with no external dependencies.
- Game logic is kept deterministic and separated in `snake_logic.js`.
- Rendering and input handling live in `snake.js`.
- A minimal Node.js HTTP server (`server.js`) serves the static files.

## Run locally
1. `cd "/snake"`
2. `npm start`
3. Open `http://localhost:3000`

## Controls
- Move: Arrow keys or WASD
- Pause/Resume: Space or P
- Restart: Button on the game-over overlay

## Files
- `index.html` UI scaffold
- `style.css` minimal styling
- `snake_logic.js` game state + rules
- `snake.js` render loop + controls
- `server.js` Node.js static server
