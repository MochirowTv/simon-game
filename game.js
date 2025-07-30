var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    switch (name) {
        case "red":
            var red = new Audio('./sounds/red.mp3');
            red.play();
            break;

        case "blue":
            var blue = new Audio('./sounds/blue.mp3');
            blue.play();
            break;

        case "green":
            var green = new Audio('./sounds/green.mp3');
            green.play();
            break;
        
        case "yellow":
            var yellow = new Audio('./sounds/yellow.mp3');
            yellow.play();
            break;
    
        default:
            break;
    }
}

function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = false;
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
                console.log("Success");
                userClickedPattern = [];
                setTimeout(function(){
                    nextSequence();
                }, 1000);
        }
    } else {
        console.log("Error");
        var wrong =  new Audio('./sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(event){
    var userChosenKey = event.key;
    if (userChosenKey === "a" && !started ) {
        nextSequence();
        started = true;
        // $("#level-title").text("Level 0")
    }
});