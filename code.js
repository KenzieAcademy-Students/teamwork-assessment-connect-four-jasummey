
// Your Code Here.

/***********************************************************************************************************************************
 ******                                                                                                                        *****
 ******     github repo :  teamwork-assessment-connect-four-jasummey                                                           *****
 ******     js filename :  code.js                                                                                             *****
 ******     date        :  April 12, 2023                                                                                      *****
 ******     team members:  Ingrid DeGroot                                                                                      *****
 ******                    Jane Summey                                                                                         *****
 ******                    Kendall Cercone                                                                                     *****
 ******                    Nia Jean-Pierre                                                                                     *****
 ******                    Tim Schultz                                                                                         *****
 ******                                                                                                                        *****
 ******     description:   Connect 4 board game.  6 rows X columns.                                                            *****
 ******                    Players take turns placing individual balls on top of each other on the 6 X 7 board.                *****
 ******                    Player 1 is red and Player 2 is black.                                                              *****
 ******                    First player to get a straight of four either vertically, horizontally, or diagonally wins.         *****
 ******                                                                                                                        *****
 ***********************************************************************************************************************************/
  let player1     = "R"                                       ;
  let player2     = "B"                                       ;
  let currPlayer  = player1                                   ;
  let playerTurn  = document .querySelector   (".turnTracker");
  let startButton = document .getElementById  ("startGame"   );
  let message     = document .querySelector   (".message"    );
  let startScreen = document .querySelector   (".startScreen");
  let gameBoard   = document .querySelector   (".gameBoard"  );
  let columns     = gameBoard.querySelectorAll(".column"     );
  let isGameOver  = false                                     ;
  
  let board = [[0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0]];




//Function to check to see if there is four in a row
  let checkArray = function (array)
  {
      let result = false;
      let discCount = 0;

      array.forEach((element, index) =>
      {
          if (element === currPlayer)
          {
              discCount += 1;
              if (discCount === 4)
              {
                  result = true;
              }
          }
          else
          {
              discCount = 0;
          }
      });

      return result
  }

//Check for game over
  let gameOver = function ()
  {
      isGameOver = true;

      let finalCount = 0;

      for (let innerArray of board)
      {
          if (innerArray.every((value) => value != 0))
          {
              finalCount += 1;
          }
          else
          {
              return false
          }
      }
      if (finalCount === 6)
      {
          message.alert("Game Over!");
          startScreen.classList.remove("hide")
      }
  };

  function startGame()
  {
// start game 
//used arrow function because using a regular function was throwing an error on the term "add"
      startButton.addEventListener("click", () =>
      {
          startScreen.classList.add("hide");  
      })
  }

  startGame()

  function createGameBoard()
  {
      for (let i = 0; i < columns.length; i++)
      {
          let column = columns[i];

          for (let j = 0; j < 6; j++)
          {
              let cell = document.createElement("div");

              cell.classList.add("discSpot");
              cell.setAttribute("row", j);
              cell.setAttribute("col", i);
              column.appendChild(cell);
          }
      }
  }

  createGameBoard();

  function playGame()
  {
      function placeDisc(column)
      {
          for (let row = board.length - 1; row >= 0; row--)
          {
              if (board[row][column] === 0)
              {
                  board[row][column] = currPlayer;
                  let cell = document.querySelector(`[row="${row}"][col="${column}"]`);
                  cell.style.backgroundColor = currPlayer === "R" ? "red" : "black";
                  playerTurn.innerHTML = currPlayer === "R"? "Player Black's turn" : "Player Red's Turn";
                  playerTurn.style.color = currPlayer === "R"? "black" : "red";

                  if (!isGameOver)
                  {
                      checkForWins();
                  }

                  return true;
              }
          }

          return false;
      }

      for (let i = 0; i < columns.length; i++)
      {
          columns[i].addEventListener("click", function ()
          {
              if (!isGameOver)
              {
                  if (placeDisc(i))
                  {
                      currPlayer = currPlayer === "R" ? "B" : "R";
                  }
                  else
                  {
                      playerTurn.innerHTML="This column is full - try another!";
                  }
              }
          });
      }
  }

  playGame();

