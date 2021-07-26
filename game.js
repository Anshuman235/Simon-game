var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; //empty array

var userClickedPattern = [];

var level = 0;

var started = false;


$(document).keydown(function() {

  if(started === false) {

    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;

  }

});


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  // console.log(userClickedPattern);
  animatePress(userChosenColor);
  var lastIndex = (userClickedPattern.length) - 1;
  checkAnswer(lastIndex);

})


function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}


function checkAnswer(currentLevel1) {

  if(userClickedPattern[currentLevel1] === gamePattern[currentLevel1]) {
    // console.log("Sucess");
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }
  }

  else {
    // console.log("Wrong");
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function animatePress(cureentColor) {
  $("." + cureentColor).addClass("pressed");

  setTimeout(function() {
    $("." + cureentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
