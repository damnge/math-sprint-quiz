// First we need to acces all our elements from HTML that we will use to manipulate the DOM
// There is a lot of them so they are all divided on each particular divisions:

// Main Pages
const onboardingPage = document.getElementById("onboarding-page");
const splashPage = document.getElementById("splash-page");
const countdownPage = document.getElementById("countdown-page");
const gamePage = document.getElementById("game-page");
const scorePage = document.getElementById("score-page");

// Onboarding Page
const onboardForm = document.getElementById("onboarding-form");

// Splash Page
const introTitle = document.querySelector(".introduction");
const startForm = document.getElementById("start-form");
const radioContainers = document.querySelectorAll(".radio__container");
const radioInputs = document.querySelectorAll("input");
const bestScores = document.querySelectorAll(".best-score-value");

// Countdown Page
const countdown = document.querySelector(".countdown");

// Game Page
const itemContainer = document.querySelector(".item__container");

// Score Page
const finalTimeEl = document.querySelector(".final__time");
const baseTimeEl = document.querySelector(".base__time");
const penaltyTimeEl = document.querySelector(".penalty__time");

// Button
const playAgainBtn = document.querySelector(".play__again");

// Global empty variables:

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = "0.0";

// Scroll Y
let valueY = 0;

// Refresh Splash Page Best Scores
function bestScoresToDOM() {
  bestScores.forEach((bestScore, index) => {
    const bestScoreEl = bestScore;
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
  });
}

// Check Local Storage for Best Scores, Set bestScoreArray
function getSavedBestScores() {
  if (localStorage.getItem("bestScores")) {
    // When we try to getItem from local storage we use parse() method to get information from JSON file as all information over there are stored in strings
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else {
    bestScoreArray = [
      { questions: 10, bestScore: finalTimeDisplay },
      { questions: 25, bestScore: finalTimeDisplay },
      { questions: 50, bestScore: finalTimeDisplay },
      { questions: 99, bestScore: finalTimeDisplay },
    ];
    // When we setItem to localStorage to add it to JSON file we need to use stringify() method that change type of the data to the string
    localStorage.setItem("bestScores", JSON.stringify(bestScoreArray));
  }
  bestScoresToDOM();
}

// Update Best Score Array
function updateBestScore() {
  bestScoreArray.forEach((score, index) => {
    // Select correct Best Score to update
    if (questionAmount == score.questions) {
      // Return Best Score as number with one decimal
      const savedBestScore = Number(bestScoreArray[index].bestScore);
      // Update if the new final score is less or replacing zero
      if (savedBestScore === 0 || savedBestScore > finalTime) {
        bestScoreArray[index].bestScore = finalTimeDisplay;
      }
    }
  });
  // Update Splash Page
  bestScoresToDOM();
  // Save to Local Storage
  localStorage.setItem("bestScores", JSON.stringify(bestScoreArray));
}

//Reset Game
// in this function we need to reset some of our settings
function playAgain() {
  // bring back the click event to the gamePage that let us start the timer
  gamePage.addEventListener("click", startTimer);
  // hide score page and show the splash page
  showAndHide(splashPage, scorePage);
  // reset values of those varialbles to empty and 0
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  // Hide the play again button
  playAgainBtn.hidden = true;
}

// Show Score Board, Hide Game Page and after delay of 1 sec show Play Again Button
function showScorePage() {
  // Show Play Again button after 1 second delay
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  showAndHide(scorePage, gamePage);
}

// Format & Display Time in DOM
function scoresToDOM() {
  // We use toFixed() method to pass the value with just 1 number after decimal
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  updateBestScore();
  // Scroll to Top, go to Score Page
  itemContainer.scrollTo({ top: 0, behavior: "instant" });
  showScorePage();
}

// Stop Time, Process Results, go to Score Page
function checkTime() {
  // when the number of guess of player are equal to the selected question amount we need to clear interval of our timer
  if (playerGuessArray.length == questionAmount) {
    clearInterval(timer);
    // check for wrong guess and add penalty time if the answer is wrong
    equationsArray.forEach((equation, index) => {
      if (equation.evaluated === playerGuessArray[index]) {
        // Those are correct guess so no penalty is added
      } else {
        // Incorect guess so we add 0.5s of penalty
        penaltyTime += 0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    scoresToDOM();
  }
}

// function that add 0.1 second to our timePlayed counter
function addTime() {
  timePlayed += 0.1;
  checkTime();
}

// Start timer when game page is clicked
function startTimer() {
  // every time we staret again we need to reset values of our variables
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  // we need to remove the event listener from the game page so it doesn't start our start timer everytime we click on the answer
  gamePage.removeEventListener("click", startTimer);
}

// Scroll, store user selection in playerGuessArray
function select(guessedTrue) {
  // Scroll 80 pixels adding it to value of our valueY
  valueY += 80;
  // After choosing the answer the selected containter (highlighted stripe) will move according to the sum of "valueY"
  itemContainer.scroll(0, valueY);
  // Add player guess to array using ternary operator if the player guessed correct add true to the array if not push false
  return guessedTrue
    ? playerGuessArray.push("true")
    : playerGuessArray.push("false");
}

// Displays our Game Page
function showGamePage() {
  showAndHide(gamePage, countdownPage);
}

// Get Random Number up to a max number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log("correct:", correctEquations);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  console.log("wrong:", wrongEquations);
  // Loop through, multiply random numbers up to 9(we choose 9 to not make those correct equations not too complicated).
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    // then we will be creating a simple equation, first number x secondnumber and having also a value of this equation
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    // in our object we will store the value and evaluation to true, we will need that later to detarmine if player selected a correct answer
    equationObject = { value: equation, evaluated: "true" };
    equationsArray.push(equationObject);
  }
  // // Loop through, mess with the equation results, and push to our equation array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    // in this example we will do similar thing but we will on purpuse mess with the numbers to create wrong results of equation
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    // then randomly we will choose 1 out of 3 wrong equation format
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: "false" };
    equationsArray.push(equationObject);
  }
  // we use our shuffle function that we store in shuffle.js file so we can mix our equationsArray
  shuffle(equationsArray);
}

