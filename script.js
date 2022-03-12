const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function toggleClass() {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
}

function restartGame() {
    if (window.confirm('Are you sure?')) {
      startGame();
    } else {
      return;
    }
}

function startScreen() {
  if (playerOneInput.value == "") {
    playerOneInputReq.innerText = `This field is required`
    setTimeout(() => {
      playerOneInputReq.innerText = ``
    }, 5000);
  }

  if (playerTwoInput.value == "") {
    playerTwoInputReq.innerText = `This field is required`
    setTimeout(() => {
      playerTwoInputReq.innerText = ``
    }, 5000);
  }
  
  if (playerOneInput.value !== "" && playerTwoInput.value !== "") {
    const startScreen = document.getElementById("startScreen")
    startScreen.classList.toggle('show')
  }
}

const playerOneInputReq = document.getElementById("playerOneInputReq")
const playerTwoInputReq = document.getElementById("playerTwoInputReq")
const playerOneScoreHTML = document.getElementById("playerOneScore")
const playerTwoScoreHTML = document.getElementById("playerTwoScore")
const playerOneHTML = document.getElementById("playerOne")
const playerTwoHTML = document.getElementById("playerTwo")
const playerOneInput = document.getElementById("playerOneInput")
const playerTwoInput = document.getElementById("playerTwoInput")

var scoreX = 0;
var scoreO = 0;

playerOneScoreHTML.innerText = scoreX
playerTwoScoreHTML.innerText = scoreO

function playerNameUpdate() {
  playerOneHTML.innerText = playerOneInput.value.toUpperCase()
  playerTwoHTML.innerText = playerTwoInput.value.toUpperCase()
}

function increasePoints() {
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  if (currentClass == X_CLASS) {
    scoreX = scoreX + 1;
  } else {
    scoreO = scoreO + 1;
  }
}

function increasePointsUpdate() {
  playerOneScoreHTML.innerText = scoreX;
  playerTwoScoreHTML.innerText = scoreO;
}
