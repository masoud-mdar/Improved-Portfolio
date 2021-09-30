const starWrapper = document.getElementById("star-wrapper");
const gameButton = document.getElementById("game-btn");
const buttonWrapper = document.getElementById("main-btn-wrapper");
const bigCircle = document.getElementById("big-circle");
const planet = document.getElementById("planet");
const ufoWrapper = document.getElementById("ufo-wrapper");
const ufo = document.getElementById("main-ufo")
const alien = document.getElementById("alien");

const gameField = document.getElementById("game-field");

let starTimerId;
let starAnimationId;
let ufoTimerId;
let ufoTimerId2;
let leftTimerId;

let ciblesTimerId;
let ciblesAnimationId;

let ciblesLeftTimerId;
let ciblesLeftAnimationId;

let gameMode = false;

let ufoUpSpace = 50;
let bulletUpSpace = ufoUpSpace + 11;

let bulletLeftSpace = 0;
let cibleRightSpace = 0;

let seconds = 120;

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})



starMaker();

gameButton.addEventListener("click", () => {

    if (gameMode) {
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

        starKiller();

        restarter();

        gameMode = !gameMode;

    } else {

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

        //planetMaker();

        //satelliteMaker();

        gameStarter();

        gameMode = !gameMode;
    }
})

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
}

function listener(event) {
    const {code} = event;

    if (code === "ArrowUp" || code === "ArrowDown" || code === "Space") {
        event.preventDefault();
    }

    // Moving the UFO up
    if (code === "ArrowUp" && ufoUpSpace > 0) {
        ufoUpSpace -=2;
        ufo.style.top = `${ufoUpSpace}%`;

        // Moving the gun down
    } else if (code === "ArrowDown"  && ufoUpSpace < 80) {
        ufoUpSpace +=2;
        ufo.style.top = `${ufoUpSpace}%`;

        // Shoot the bullet
    } else if (code === "Space") {
        spaceButtonHandler();
        
    }
}

function restarter() {
    clearTimeout(ufoTimerId);
    clearTimeout(ciblesTimerId);
    clearInterval(leftTimerId);

    clearTimeout(ciblesLeftTimerId);
    cancelAnimationFrame(ciblesAnimationId);

    cancelAnimationFrame(ciblesLeftAnimationId);

    document.removeEventListener("keydown", listener);

    ufoUpSpace = 50;
    bulletUpSpace = ufoUpSpace + 11;
    
    bulletLeftSpace = 0;
    cibleRightSpace = 0;
    
    seconds = 120;

    while(gameField.lastChild) {
        gameField.removeChild(gameField.lastChild);
    }
}