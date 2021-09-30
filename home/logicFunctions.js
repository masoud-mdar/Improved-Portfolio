function normalModeSetter () {
    canvas.style.display = "block";
    subTitle.style.display = "block";
    mainUfo.style.display = "flex";
    ufoWrapper.style.display = "none";
    gameNav.style.display = "none";
    mainNav.style.display = "flex";
    gunWrapper.style.display = "none";
    destroyButton.innerHTML = "Destroy My Name";
    destroyButton.classList.add("destroy-anim");
    normalMode = true;
    destroyMode = false;
    document.removeEventListener("keydown", listener);
    restarter();
    ufoRemover();
    clearInterval(starTimerId);
    explanation.style.display = "none";
}

function destroyModeSetter () {
    canvas.style.display = "none";
    subTitle.style.display = "none";
    mainUfo.style.display = "none";
    ufoWrapper.style.display = "block";
    gameNav.style.display = "flex";
    mainNav.style.display = "none";
    explanation.style.display = "flex";
    gunWrapper.style.display = "block";
    destroyButton.innerHTML = "Back To Normal";
    destroyButton.classList.remove("destroy-anim");
    normalMode = false;
    destroyMode = true;
    movingLeft();
    starMaker();
    ufoHandler();
    ufoMoveToRight();
    timer();

    document.addEventListener("keydown", (event) => {    
        listener(event);
    })
}

function restarter () {
    movingCible = false;

    clearTimeout(cibleLeftTimerId);
    cancelAnimationFrame(cibleLeftAnimationId);

    clearTimeout(cibleRightTimerId);
    cancelAnimationFrame(cibleRightAnimationId);

    clearTimeout(mainTimerId);
    cancelAnimationFrame(mainTimerAnimationId);

    clearInterval(upTimerId);

    gunLeftSpace = 47;
    bulletLeftSpace = gunLeftSpace;
    cibleLeftSpace = 0;

    ciblesArr.forEach(cible => {
        cible.style.color = "#cedfcd";
        cible.style["background-image"] = "linear-gradient(#2c3445, #2c3445)";
        cible.style.left = `${cibleLeftSpace}%`;
    })

    gun.style.left = `${gunLeftSpace}%`;

    let bullet = document.getElementById("bullet");

    if (bullet) {
        bullet.style.display = "none";
    }

    score = 0;
    scoreProgress = score * 7;
    scoreSpan.style.width = `${scoreProgress}px`;

    seconds = 120;
    timeDiv.innerHTML = seconds;
    timeDiv.style.color = "#d4e4d2";

    timer();

    explanation.style.display = "flex";
    restartButton.classList.remove("restart");

    movingRight();
}

function listener(event) {
    const {code} = event;
    
    // Moving the gun left
    if (code === "ArrowLeft" && gunLeftSpace >= 5) {
        gunLeftSpace -= 1;
        gun.style.left = `${gunLeftSpace}%`;

        // Moving the gun right
    } else if (code === "ArrowRight" && gunLeftSpace <= 90) {
        gunLeftSpace += 1;
        gun.style.left = `${gunLeftSpace}%`;

        // Shoot the bullet
    } else if (code === "Space") {
        spaceButtonHandler();
    }
}

function randomMaker (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}