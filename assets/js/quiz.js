//import questions from other javascript file
import question from "./question.js";
let questions = question;
//counter for questions and currentscore
let q = 0;
let cScore = 0;
let tCounter;
let timer2;

//load high scores
let hScore = [];

//timer variable and quiz finished variable
let timer = document.querySelector("#time");
let finished;

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
    let lHScore = JSON.parse(localStorage.getItem("hiScores"));

    if (lHScore !== null) {
        hScore = lHScore;
    }
}

start.addEventListener("click", function() {
    finished = false;
    tCounter = 60;
    document.getElementById("start-screen").style.display = "none";
    startQuiz();
    startTimer();
});

function startQuiz() {
    nextQuestion();
    document.getElementById("questions").style.display = "block";
    document.getElementById("feedback").style.display = "block";

}

//have counter count down
function startTimer() {
    timer2 = setInterval(function(){
        tCounter--;
        timer.textContent = tCounter;
        if (tCounter < 0) {
            clearInterval(timer2);
            endGame();
        }
    }, 1000)
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
            tCounter -=5;
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
}

function endGame(){
    //hide quiz and open score and enter intials
    clearInterval(timer2);
    fScore.textContent = cScore.toString();
    document.getElementById("questions").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
}

end.addEventListener("click", function() {
    let name = initials.value.trim();
    //check if array limit has been met
    if (hScore.length < 5) {
        hScore.push({name, cScore});
        //check highscore is higher than lowest one
    } else if (hScore[4].cScore < cScore) {
        hScore.pop();
        hScore.push({name, cScore});
    }

    //sort highscores into order
    hScore.sort((a,b) => a.cScore > b.cScore ? -1:1);
    localStorage.setItem('hiScores', JSON.stringify(hScore));
    window.location.href = "highscores.html";
})
