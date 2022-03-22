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
const operatorOptions = document.querySelector(".operator-options");
const operatorSum = document.getElementById("myCheck+");
const operatorSub = document.getElementById("myCheck-");
const operatorMult = document.getElementById("myCheckx");
const operatorDiv = document.getElementById("myCheck/");
const rangeNumber = document.getElementById("range-number");
const rangeBar = document.querySelector(".range-bar");




let gameStatus = {
    score:0,
    //Keep track of max score value
    currentScore: 0,
    highestScore: 0
}


//Start game and displaying problem
function updateProblem(){
    rangeBar.style.visibility = "hidden";
    startGame.style.visibility="hidden";
    inputField.style.visibility="visible";
    scoreBoard.style.visibility="visible";
    gameStatus.currentProblem = generateProblem();
    problemQuestions.innerHTML = `${gameStatus.currentProblem.numOne} ${gameStatus.currentProblem.operator} ${gameStatus.currentProblem.numTwo}`
    //Clear input field
    userAnswer.value = "";
    userAnswer.focus();
}

function updateTextInput(val){
    document.getElementById('textInput').value = val;
}

function getMaxNumber(){
    return document.getElementById('textInput').value;
}


//Generate random Number up to input user preference
function generateNumber(maxNumber){
    return Math.floor(Math.random() * maxNumber);
}


//Generate problem when game starts and after every answer
function generateProblem(){
    let problem = {
        numOne: generateNumber(getMaxNumber()),
        numTwo: generateNumber(getMaxNumber()),
        operator:getUserOperators()[generateNumber(getUserOperators().length)]
    }
    if(problem.operator === '-' && ((problem.numOne - problem.numTwo) < 0)){
        let temp = problem.numOne;
        problem.numOne = problem.numTwo;
        problem.numTwo = temp;
    }
    while(problem.operator === '/' && ((problem.numOne % problem.numTwo) !== 0)){
        problem.numOne = generateNumber(getMaxNumber());
        problem.numTwo = generateNumber(getMaxNumber());
    }
    return problem;
}

function getUserOperators(){
    let operators = []
    if(operatorSum.checked){
        operators.push('+');
    }
    if(operatorSub.checked){
        operators.push('-');
    }
    if(operatorDiv.checked){
        operators.push('/');
    }
    if(operatorMult.checked){
        operators.push('x');
    }
    return operators;
}


answerForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    let correctAnswer;
    const p = gameStatus.currentProblem;
    //Calculate it is either right or wrong
    if(p.operator == "+"){
        correctAnswer = p.numOne + p.numTwo;
    }
    else if(p.operator == "-"){
        correctAnswer = p.numOne - p.numTwo;
    }
    else if(p.operator == "/"){
        correctAnswer = p.numOne / p.numTwo;
    }
    else if(p.operator == "x"){
        correctAnswer = p.numOne * p.numTwo;
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
//Resetting timer
    timeLeft=11;
//Getting highest Score
    let sliced = Object.fromEntries(
        Object.entries(gameStatus).slice(0, 3)
    )
    let values = Object.values(sliced);
    let max = Math.max(...values);
    gameStatus.currentScore = max;
//Resetting Score
    gameStatus.score = 0;
//Displaying on DOM
    rangeBar.style.visibility = "visible";
    userScore.innerHTML = "Current Score: " + gameStatus.score;
    highestScore.innerHTML = "Highest Score: " + gameStatus.currentScore;
    problemQuestions.innerHTML = "";
    inputField.style.visibility="hidden";
    startGame.style.visibility="visible";
}

