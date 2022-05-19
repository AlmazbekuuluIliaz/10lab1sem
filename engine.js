let t = [null, null, null, null, null, null, null, null, null];

let cellContnet = 1;
let lineColor = "#ddd";
const player = document.getElementById("gamer__move");
const firstPlayerCounter = document.getElementById("num_c");
firstPlayerCounterValue = 0;
const secondPlayerCounter = document.getElementById("num_u");
secondPlayerCounterValue = 0;
playerName = "first";
const rezultText = document.getElementById("rez_text");
let canvas = document.getElementById("tic-tac-toe-board");
let context = canvas.getContext("2d");
let canvasSize = 500;
let sectionSize = canvasSize / 3;
isEndGame = false;
const round = document.getElementById("statistics__round");
roundCounter = 1;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function checkWin() {
  if (t[0] == "x" && t[1] == "x" && t[2] == "x") {
    return true;
  }
  if (t[0] == "o" && t[1] == "o" && t[2] == "o") {
    return true;
  }
  if (t[3] == "x" && t[4] == "x" && t[5] == "x") {
    return true;
  }

  if (t[3] == "o" && t[4] == "o" && t[5] == "o") {
    return true;
  }
  if (t[6] == "x" && t[7] == "x" && t[8] == "x") {
    return true;
  }
  if (t[6] == "o" && t[7] == "o" && t[8] == "o") {
    return true;
  }
  if (t[0] == "x" && t[4] == "x" && t[8] == "x") {
    return true;
  }
  if (t[8] == "o" && t[4] == "o" && t[8] == "o") {
    return true;
  }
  if (t[2] == "x" && t[4] == "x" && t[6] == "x") {
    return true;
  }
  if (t[2] == "o" && t[4] == "o" && t[6] == "o") {
    return true;
  }
  if (t[0] == "o" && t[3] == "o" && t[6] == "o") {
    return true;
  }
  if (t[0] == "x" && t[3] == "x" && t[6] == "x") {
    return true;
  }
  if (t[1] == "o" && t[4] == "o" && t[7] == "o") {
    return true;
  }
  if (t[1] == "x" && t[4] == "x" && t[7] == "x") {
    return true;
  }
  if (t[2] == "o" && t[5] == "o" && t[8] == "o") {
    return true;
  }
  if (t[2] == "x" && t[5] == "x" && t[8] == "x") {
    return true;
  }
}
function checkDraw() {
  isDraw = true;
  for (let i = 0; i < t.length; i++) {
    if (t[i] == null) {
      isDraw = false;
    }
  }
  return isDraw;
}

function addPlayingPiece(mouse) {
  let xCordinate;
  let yCordinate;

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
        mouse.x >= xCordinate &&
        mouse.x <= xCordinate + sectionSize &&
        mouse.y >= yCordinate &&
        mouse.y <= yCordinate + sectionSize
      ) {
        context.fillStyle = "#fff";
        context.fillRect(xCordinate, yCordinate, sectionSize, sectionSize);

        if (cellContnet === 1) {
          drawX(xCordinate, yCordinate);
          t[section] = "x";
        } else {
          drawO(xCordinate, yCordinate);
          t[section] = "o";
        }
      }
    }
  }
}

function drawO(xCordinate, yCordinate) {
  let halfSectionSize = 0.5 * sectionSize;
  let centerX = xCordinate + halfSectionSize;
  let centerY = yCordinate + halfSectionSize;
  let radius = (sectionSize - 100) / 2;
  let startAngle = 0 * Math.PI;
  let endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#000";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX(xCordinate, yCordinate) {
  context.strokeStyle = "#000";

  context.beginPath();

  let offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(
    xCordinate + sectionSize - offset,
    yCordinate + sectionSize - offset
  );

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines(lineWidth, strokeStyle) {
  let lineStart = 4;
  let lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = strokeStyle;
  context.beginPath();
  for (let y = 1; y <= 2; y++) {
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }
  for (let x = 1; x <= 2; x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

function getCanvasMousePosition(event) {
  let rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

canvas.addEventListener("mouseup", function (event) {
  if (!isEndGame) {
    let canvasMousePosition = getCanvasMousePosition(event);
    if (Math.floor(canvasMousePosition.y / 166) == 0) {
      section = Math.floor(canvasMousePosition.x / 166);
    }
    if (Math.floor(canvasMousePosition.y / 166) == 1) {
      section = Math.floor(canvasMousePosition.x / 166) + 3;
    }
    if (Math.floor(canvasMousePosition.y / 166) == 2) {
      section = Math.floor(canvasMousePosition.x / 166) + 6;
    }

    if (t[section] == null) {
      if (cellContnet === 1) {
        cellContnet = 2;
        playerName = "second";
        player.innerHTML = playerName;
      } else {
        cellContnet = 1;
        playerName = "first";
        player.innerHTML = playerName;
      }

      addPlayingPiece(canvasMousePosition);
      if (checkWin()) {
        rezultText.innerHTML = `win ${playerName} gamer`;
        if (playerName == "first") {
          firstPlayerCounter.innerHTML = ++firstPlayerCounterValue;
        } else {
          secondPlayerCounter.innerHTML = ++secondPlayerCounterValue;
        }
        isEndGame = true;
      } else if (checkDraw()) {
        rezultText.innerHTML = `draw`;
        isEndGame = true;
      }
      console.log(t, section);
      drawLines(10, lineColor);
    }
  }
});

document.getElementById("newRound").addEventListener("click", () => {
  if (checkWin() || checkDraw()) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(10, lineColor);
    t = [null, null, null, null, null, null, null, null, null];
    roundCounter++;
    round.innerHTML = roundCounter;
    isEndGame = false;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawLines(10, lineColor);
  t = [null, null, null, null, null, null, null, null, null];
  roundCounter = 1;
  round.innerHTML = roundCounter;
  isEndGame = false;
  firstPlayerCounterValue = 0;
  secondPlayerCounterValue = 0;
  playerName = "first";
  cellContnet = 1;
  firstPlayerCounter.innerHTML = firstPlayerCounterValue;
  secondPlayerCounter.innerHTML = secondPlayerCounterValue;
});
