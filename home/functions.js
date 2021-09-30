function movingLeft () {
    cancelAnimationFrame(cibleRightAnimationId);
    clearTimeout(cibleRightTimerId);

    if (destroyMode) {
        function mover (timeStamp) {
            cibleLeftTimerId = setTimeout(() => {
    
                if (cibleLeftSpace >= - 170) {
                    cibleLeftSpace -= 0.5;
            
                    ciblesArr.forEach(cible => {
                        cible.style.left = `${cibleLeftSpace}%`;
                    })
    
                    cibleLeftAnimationId = requestAnimationFrame(mover);
        
                } else {
                   movingRight();
                }
            }, 2)
        }
        requestAnimationFrame(mover);
    }
}

function movingRight () {
    cancelAnimationFrame(cibleLeftAnimationId);
    clearTimeout(cibleLeftTimerId);

    if (destroyMode) {
        function mover (timeStamp) {
            cibleRightTimerId = setTimeout(() => {
    
                if (cibleLeftSpace <=  200) {
                    cibleLeftSpace += 0.5;
            
                    ciblesArr.forEach(cible => {
                        cible.style.left = `${cibleLeftSpace}%`;
                    })
    
                    cibleRightAnimationId = requestAnimationFrame(mover);
        
                } else {
                   movingLeft();
                }
            }, 2)
        }
        requestAnimationFrame(mover);
    }
}

function starMaker () {

    starTimerId = setInterval(() => {
        while (starWrapper.firstChild) {
            starWrapper.removeChild(starWrapper.firstChild);
        }
        
        let starNum = 0;

        while (starNum < 5) {

            let randomLeft = randomMaker(5, 95);
            let randomTop = randomMaker(5, 95);
    
            let star = document.createElement("div");
            star.classList.add("star");
            star.id = `star${starNum}`;
            star.style.left = `${randomLeft}%`;
            star.style.top = `${randomTop}%`;
            star.style["animation-delay"] = `${starNum}s`
            starWrapper.appendChild(star);

            starNum ++;
        }
    }, 10000)
}

function timer() {

    function mainTimer (timeStamp) {

        if (destroyMode) {
            mainTimerId = setTimeout(() => {
                if (seconds > 0) {
                    seconds --;
                    timeDiv.innerHTML = seconds;
    
                    if (seconds < 20) {
                        timeDiv.style.color = "orangered";
                    }
                    
        
                    mainTimerAnimationId = requestAnimationFrame(mainTimer);

                } else {
                    restartButton.classList.add("restart");

                    if (score < 28) {
                        timeDiv.innerHTML = "GAME OVER";
                    } else {
                        timeDiv.innerHTML = "YOU WON";
                    }
                }
    
            },1000)
        }
    }

    requestAnimationFrame(mainTimer);
}