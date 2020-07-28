var gamepattern = [];
var started = false;
var level = 0;
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
  if (!started) {
    $("#level-title").html("level" + level);
    newsequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkanswer(userClickedPattern.length - 1);
});

function checkanswer(currentlevel) {
  if (gamepattern[currentlevel] === userClickedPattern[currentlevel]) {
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        newsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");

    startover();
  }
}

function newsequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").html("level " + level);

  var randomnumber = Math.floor(Math.random() * 4);

  var randomchosencolor = buttonColors[randomnumber];

  gamepattern.push(randomchosencolor);

  $("#" + randomchosencolor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomchosencolor);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function startover() {
  level = 0;
  gamepattern = [];
  started = false;
}
