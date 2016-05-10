var colors = generateRandomColors(6);
var numSquares = 6;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var pickedColor = pickColor();
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easyBtn");
var hardButton = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {

    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.background;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                messageDisplay.textContent = "Guess Again!";
                this.style.background = "#232323"
            }
        })
    }
}


function reset() {
    colors = generateRandomColors(numSquares);
    //Pick new random color
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];

        } else {
            squares[i].style.display = "none";
        }

        h1.style.background = "steelblue";
    }
}

resetButton.addEventListener("click", function() {
    reset();
})


function changeColors(color) {
    //loop all squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);

    return colors[random];
}

function generateRandomColors(num) {
    //Make array
    var newColors = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color, and push to array;
        newColors.push(randomColor());
    }
    //return array
    return newColors;
}

function randomColor() {
    //pick a "red" from 0-255
    var red = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var green = Math.floor(Math.random() * 256);

    //pick a "blue" from 0-255
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
