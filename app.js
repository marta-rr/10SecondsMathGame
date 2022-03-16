// Start the game
// Make the problems : start by +, option to add more;
// Create countdown
// End game if countdown = 0;
// if correct answer = +1 to countdown
// Calculate and show score
// Restart game if countdown = 0
// Keep track of highest score

const problemQuestions = document.querySelector(".questions");
const answerForm = document.querySelector(".answer-form");
const userAnswer = document.querySelector(".user-answer");
const userScore = document.querySelector(".score");
const countdownTimer = document.getElementById("countdown");
const highestScore = document.querySelector(".highest-score");
const inputField = document.querySelector(".input-field");


let gameStatus = {
    score:0,
    highestScore: 0
}


//Start game and displaying problem
function updateProblem(){
    inputField.style.visibility="visible";
    gameStatus.currentProblem = generateProblem();
    problemQuestions.innerHTML = `${gameStatus.currentProblem.numOne} ${gameStatus.currentProblem.operator} ${gameStatus.currentProblem.numTwo}`
    //Clear input field 
    userAnswer.value = "";
    userAnswer.focus();
}


//Generate a number till 10, number could be changed by passing num to the function
function generateNumber(){
    return Math.floor(Math.random() * 10);
}
//Generate problem when game starts and after every answer
function generateProblem(){
    return{
        numOne: generateNumber(),
        numTwo: generateNumber(),
        operator:['+']//[generateNumber(number of operators -1)]
    }
}

answerForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    let correctAnswer;
    const p = gameStatus.currentProblem;
    //todo Make if statements for each operator
    //Calculate it is either right or wrong
    if(p.operator == "+"){
        correctAnswer = p.numOne + p.numTwo;
    }
    //Display either right or wrong, update score, get next problem if right
    if(parseInt(userAnswer.value, 10) === correctAnswer){
       updateProblem();
       gameStatus.score++;
       userScore.innerHTML = "Current Score: " + gameStatus.score;
    } else{
            alert("wrong")
        }
    // endOfGame();
}

//todo make it work only when pressing start button

//Countdown Timer
let timeleft = 10;
function startCountdown(){setInterval(function downloadTimer(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    countdownTimer.innerHTML = "Time is over";
    resetGame()

  }else{
  countdownTimer.innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);
}


function resetGame(){

    if(timeleft == 0){
    gameStatus.highestScore = gameStatus.score;
    gameStatus.score = 0;
    userScore.innerHTML = "Current Score: " + gameStatus.score;
    highestScore.innerHTML = "Highest Score: " + gameStatus.highestScore;
    problemQuestions.innerHTML = "";
    inputField.style.visibility="hidden";
    // timeleft=10;
    // startCountdown();

    }
}
