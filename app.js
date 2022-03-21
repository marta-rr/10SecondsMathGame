const problemQuestions = document.querySelector(".questions");
const answerForm = document.querySelector(".answer-form");
const userAnswer = document.querySelector(".user-answer");
const userScore = document.querySelector(".score");
const countdownTimer = document.getElementById("seconds");
const countdownDeco = document.getElementById("countdown");
const highestScore = document.querySelector(".highest-score");
const inputField = document.querySelector(".input-field");
const startGame = document.querySelector(".start-game");
const scoreBoard = document.querySelector(".score-board");


let gameStatus = {
    score:0,
    highestScore: 0
}


//Start game and displaying problem
function updateProblem(){
    startGame.style.visibility="hidden";
    inputField.style.visibility="visible";
    scoreBoard.style.visibility="visible";
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
        timeLeft++;
        updateProblem();
        gameStatus.score++;
        userScore.innerHTML = "Current Score: " + gameStatus.score;
    }else{
        userAnswer.value = "";
        userAnswer.focus();
    }
}

//Countdown Timer
let timeLeft=11;
function countdown() {
    countdownTimer.style.visibility ="visible";
    countdownDeco.style.visibility ="visible";
	timeLeft--;
	countdownTimer.innerHTML = timeLeft;
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	} else{
        resetGame();
    }
};

//When countdown = 0
function resetGame(){
    timeLeft=11;
    gameStatus.highestScore = gameStatus.score;
    gameStatus.score = 0;
    userScore.innerHTML = "Current Score: " + gameStatus.score;
    highestScore.innerHTML = "Highest Score: " + gameStatus.highestScore;
    problemQuestions.innerHTML = "";
    inputField.style.visibility="hidden";
    startGame.style.visibility="visible";
}
