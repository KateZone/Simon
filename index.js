$(document).ready(function() {
    // Sounds for each button
    const sounds = {
        green: new Audio("./sounds/green.mp3"),
        red: new Audio("./sounds/red.mp3"),
        yellow: new Audio("./sounds/yellow.mp3"),
        blue: new Audio("./sounds/blue.mp3"),
        wrong: new Audio("./sounds/wrong.mp3") // sound for wrong answer
    };

    let buttonColors = ["green", "red", "yellow", "blue"];
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;

    // Start game on keypress
    $(document).keypress(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    // Detect user clicks
    $(".btn").click(function() {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function playSound(name) {
        if (sounds[name]) {
            sounds[name].play();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});