//Tim Schultz - added 2023.04.12
//check diagonal - upper left to lower right
  function checkFor4DiagUpperLeftToLowerRight()
  {
      const edgeX = board[0].length - 3;
      const edgeY = board   .length - 3;

      for (let y = 0; y < edgeY; y++) 
      {
          for (let x = 0; x < edgeX; x++)
          {
              if (board[y][x] != 0) 
              {
                  if (board[y    ][x    ] === board[y + 1][x + 1] 
                  &&  board[y + 1][x + 1] === board[y + 2][x + 2] 
                  &&  board[y + 2][x + 2] === board[y + 3][x + 3])
                  {
                      playerTurn.innerHTML   = currPlayer === "R"? "Player Red got 4 in a row!" : "Player Black got 4 in a row!";
                      playerTurn.style.color = currPlayer === "R"? "red"                        : "black";
                      
                      gameOver();
                  }
              }
          }
      }
  }

//Tim Schultz - added 2023.04.12
//check diagonal - lower left to upper right
  function checkFor4DiagLowerLeftToUpperRight()
  {
      for (let y = 3; y < board.length; y++)
      {
          for (let x = 0; x < board[0].length -3; x++)
          {
              if (board[y][x] != 0) 
              {
                  if (board[y    ][x    ] === board[y - 1][x + 1]
                  &&  board[y - 1][x + 1] === board[y - 2][x + 2]
                  &&  board[y - 2][x + 2] === board[y - 3][x + 3])
                  {
                      playerTurn.innerHTML   = currPlayer === "R"? "Player Red got 4 in a row!" : "Player Black got 4 in a row!";
                      playerTurn.style.color = currPlayer === "R"? "red"                        : "black";
                      
                      gameOver();
                  }
              }
          }
      }  
  }

//Tim Schultz - added 2023.04.12
//check vertical 
  function checkVertical()
  {
      for (let y = 0; y < board.length - 3; y++)
      {
          for (let x = 0; x < board[0].length; x++)
          {
              if (board[y][x] != 0) 
              {
                  if (board[y    ][x] === board[y + 1][x]
                  &&  board[y + 1][x] === board[y + 2][x]
                  &&  board[y + 2][x] === board[y + 3][x])
                  {
                      playerTurn.innerHTML   = currPlayer === "R"? "Player Red got 4 in a row!" : "Player Black got 4 in a row!";
                      playerTurn.style.color = currPlayer === "R"? "red"                        : "black";

                      gameOver();
                  }
              }
          }
      }
  }


//Tim Schultz - refactored 2023.04.12 from checkForWins() function
//check vertical 
  function checkHorizontal()
  {
      const edgeX = board[0].length - 3;
      const edgeY = board   .length - 3;

      for (let y = 0; y < board.length; y++)
      {
          for (let x = 0; x < edgeX; x++)
          {
              let cell = board[y][x];

              if (cell !== 0)
              {
                  if(cell === board[y][x+1] 
                  && cell === board[y][x+2] 
                  && cell === board[y][x+3]) 
                  {
                      playerTurn.innerHTML   = currPlayer === "R"? "Player Red got 4 in a row!" : "Player Black got 4 in a row!";
                      playerTurn.style.color = currPlayer === "R"? "red"                        : "black";

                      gameOver();
                  }
              }
          }
      }
  }

  function checkForWins()
  {
    if (!isGameOver)
    {
      checkHorizontal()
    }

    if (!isGameOver)
    {
      checkVertical();
    }

    if (!isGameOver)
    {
      checkFor4DiagUpperLeftToLowerRight();
    }

    if (!isGameOver)
    {
      checkFor4DiagLowerLeftToUpperRight();
    }
  }
