const container = document.getElementById("container");
const gun = document.getElementById("gun");
const gunWrapper = document.getElementById("gun-wrapper");
const ciblesArr = document.querySelectorAll(".cible");
const restartButton = document.getElementById("restart");
const scoreSpan = document.getElementById("score");
const canon = document.getElementById("canon");
const tankCircle = document.getElementById("tank-circle");
const explanation = document.getElementById("explanation");
const gameNav = document.getElementById("game-nav");
const mainNav = document.getElementById("main-nav");
const ufoWrapper = document.getElementById("ufo-wrapper");
const timeDiv = document.getElementById("time-div");

let gunLeftSpace = 47;
let bulletUpSpace = -10;
let bulletLeftSpace = gunLeftSpace;
let cibleYPosition = ciblesArr[0].getBoundingClientRect()["y"];
let cibleLeftSpace = 0;
let ufoLeft = 0;

let movingCible = false;

let score = 0;
let scoreProgress = 0;

let seconds = 120;

let upTimerId;

let cibleLeftTimerId;
let ciblLeftAnimationId;

let cibleRightTimerId;
let cibleRightAnimationId

let starTimerId;

let ufoHandlerTimerId;
let ufoRightTimerId;

let ufoHandlerAnimationID;
let ufoRightAnimationId;

let mainTimerId;
let mainTimerAnimationId;

// Restart the game
restartButton.addEventListener("click", () => {
    restarter();

})