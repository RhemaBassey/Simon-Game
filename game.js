var gameStart = true
var level = 0
var i = 0

var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern= []

var userClickedPattern = []

function playSound(name){
    new Audio("sounds/"+name+".mp3").play()
}

function animatePress(currentColour){
    $(currentColour).addClass("pressed")
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
  },100)

}

// Adds a new color to the gamePattern array
function nextSequence(elements,ledger){
    level += 1
    userClickedPattern = []
    i = 0
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColour = elements[randomNumber]
    //Add to array
    ledger.push(randomChosenColour)

    //Display Level
    $("h1").text("Level " + level)
    // Visual FX
    animatePress("#"+randomChosenColour)
    //Audio Fx
    playSound(randomChosenColour)
    console.log("game pattern: " + gamePattern) 

}


   
$("body").keypress(function(event){ 

    if (gameStart == true){
        nextSequence(buttonColours,gamePattern) 
        gameStart = false
    }

})

// PLAYER CLICK
$(".btn").click(function(event){ 
        var userChosenColour = $(this).attr("id")
        //Add to array
        userClickedPattern.push(userChosenColour)
        // Visual FX
        animatePress(this)
        //Audio Fx
        playSound(userChosenColour)
        console.log("user clicked pattern: " + userClickedPattern)
    
        //Game Logic
        if(userChosenColour != gamePattern[i]){
            gameOver()
            return         
        }
        else{
            i+=1
        }
              
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence(buttonColours,gamePattern) 
          },1000)
            
        }
})

function gameOver(){
    if (gameStart == false){
    $('h1').text("Game Over :(")
    $('body').addClass("game-over")
    new Audio("sounds/wrong.mp3").play()
    setTimeout(function(){
        location.reload() 
  },2000)}
    
}



