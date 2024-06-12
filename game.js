

var buttoncolours = ["red","blue","green","yellow"];

var gamePattern =[];

var userClickedPattern = [];

var level = 0;
var start = false;
$(document).on("keypress",function(){
  if(!start){
  
    $("h1").text("Level "+level);
    nextSequence();
    start = true;
  }
});

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnwer(userClickedPattern.length - 1);
});





function checkAnwer(currentlevel){
   if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
        nextSequence();
       },1000);

    }
    }
    else{
        console.log("Wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
  
        startOver();
    }
  
}

function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("h1").text("Level "+level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttoncolours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
     $("#"+currentColour).removeClass("pressed");
    },100)
}

function playsound(name){
    var audio = new Audio(name+".mp3")
    audio.play();
 } 

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}
