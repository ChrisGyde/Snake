(function () {
  "use strict";

  var board = document.getElementById("board");
  var scoreEl = document.getElementById("score");
  var overlay = document.getElementById("overlay");
  var overlayTitle = document.getElementById("overlay-title");
  var overlayMessage = document.getElementById("overlay-message");
  var restartBtn = document.getElementById("restart");
  var pauseBtn = document.getElementById("pause");
  var controlButtons = document.querySelectorAll("[data-dir]");

  var state = SnakeLogic.createInitialState();
  var interval = null;
  var isPaused = false;
  var tickMs = 140;
  var cells = [];

  function buildBoard() {
    board.innerHTML = "";
    cells = [];
    var total = state.gridSize * state.gridSize;
    for (var i = 0; i < total; i++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cells.push(cell);
      board.appendChild(cell);
    }
  }

  function coordToIndex(x, y) {
    return y * state.gridSize + x;
  }

  function render() {
    for (var i = 0; i < cells.length; i++) {
      cells[i].classList.remove("snake", "food");
    }

    for (var s = 0; s < state.snake.length; s++) {
      var part = state.snake[s];
      var idx = coordToIndex(part.x, part.y);
      if (cells[idx]) cells[idx].classList.add("snake");
    }

    if (state.food) {
      var foodIdx = coordToIndex(state.food.x, state.food.y);
      if (cells[foodIdx]) cells[foodIdx].classList.add("food");
    }

    scoreEl.textContent = String(state.score);
  }

  function showOverlay(title, message) {
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    overlay.classList.remove("hidden");
  }

  function hideOverlay() {
    overlay.classList.add("hidden");
  }

  function gameTick() {
    if (isPaused) return;
    state = SnakeLogic.stepState(state);
    render();
    if (state.isGameOver) {
      stopLoop();
      showOverlay("Game Over", "Press Restart to play again.");
    }
  }

  function startLoop() {
    if (interval) return;
    interval = setInterval(gameTick, tickMs);
  }

  function stopLoop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restartGame() {
    state = SnakeLogic.createInitialState();
    isPaused = false;
    pauseBtn.textContent = "Pause";
    hideOverlay();
    buildBoard();
    render();
    startLoop();
  }

  function togglePause() {
    if (state.isGameOver) return;
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    if (isPaused) {
      showOverlay("Paused", "Press Space or Resume to continue.");
    } else {
      hideOverlay();
    }
  }

  function handleDirection(dir) {
    SnakeLogic.setDirection(state, dir);
  }

  function keyToDir(key) {
    switch (key) {
      case "ArrowUp":
      case "w":
      case "W":
        return { x: 0, y: -1 };
      case "ArrowDown":
      case "s":
      case "S":
        return { x: 0, y: 1 };
      case "ArrowLeft":
      case "a":
      case "A":
        return { x: -1, y: 0 };
      case "ArrowRight":
      case "d":
      case "D":
        return { x: 1, y: 0 };
      default:
        return null;
    }
  }

  document.addEventListener("keydown", function (event) {
    var dir = keyToDir(event.key);
    if (dir) {
      event.preventDefault();
      handleDirection(dir);
      return;
    }
    if (event.key === " " || event.key === "p" || event.key === "P") {
      event.preventDefault();
      togglePause();
    }
  });

  restartBtn.addEventListener("click", restartGame);
  pauseBtn.addEventListener("click", togglePause);

  controlButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dir = btn.getAttribute("data-dir");
      if (dir === "up") handleDirection({ x: 0, y: -1 });
      if (dir === "down") handleDirection({ x: 0, y: 1 });
      if (dir === "left") handleDirection({ x: -1, y: 0 });
      if (dir === "right") handleDirection({ x: 1, y: 0 });
    });
  });

  buildBoard();
  render();
  startLoop();
})();
