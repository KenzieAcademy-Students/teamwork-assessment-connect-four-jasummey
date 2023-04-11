// The page loads...
let closePopup = createPopup("Hello!", "Welcome to our popup...");
// Then the popup gets displayed
// After a while, you can call
closePopup();
// This closes the popup.



const placeDisc = function () {}


const checkIfGameHasEnded = function () {
  return false; // It will 
}

const resetBoard = function () {}

const renderBoard = function () {}
  
const afterMove = function () {
  if (checkIfGameHasEnded()) {
    alert("Game Over!")
  } else {
    renderBoard();   
  }
}

const startGame = function () {
  resetBoard();
  placeDisc();
  renderBoard();
}
startGame();


const findSumOfNumbers = function (numbers) {
  let sum = 0;  
  if (numbers) { // adding a check to guard against errors
    for (let number of numbers) {
      sum += number;
    }
  }
  return sum;
}

