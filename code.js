
// Your Code Here.

let player1 = "R";
let player2 = "B";
let currPlayer = player1;
let playerTurn = document.getElementsByClassName("turnTracker");
let startButton = document.getElementById("startGame")
let message = document.getElementsByClassName("message")
let startScreen = document.getElementsByClassName("startScreen")
let gameBoard = document.querySelector(".gameBoard")
let columns = gameBoard.querySelectorAll(".column")

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
//adds the players token to the page
function discToken(){
    board[i][j] = currPlayer
    let disc = this;
    if(currPlayer === player1){
        disc.classList.add("playerRed");
        currPlayer === player2
    } else {
        disc.classList.add("playerBlack")
        currPlayer === player1
    }
}
playerTurn.innerHTML = currPlayer

//Other option to add game disc
//for(let i = 0; i < board.length; i = i +1){
    // board[i].onclick = () => {
    //     if(currPlayer === player1) {
    //         board[i].classList.add("playerRed")
    //         currPlayer = player2
    //         playerTurn.innerHTML = currPlayer
    //     } else if (currPlayer === player2){
    //         board[i].classList.add("playerBlack")
    //     currPlayer = player1    
    //     playerTurn.innerHTML = currPlayer
    // }
    // }


//Function to check to see if there is four in a row
let checkArray = function (array) {
    let result = false;
    let discCount = 0;
    array.forEach((element, index) => {
        if(element === currPlayer){
            discCount += 1;
            if(discCount === 4){
                result = true;
            }
        }
        else {
            discCount = 0;
        }
    });
    return result
}

//Check for game over

let gameOver = function(){
    let finalCount = 0;
    for(let innerArray of board){
        if (innerArray.every((value) => value != 0)) {
            finalCount += 1;
        } else {
            return false
        }
    }
    if(finalCount === 6){
        message.alert("Game Over!");
        startScreen.classList.remove("hide")
    }
};

function startGame() {
    startScreen.destroy();
    startButton.destroy();
}

// start game 
//used arrow function because using a regular function was throwing an error on the term "add"
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    startGame();  
});


function createGameBoard (){
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        for (let j = 0; j < 6; j++) {
          let cell = document.createElement("div");
          cell.classList.add("discSpot");
          cell.setAttribute("row", j);
          cell.setAttribute("col", i);
          column.appendChild(cell);
        }
      }
    }

createGameBoard();

function playGame () {
    function placeDisc(column) {
      for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][column] === 0) {
          board[row][column] = currPlayer;
          let cell = document.querySelector(`[row="${row}"][col="${column}"]`);
          cell.style.backgroundColor = currPlayer === "R" ? "red" : "black";
          playerTurn.innerHTML = currPlayer === "R"? "Player Black's turn" : "Player Red's Turn";
          playerTurn.style.color = currPlayer === "R"? "black" : "red";
          //insertcheckForWins here
          checkForWins();
          return true;
        }
      }
      return false;
    }
    for (let i = 0; i < columns.length; i++) {
      columns[i].addEventListener("click", function() {
        if (placeDisc(i)) {
          currPlayer = currPlayer === "R" ? "B" : "R";
        } else {
          playerTurn.innerHTML="This column is full - try another!";
        }
      });
    }
  }
  playGame();
  
  function checkForWins () {
  const edgeX = board[0].length - 3;
  const edgeY = board.length - 3;
  for(let y = 0; y < board.length; y++){
    for(let x = 0; x < edgeX; x++) {
      let cell = board[y][x];
      if(cell !== 0) {
        if(cell === board[y][x+1] && cell === board[y][x+2] && cell === board[y][x+3]) {
          playerTurn.innerHTML = currPlayer === "R"? "Player Red got 4 in a row!" : "Player Black got 4 in a row!"
          playerTurn.style.color = currPlayer === "R"? "red" : "black";
          gameOver();
        }
      }
    }
  }
  }