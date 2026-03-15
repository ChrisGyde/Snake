(function () {
  "use strict";

  function createInitialState(options) {
    var opts = options || {};
    var gridSize = opts.gridSize || 20;
    var mid = Math.floor(gridSize / 2);
    var snake = [
      { x: 3, y: mid },
      { x: 2, y: mid },
      { x: 1, y: mid }
    ];

    var state = {
      gridSize: gridSize,
      snake: snake,
      direction: { x: 1, y: 0 },
      pendingDirection: { x: 1, y: 0 },
      food: null,
      score: 0,
      isGameOver: false
    };

    state.food = spawnFood(state, opts.rng || Math.random);
    return state;
  }

  function isOpposite(a, b) {
    return a.x === -b.x && a.y === -b.y;
  }

  function setDirection(state, dir) {
    if (!dir || (dir.x === 0 && dir.y === 0)) return state;
    if (isOpposite(state.direction, dir)) return state;
    state.pendingDirection = dir;
    return state;
  }

  function stepState(state, rng) {
    if (state.isGameOver) return state;

    var nextDir = state.pendingDirection || state.direction;
    if (!isOpposite(state.direction, nextDir)) {
      state.direction = nextDir;
    }

    var head = state.snake[0];
    var nextHead = { x: head.x + state.direction.x, y: head.y + state.direction.y };

    if (isWallHit(state.gridSize, nextHead) || isSelfHit(state.snake, nextHead)) {
      state.isGameOver = true;
      return state;
    }

    var newSnake = [nextHead].concat(state.snake);
    var ateFood = state.food && state.food.x === nextHead.x && state.food.y === nextHead.y;

    if (!ateFood) {
      newSnake.pop();
    } else {
      state.score += 1;
      state.food = spawnFood(
        { gridSize: state.gridSize, snake: newSnake },
        rng || Math.random
      );
    }

    state.snake = newSnake;
    return state;
  }

  function isWallHit(gridSize, pos) {
    return pos.x < 0 || pos.y < 0 || pos.x >= gridSize || pos.y >= gridSize;
  }

  function isSelfHit(snake, nextHead) {
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x === nextHead.x && snake[i].y === nextHead.y) {
        return true;
      }
    }
    return false;
  }

  function spawnFood(state, rng) {
    var empty = [];
    for (var y = 0; y < state.gridSize; y++) {
      for (var x = 0; x < state.gridSize; x++) {
        if (!isCellOccupied(state.snake, x, y)) {
          empty.push({ x: x, y: y });
        }
      }
    }

    if (empty.length === 0) return null;
    var pick = Math.floor((rng || Math.random)() * empty.length);
    return empty[pick];
  }

  function isCellOccupied(snake, x, y) {
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) return true;
    }
    return false;
  }

  window.SnakeLogic = {
    createInitialState: createInitialState,
    setDirection: setDirection,
    stepState: stepState
  };
})();