// add Equations to DOM
function equationsToDOM() {
  equationsArray.forEach((equation) => {
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Equation Text
    const equationText = document.createElement("h1");
    equationText.textContent = equation.value;
    // Inside of created div "item" element we append the child of h1 "equationText"
    item.appendChild(equationText);
    // then inside of itemContainer in our HTML we append the item
    itemContainer.appendChild(item);
  });
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = "";
  // Spacer
  const topSpacer = document.createElement("div");
  topSpacer.classList.add("height-240");
  // Selected Item
  const selectedItem = document.createElement("div");
  selectedItem.classList.add("selected__item");
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();

  // Set Blank Space Below
  const bottomSpacer = document.createElement("div");
  bottomSpacer.classList.add("height-500");
  itemContainer.appendChild(bottomSpacer);
}

// Function that displays 3, 2, 1, GO! with setInterval method

function countdownStart() {
  let count = 3;
  countdown.textContent = count;
  const timeCountDown = setInterval(() => {
    count--;
    if (count === 0) {
      countdown.textContent = "GO!";
    } else if (count === -1) {
      showGamePage();
      clearInterval(timeCountDown);
    } else {
      countdown.textContent = count;
    }
  }, 1000);
}

// Navigate from Splash Page to Countdown Page on Start Game Button by switching hidden to false and true
function showCountdown() {
  showAndHide(countdownPage, splashPage);
  countdownStart();
  populateGamePage();
}

// Get the value from selected radio button
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}

// Form that decides amount of questions
function selectQuestionAmount(e) {
  // we are using a preventDefault method to stop website from reseting and submiting the form
  e.preventDefault();
  questionAmount = getRadioValue();
  if (questionAmount) {
    showCountdown();
  }
}

// Adding click event listener that let us select different Radio Inputs that sotores number of questions
startForm.addEventListener("click", () => {
  radioContainers.forEach((radioEl) => {
    // At the beginning remove selected label styling
    radioEl.classList.remove("selected__label");
    // add selected label back if radio input is checked
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected__label");
    }
  });
});

// On our Onboarding Page we ask for the name/nickname of the player by clicking submit button we are passing this value to the local storage
function addPlayerName(e) {
  // we prevent the website to realod on clicking the submit button
  e.preventDefault();
  let username = onboardForm.name.value;
  // if the username input is empty display alert
  if (username.trim() === "") {
    alert("Please choose your nickname!");
  } else {
    // and if the name was passed sucessfully hide Onboarding Page and show splashPage
    showAndHide(splashPage, onboardingPage);
    // also pass the username to the localStorage using setItem
    localStorage.setItem("playerName", username);
    // call nameToDOM function in the end
    nameToDOM();
  }
}

// Display the name of the player to the DOM
function nameToDOM() {
  let username = localStorage.getItem("playerName");
  introTitle.textContent = `Hi ${username}, let's play!`;
}

// Function that helps us show and hide different pages so we don't need to reapte ourself in code
function showAndHide(showPage, hidePage) {
  showPage.hidden = false;
  hidePage.hidden = true;
}

// Hide Onboarding Page if the name of the player is in the local storage otherwise show it so player can put their name
function hideOnboardingPage() {
  if (localStorage.getItem("playerName")) {
    showAndHide(splashPage, onboardingPage);
  } else {
    showAndHide(onboardingPage, splashPage);
  }
}

// Event Listeners
onboardForm.addEventListener("submit", addPlayerName);
startForm.addEventListener("submit", selectQuestionAmount);
gamePage.addEventListener("click", startTimer);
playAgainBtn.addEventListener("click", playAgain);

// Functions that are called on Load
getSavedBestScores();
nameToDOM();
hideOnboardingPage();
