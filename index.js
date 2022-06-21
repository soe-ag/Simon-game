/*
0. wait for anykey to start/restart
1. random number > flick > store that number in array
2. wait for event click > wrong > gameover
2.1. true
3. random number > flick > array.push
3. wait for event click > true > true > random number flick


*/
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(document).keypress(function(){
  if(!started){
    $("level-title").text("Levle "+level);
    nextSequence();
    started =true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
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

function startOver(){
  level=0;
  gamePattern = [];
  started =false;
}

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);             //random number
  var randomChosenColour = buttonColours[randomNumber];       //random number to colour
  gamePattern.push(randomChosenColour);                       //add to array
  $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //fade in fade out
  playSound(randomChosenColour);

}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");     //audio play
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}



//
//
// $("#randomChosenColour").click(function(){
//   makingSound(btn);
// });
//
//
// function makingSound(key) {
//   switch (key) {
//     case green:
//       var greenS = new Audio("sounds/green.mp3");
//       greenS.play();
//       break;
//     case red:
//       var redS = new Audio("sounds/red.mp3");
//       redS.play();
//       break;
//     case yellow:
//       var yellowS = new Audio("sounds/yellow.mp3");
//       yellowS.play();
//       break;
//     case blue:
//       var blueS = new Audio("sounds/blue.mp3");
//       blueS.play();
//       break;
//     default:console.log();
//   }
//
// }
