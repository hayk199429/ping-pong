function game() {
    $("body").empty();
    $("<div/>").attr("id", "content").appendTo("body");
    $("<div/>").attr("id", "game").appendTo("#content");
    $("<div/>").attr("id", "scorepaddleA").appendTo("#game");
    $("#scorepaddleA").text("0");
    $("<div/>").attr("id", "scorepaddleB").appendTo("#game");
    $("#scorepaddleB").text("0");
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

    var score = {
        paddleA: 0,
        paddleB: 0
    };

    var pA = {
        speed: 3,
        x1: $("#paddleA").position().left,
        x2: $("#paddleA").position().left + $("#paddleA").width(),
        y1: $("#paddleA").position().top,
        y2: $("#paddleA").position().top + $("#paddleA").height(),
        update: function () {
            this.y1 = $("#paddleA").position().top;
            this.y2 = this.y1 + $("#paddleA").height();
        }
    };

    var pB = {
        speed: 3,
        x1: $("#paddleB").position().left,
        x2: $("#paddleB").position().left + $("#paddleB").width(),
        y1: $("#paddleB").position().top,
        y2: $("#paddleB").position().top + $("#paddleB").height(),
        update: function () {
            this.y1 = $("#paddleB").position().top;
            this.y2 = this.y1 + $("#paddleB").height();
        }
    };

    var PaddleA = $("#paddleA");
    var PaddleB = $("#paddleB");
    var directions = {};
    var speed = 4;

    //Paddle move actions
    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
    }

    function stop(e) {
        delete directions[e.which];
    }

    function movepaddleA(e) {
        for (var i in directions) {

            if (PaddleA.position().top > 0 && i == 87) {
                PaddleA.css("top", (PaddleA.position().top - speed) + "px");
            }
            if (PaddleA.position().top < ($("#game").height() - PaddleA.height()) && i == 83) {
                PaddleA.css("top", (PaddleA.position().top + speed) + "px");
            }
            pA.update();
        }
    }

    function movepaddleB(e) {
        for (var i in directions) {

            if (PaddleB.position().top > 0 && i == 38) {
                PaddleB.css("top", (PaddleB.position().top - speed) + "px");
            }
            if (PaddleB.position().top < ($("#game").height() - PaddleB.height()) && i == 40) {
                PaddleB.css("top", (PaddleB.position().top + speed) + "px");
            }
            pB.update();
        }
    }

    var pauseBall = false;

    // Control movement of the ball doing collision checking
    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());
 
        if (pauseBall) return;

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
            ball.directionX = -1
            score.paddleB = score.paddleB + 1;
            $("#scorepaddleB").empty().append([score.paddleB]);
            console.log(score.paddleB);
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }

        // Check collision to the right border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
            score.paddleA = score.paddleA + 1;
            $("#scorepaddleA").empty().append([score.paddleA]);
            console.log(score.paddleA);
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
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

        // Update ball position on X and Y axes based on speed and orientation
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        // Render the updated ball position
        $("#ball").css({ "left": ball.x, "top": ball.y });
    }


    setInterval(gameLoop, 1000 / 60);


    // Main loop of the game
    function gameLoop() {
        moveBall();
        movepaddleA();
        movepaddleB();
    }

}