
var gameOn = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];


$(document).on('keypress',function() {
  if(!gameOn){        
    nextSequence();
    var gameOn = true;
  }
});


$(".btn").click(function() {
  
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    }
  }


function nextSequence() {
  
  userClickedPattern = [];
  
  level++;
  $("h1").html("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  animatePress(randomChosenColour);
  
  playSound(randomChosenColour);
  
  
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameOn = false;
}

//funtion to play the sounds
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//function to animate the colors
function animatePress(currentColor){
  $("#" + currentColor).addClass( "pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 200); 
}

