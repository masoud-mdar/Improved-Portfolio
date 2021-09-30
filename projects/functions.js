function randomMaker (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/****************** Star Functions  **************************/

function starMaker () {
    let starNum = 0;
    function maker(timeStamp) {
        if (starNum < 100) {
            starTimerId = setTimeout(() => {
                let randomLeft = randomMaker(5, 95);
                let randomTop = randomMaker(5, 95);
                let star = document.createElement("div");
                star.classList.add("star");
                star.id = `star${starNum}`;
                star.style.left = `${randomLeft}%`;
                star.style.top = `${randomTop}%`;
                star.style["animation-delay"] = `${starNum*2}s`
                starWrapper.appendChild(star);
        
                starNum ++;
    
                starAnimationId = requestAnimationFrame(maker);
        
            }, 250)
        } else {
            clearTimeout(starTimerId)
        }
    }
    requestAnimationFrame(maker);
}

function starKiller () {
    cancelAnimationFrame(starAnimationId);
    clearTimeout(starTimerId);

    while(starWrapper.lastChild) {
        starWrapper.removeChild(starWrapper.lastChild);
    }
}


/****************************** Normal/Game mode change functions ******************************/

function normalModeStyleMaker() {
    buttonWrapper.classList.remove("btn-up");
    buttonWrapper.classList.add("btn-down");

    gameButton.innerHTML = "Play a little Game";

    bigCircle.classList.remove("circle-down");
    bigCircle.classList.add("circle-up");

    planet.classList.remove("planet-down");
    planet.classList.add("planet-up");
    

    ufoWrapper.classList.remove("ufo-in-place");
    ufoWrapper.classList.add("ufo-back");

    ufo.classList.remove("ufo-down");
    ufo.classList.add("ufo-top");

    ufoTimerId2 = setTimeout(() => {
        ufo.classList.remove("ufo-top");
        ufo.classList.add("main-ufo");
    }, 5000)

    starWrapper.style.height = "30vh";

    alien.style["justify-content"] = "space-evenly";

    gameField.style.display = "none";
    scoreBoard.style.display = "none";
    projectsWrapper.style.display = "flex";
}


function gameModeStyleMaker() {
    buttonWrapper.classList.remove("btn-down");
    buttonWrapper.classList.add("btn-up");

    gameButton.innerHTML = "Back to Normal";

    bigCircle.classList.remove("circle-up");
    bigCircle.classList.add("circle-down");

    planet.classList.remove("planet-up");
    planet.classList.add("planet-down");

    ufo.classList.remove("main-ufo");
    ufo.classList.remove("ufo-top");
    ufo.classList.add("ufo-down");

    ufoWrapper.classList.remove("ufo-back");
    ufoWrapper.classList.add("ufo-in-place");

    starWrapper.style.height = "75vh";

    alien.style["justify-content"] = "flex-end";

    gameField.style.display = "block";
    scoreBoard.style.display = "flex";
    projectsWrapper.style.display = "none";
}

function gameStarter() {

    ufoTimerId = setTimeout(() => {
        ufo.classList.remove("ufo-down");
        ufo.style.top = `${ufoUpSpace}%`;
    }, 5000)

    document.addEventListener("keydown",(event) => {
        listener(event);
    })

    cibleHandler();
    cibleMoveToLeft();
    timer();
}

/********************* Logic functions **************************/

function listener(event) {
    const {code} = event;

    if (code === "ArrowUp" || code === "ArrowDown" || code === "Space") {
        event.preventDefault();
    }

    // Moving the UFO up
    if (code === "ArrowUp" && ufoUpSpace > 0) {
        ufoUpSpace -=2;
        ufo.style.top = `${ufoUpSpace}%`;

        // Moving the UFO down
    } else if (code === "ArrowDown"  && ufoUpSpace < 80) {
        ufoUpSpace +=2;
        ufo.style.top = `${ufoUpSpace}%`;

        // Shoot the bullet
    } else if (code === "Space") {
        spaceButtonHandler();
        
    }
}

function timer() {
    function mainTimer (timeStamp) {

        if (gameMode) {
            mainTimerId = setTimeout(() => {
                if (seconds > 0) {
                    seconds --;
                    timeDiv.innerHTML = seconds;
    
                    if (seconds < 20) {
                        timeDiv.style.color = "orangered";
                    }
                    
                    mainTimerAnimationId = requestAnimationFrame(mainTimer);

                } else {

                    if (score < 35) {
                        timeDiv.innerHTML = "GAME OVER";
                        timeDiv.style.color = "orangered";
                    } else {
                        timeDiv.innerHTML = "YOU WON";
                        timeDiv.style.color = "#00d539";
                    }
                }
            },1000)
        }
    }
    requestAnimationFrame(mainTimer);
}

function restarter() {
    clearTimeout(ufoTimerId);
    clearTimeout(ciblesTimerId);
    clearInterval(leftTimerId);

    clearTimeout(ciblesLeftTimerId);
    cancelAnimationFrame(ciblesAnimationId);

    cancelAnimationFrame(ciblesLeftAnimationId);

    clearTimeout(mainTimerId);
    cancelAnimationFrame(mainTimerAnimationId);

    document.removeEventListener("keydown", listener);

    ufoUpSpace = 50;
    bulletUpSpace = ufoUpSpace + 11;
    
    bulletLeftSpace = 0;
    cibleRightSpace = 0;
    
    seconds = 120;
    timeDiv.innerHTML = seconds;
    timeDiv.style.color = "#d4e4d2";

    score = 0;
    scoreProgress = score * 5;
    scoreSpan.style.width = `${scoreProgress}px`;

    while(gameField.lastChild) {
        gameField.removeChild(gameField.lastChild);
    }
}