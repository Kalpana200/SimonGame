var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[],userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
 $(".btn").on("click",function(){
 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);
 animatePress(userChosenColour);
 playSound(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed")
},100);
}
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
