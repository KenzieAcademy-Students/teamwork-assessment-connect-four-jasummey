
// Your Code Here.

let player1 = "R";
let player2 = "B";
let currPlayer = player1;
let playerTurn = document.getElementsByClassName("turnTracker");
let startButton = document.getElementById("startGame")
let message = document.getElementsByClassName("message")
let startScreen = document.getElementsByClassName("startScreen")

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
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


// start game 
//used arrow function because using a regular function was throwing an error on the term "add"
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    startGame();  
});