//get scores from local storage
let scores = JSON.parse(localStorage.getItem("hiScores"));

let reset = document.querySelector("#clear");

//grab section to store high scores
let sTable = document.querySelector("#highscores");
console.log(scores);
//start with initalise function
init();

function init() {
    for (let i=0; i<scores.length; i++) {
        var score = scores[i];

         if (score.cScore > 0) {
            var li = document.createElement("li");
            li.textContent = score.name + " - " + score.cScore;

            sTable.append(li);
        }
    }
}

reset.addEventListener("click", function() {
   scores.length = 0;
   localStorage.setItem('hiScores', JSON.stringify(scores));
   sTable.innerHTML = "";
})
