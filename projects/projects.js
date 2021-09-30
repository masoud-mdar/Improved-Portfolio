const starWrapper = document.getElementById("star-wrapper");
const gameButton = document.getElementById("game-btn");
const buttonWrapper = document.getElementById("main-btn-wrapper");
const bigCircle = document.getElementById("big-circle");
const planet = document.getElementById("planet");
const ufoWrapper = document.getElementById("ufo-wrapper");
const ufo = document.getElementById("main-ufo")
const alien = document.getElementById("alien");
const gameField = document.getElementById("game-field");
const scoreBoard = document.getElementById("score-board");
const timeDiv = document.getElementById("timer");
const scoreSpan = document.getElementById("score");
const projectsWrapper = document.getElementById("projects-wrapper");

let starTimerId;
let starAnimationId;
let ufoTimerId;
let ufoTimerId2;
let leftTimerId;
let mainTimerId;
let mainTimerAnimationId;
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
let score = 0;
let scoreProgress = score * 5;

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})

starMaker();

gameButton.addEventListener("click", () => {

    if (gameMode) {
        // Go Back to Normal
        normalModeStyleMaker()
        starKiller();
        restarter();
        starMaker();
        gameMode = !gameMode;

    } else {
        // Game Mode is On
        gameModeStyleMaker();
        gameStarter();
        gameMode = !gameMode;
    }
})