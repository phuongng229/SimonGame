var allColors = $(".btn");
var random;
var gameOver = false;
var gameStart = false;
var play = [];
var pattern = [];

$(document).keydown(function (event) {
  if (gameStart && !gameOver) {
    return;
  }

  if (event.key === "a" || event.key === "A") {
    resetGame();
    startGame();
  }
});

function resetGame() {
  play.length = 0;
  pattern.length = 0;
  gameStart = true;
  gameOver = false;
}

//Start the sequence
function startGame() {
  if (!gameOver) {
    random = Math.random() * 4;
    random = Math.floor(random);
    console.log(random);
    $("#level-title").text("Level " + (pattern.length + 1));
    pushIntoPattern(random);
    console.log(pattern);
    playPattern();
    play.length = 0;
  } else {
    gameEnd();
  }
}

//Detecting button press
for (var j = 0; j < allColors.length; j++) {
  allColors[j].addEventListener("click", function () {
    if (!gameOver) {
      play.push(this.id);
      makeSound(this.id);
      buttonAnimationUser(this.id);
      let i = play.length - 1;
      console.log(play);
      //compare immediately between pattern[i] and play[i]
      if (play[i] !== pattern[i]) {
        gameOver = true;
        gameOverAnimation(this.id);
        gameEnd();
        return;
      }

      if (play.length === pattern.length) {
        setTimeout(startGame, 1000);
      }
    } else {
      gameOverAnimation(this.id);
      makeSound(this.id);
      buttonAnimationUser(this.id);
      return;
    }
  });
}

function gameEnd() {
  gameOver = true;
  gameStart = false;
  $("#level-title").text("Game Over, please press A key to replay!");
}

function pushIntoPattern(random) {
  if (random === 0) {
    pattern.push("green");
  } else if (random === 1) {
    pattern.push("red");
  } else if (random === 2) {
    pattern.push("yellow");
  } else if (random === 3) {
    pattern.push("blue");
  }
}

function flashPattern(color) {
  $("#" + color)
    .animate({ opacity: 0.1 }, 100)
    .animate({ opacity: 1 }, 100);
  makeSound(color);
}

function playPattern() {
  for (let i = 0; i < pattern.length; i++) {
    setTimeout(function () {
      flashPattern(pattern[i]);
    }, i * 400);
  }
}

function gameOverAnimation(color) {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 220);
}

function buttonAnimationUser(color) {
  if (color === "green") {
    $("#green").addClass("pressed");

    setTimeout(function () {
      $("#green").removeClass("pressed");
    }, 100);
  } else if (color === "red") {
    $("#red").addClass("pressed");

    setTimeout(function () {
      $("#red").removeClass("pressed");
    }, 100);
  } else if (color === "yellow") {
    $("#yellow").addClass("pressed");

    setTimeout(function () {
      $("#yellow").removeClass("pressed");
    }, 100);
  } else if (color === "blue") {
    $("#blue").addClass("pressed");

    setTimeout(function () {
      $("#blue").removeClass("pressed");
    }, 100);
  }
}

function makeSound(color) {
  switch (color) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    default:
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
  }
}
