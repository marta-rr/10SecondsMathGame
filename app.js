// Start the game
// Make the questions : start by +, option to add more;
// Create countdown
// End game if countdown = 0;
// if correct answer = +1 to countdown
// Calculate and show score
// Restart game if countdown = 0

const problemQuestions = document.querySelector(".questions");
const answerForm = document.querySelector(".answer-form");
const userAnswer = document.querySelector(".user-answer");

let gameStatus = {
    score:0,
    wrongAnswers: 0
}

//Start game and displaying problem
function updateProblem(){
    gameStatus.currentProblem = generateProblem();
    problemQuestions.innerHTML = `${gameStatus.currentProblem.numOne} ${gameStatus.currentProblem.operator} ${gameStatus.currentProblem.numTwo}`
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

    if(p.operator == "+"){
        correctAnswer = p.numOne + p.numTwo;
    }
    //todo Make if statements for each operator
    if(parseInt(userAnswer.value, 10) === correctAnswer){
       alert("right")
    } else{
            alert("wrong")
        }
}