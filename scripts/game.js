function game() {
    $("body").empty();
    $("<div/>").attr("id", "content").appendTo("body");
    $("<div/>").attr("id", "game").appendTo("#content");
    $("<div/>").attr("id", "paddleA").appendTo("#game");
    $("<div/>").attr("id", "paddleB").appendTo("#game");
    $("<div/>").attr("id", "ball").appendTo("#game");

    
   
    
    var ball = {
        speed: 3,
        x: 290,
        y: 140,
        directionX: 1,
        directionY: 1
    };

    var pA = {
        speed: 3,
        x1: $("#paddleA").position().left,
        x2: $("#paddleA").position().left + $("#paddleA").width(),
        y1: $("#paddleA").position().top,
        y2: $("#paddleA").position().top + $("#paddleA").height(),
    };

    var pB = {
        speed: 3,
        x1: $("#paddleB").position().left,
        x2: $("#paddleB").position().left + $("#paddleB").width(),
        y1: $("#paddleB").position().top,
        y2: $("#paddleB").position().top + $("#paddleB").height(),
    };


    $(document).ready(function () {
        // Set main loop to be called on the desired frame rate
        setInterval(gameLoop, 1000 / 60);
    });

    // Main loop of the game
    function gameLoop() {
        moveBall();
    }


    // Control movement of the ball doing collision checking
    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());

        // Check collision to the bottom border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
            ball.directionY = -1
        }

        // Check collision to the top border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }

        // Check collision to the left border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
            alert("PaddleB lost")
            ball.directionX = -1
        }

        // Check collision to the right border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX < 0) {
            alert("PaddleA lost")
            ball.directionX = 1
        }

        // Check collision with PaddleA
        if (ball.x + ball.speed * ball.directionX < pA.x2) {
            if (pA.y1 < ball.y && ball.y < pA.y2) {
                ball.directionX = 1
            }
        }

        // Check collision with PaddleB
        if (ball.x + ball.speed * ball.directionX > pB.x1 - parseInt($("#ball").width())) {
            if (pB.y1 < ball.y && ball.y < pB.y2) {
                ball.directionX = -1
            }
        }


        $("html").keydown(function(e){p1.text(e.which)}).keyup(function(e){p2.text(e.which)});

        // Update ball position on X and Y axes based on speed and orientation
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;




        function movePaddles() {
	var paddleSpeed = 5;

	// Check keyboard events
	if (pressedKeys[KEY.W]) {
		// Move the paddle A up
		var top = parseInt($("#paddleA").css("top"));
		if (top >= -parseInt($("#paddleA").css("height"))/2) {
			$("#paddleA").css("top", top - paddleSpeed);
		}
	}
	if (pressedKeys[KEY.S]) {
		// Move the paddle B down
		var top = parseInt($("#paddleA").css("top"));
		if (top <= (parseInt($("#game").css("height")) - (parseInt($("#paddleA").css("height")))/2)) {
			$("#paddleA").css("top", top + paddleSpeed);
		}
	}
	if (pressedKeys[KEY.UP]) {
		// Move the paddle B up
		var top = parseInt($("#paddleB").css("top"));
		if (top >= -parseInt($("#paddleB").css("height"))/2) {
			$("#paddleB").css("top", top - paddleSpeed);
		}
	}
	if (pressedKeys[KEY.DOWN]) {
		// Move the paddle B down
		var top = parseInt($("#paddleB").css("top"));
		if (top <= (parseInt($("#game").css("height")) - (parseInt($("#paddleB").css("height")))/2)) {
			$("#paddleB").css("top", top + paddleSpeed);
		}
	}
}


        // Render the updated ball position
        $("#ball").css({ "left": ball.x, "top": ball.y });
    }

}