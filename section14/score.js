var p1Button = document.querySelector("#button1");
var p2Button = document.querySelector("#button2");
var p1Score = 0;
var p2Score = 0;
var p1h1 = document.querySelector("#p1h1");
var p2h1 = document.querySelector("#p2h1");
var resetB = document.querySelector("#reset");
var gameOver = false;
var playingTo = 10;
var scoreInput = document.querySelector("input");
var playingToVal = document.querySelector("#playingTo");

p1Button.addEventListener("click", function() {
    if (!gameOver) {
        p1Score++;
        if (p1Score == playingTo) {
        	gameOver = true;
        	p1h1.classList.add("winner");
        	p2h1.classList.add("loser");
        }
        p1h1.textContent = p1Score;
    }
});

p2Button.addEventListener("click", function() {
    if (!gameOver) {
        p2Score++;
        if (p2Score == playingTo) {
        	gameOver = true;
        	p2h1.classList.add("winner");
        	p1h1.classList.add("loser");
        }
        p2h1.textContent = p2Score;
    }
});


resetB.addEventListener("click", function(){
	p1Score = 0;
	p2Score = 0;
	gameOver = false;
});

scoreInput.addEventListener("change", function(){
	playingTo = scoreInput;
	playingToVal = playingTo;
})

