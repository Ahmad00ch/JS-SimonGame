
    let started = false;
    let level = 0;

    let buttonColors = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];


    const redSound = new Audio("./sounds/red.mp3");
    const blueSound = new Audio("./sounds/blue.mp3");
    const greenSound = new Audio("./sounds/green.mp3");
    const yellowSound = new Audio("./sounds/yellow.mp3");
    const wrongSound = new Audio("./sounds/wrong.mp3");

    
    $("#start-btn").on("click", function(){
        if(!started){
            $("#level-title").text("Level " + level);
            $("#start-btn").addClass("hidden"); 
            nextSequence();
            started = true;
        }
    });


    $(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

    $(".btn").on("click", function(){
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        animatePress($(this));
        
        if($(this).attr("id") === "red")
        redSound.play();

        if($(this).attr("id") === "blue")
        blueSound.play();

        if($(this).attr("id") === "green")
        greenSound.play();

        if($(this).attr("id") === "yellow")
        yellowSound.play();

        checkAnswer(userClickedPattern.length-1);
    })


function checkAnswer(currentLevel){
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
        }, 1000);
    }
    } else {
    wrongSound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
    }
}



function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);

    level++;
    $("#level-title").text("Level " + level);

    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

        if(randomChosenColor == "red")
        redSound.play();

        if(randomChosenColor == "blue")
        blueSound.play();

        if(randomChosenColor == "green")
        greenSound.play();

        if(randomChosenColor == "yellow")
        yellowSound.play();
    }

function animatePress(button){
        button.addClass("pressed");
        setTimeout(() => {
            button.removeClass("pressed");
        }, 100);
    }

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#start-btn").removeClass("hidden");
}
