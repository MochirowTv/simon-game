// Variables necesarias para el juego
var gamePattern = []; // lista vacia que guardara la secuencia de colores

var buttonColors = ["red", "blue", "green", "yellow"]; // una lista con los colores que representaran a los botones con su ID

var userClickedPattern = []; // lista que guardara los colores que el usuario clikeara al presionar los botones

var level = 0; // variable que ira incrementando a medida que se cumpla el patron del juego

var started = false; // variable que servira para evitar reiniciar el juego

// Funcion que crea la secuencia de clicks empezando desde uno hasta infinito
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

// Funcion para reproducir los sonidos de cada boton con su respectivo color
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

// Funcion para reiniciar el juego una vez que pierdes.
function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = false;
}

// Verificamos si el patron corresponde a los clicks que el usuario hace
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
                // console.log("Success");
                userClickedPattern = [];
                setTimeout(function(){
                    nextSequence();
                }, 1000);
        }
    } else {
        // console.log("Error");
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

$("body").on("click", function(){
    if (!started ) {
        nextSequence();
        started = true;
    }
});