//import questions from other javascript file
import question from "./question.js";
let questions = question;
//counter for questions and currentscore
let q = 0;
let cScore = 0;
let tCounter;

//load high scores
let hScore = [];

//timer variable and text
let timer = document.querySelector("#time");

//variable for start button
let start = document.querySelector("#start");

//variables to access the quiz and make questions show on screen
let quiz = document.querySelector("#question-title");
let answers = document.querySelector("#choices");
let response = document.querySelector("#response");

//highscore section variables
let fScore = document.querySelector("#final-score");
let initials  = document.querySelector("#initials");''
let end = document.querySelector("#submit");

//call initialise function
init();

//set high score to local storage high score if there is any
function init(){
    let lHScore = JSON.parse(localStorage.getItem("hScore"));

    if (lHScore !== null) {
        hScore = lHScore;
    }
}

start.addEventListener("click", function() {
    tCounter = 60;
    timer.textContent = tCounter;
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

end.addEventListener("click", function(event) {
    let name = initials.value.trim();
    if (hScore.length == 0  || hScore.length < 5) {
        hScore.push({name, cScore});
    } else if (hScore[4].cScore < cScore) {
        hScore.pop();
        hScore.push({name, cScore});
    }

    hScore.sort((a,b) => a.cScore > b.cScore ? -1:1);
    localStorage.setItem('hiScores', JSON.stringify(hScore));
    console.log(hScore);
    window.location.href = "highscores.html";
})
}
