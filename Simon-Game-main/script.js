let started = false;
let level = 0;

let gameSequence = [];
let userSequence = [];

let buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keydown", gameStart);
$(document).on("tap", gameStart);


function gameStart() {
  if (started === false) {
    $("#level-title").text("level " + level);
    nextColor();
    started = true;
  }
}

function nextColor() {
  userSequence = [];
  level++;
  $("#level-title").text("level " + level);
  let num = Math.floor(Math.random() * 4);
  let randomColor = buttonColours[num];
  gameSequence.push(randomColor);
  console.log(gameSequence);
  makeSound(randomColor);
}

function makeSound(color) {
  let sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
  animateButton(color);
}

function animateButton(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
}

$(".btn").on("click", currentGame);
$(".btn").on("tap", currentGame);


function currentGame() {
  let userColor = $(this).attr("id");
  makeSound(userColor);
  userSequence.push(userColor);
  console.log(userSequence);

  checkSequence(userSequence.length - 1);
}

function checkSequence(currentLevel) {
  if (userSequence[currentLevel] === gameSequence[currentLevel]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(() => {
        nextColor();
      }, 500);
    }
  } 
  else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
    level = 0;
    gameSequence = [];
    started = false;
  }
