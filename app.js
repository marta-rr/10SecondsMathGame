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


let gameStatus = {
    score:0,
    wrongAnswers: 0
}

//Start game and displaying problem
function updateProblem(){
    gameStatus.currentProblem = generateProblem();
    problemQuestions.innerHTML = `${gameStatus.currentProblem.numOne} ${gameStatus.currentProblem.operator} ${gameStatus.currentProblem.numTwo}`
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
       userScore.innerHTML = gameStatus.score;
       //todo Clear input field
    } else{
            gameStatus.wrongAnswers++;
            alert("wrong")
        }
    // endOfGame();
}

// function endOfGame(){
//     if(countdown == 0){

//     }
// }