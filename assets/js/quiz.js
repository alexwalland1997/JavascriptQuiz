//import questions from other javascript file
import question from "./question.js";
let questions = question;
//counter for questions and currentscore
let q = 0;
let cScore = 0;

//timer variable and text
let timer = document.querySelector("#time");
timer.textContent = 100;

//variable for start button
let start = document.querySelector("#start");

//variables to access the quiz and make questions show on screen
let quiz = document.querySelector("#question-title");
let answers = document.querySelector("#choices");
let response = document.querySelector("#response");

//highscore section variables
let fScore = document.querySelector("#final-score");
let initials= document.querySelector("#intials");''
let end = document.querySelector("#submit");

start.addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    startQuiz();
});

function startQuiz() {
    nextQuestion();
    document.getElementById("questions").style.display = "block";
    document.getElementById("feedback").style.display = "block";

}

answers.addEventListener("click", function(event) {
    let element = event.target;
    //check if answer is correct and button was pressed
    if (element.matches("button") === true) {
        if (event.target.textContent == questions.question[q][5]){
            response.textContent = 'Well done! you got that question correct';
            cScore++;
        }else {
            response.textContent = 'Unfortunately you got that question wrong';
        }
        q++;
        nextQuestion();
    }
})

//move onto next question whilst there are questions left
function nextQuestion() {
    answers.innerHTML = "";
    if (q < questions.question.length) {
        quiz.textContent = questions.question[q][0];
        for (let i=1; i<5; i++) {
            let button = document.createElement("button");
            button.textContent =  questions.question[q][i];
            answers.appendChild(button);
        }
    } else {
        endGame();
    }

function endGame(){
    //hide quiz and open score and enter intials
    fScore.textContent = cScore.toString();
    document.getElementById("questions").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
}
}
