function cibleHandler() {
    let counter = 0;

    function creator (timeStamp) {

        let cible;

        if (counter % 5 === 0) {
            cible = planetMaker();
        } else {
            cible = satelliteMaker();
        }
        counter ++;

        cible.classList.add("moving-cible")

        ciblesTimerId = setTimeout(() => {

            cibleRightSpace -= 15;
        
            let randomTop = randomMaker(0, 60);
            let randomDeg = randomMaker(0, 360);
            cible.style.top = `${randomTop}%`;
            cible.style.right = `${cibleRightSpace}%`;
            cible.style.transform = `rotate(${randomDeg}deg)`;
        
            gameField.appendChild(cible);
    
            ciblesAnimationId = requestAnimationFrame(creator);

        }, 2500)
    }

    requestAnimationFrame(creator);
}

function cibleMoveToLeft() {

    function mover (timeStamp) {

        ciblesLeftTimerId = setTimeout(() => {
            let ciblesArr = document.querySelectorAll(".moving-cible");
            let bullet = document.getElementById("bullet");

            ciblesArr.forEach((item) => {
                if (bullet) {
                    let cibleYPosition = item.getBoundingClientRect()["y"];
                    let cibleXPosition = item.getBoundingClientRect()["x"];

                    let bulletYPosition = bullet.getBoundingClientRect()["y"];
                    let bulletXPosition = bullet.getBoundingClientRect()["x"];


                    if (bulletYPosition <= cibleYPosition + 60 && bulletYPosition >= cibleYPosition - 15) {

                        if (bulletXPosition <= cibleXPosition + 60 && bulletXPosition >= cibleXPosition - 15) {

                            if (!item.style.animation) {
                                item.style.animation = "fade-out 1s forwards ease";
                                clearInterval(ciblesLeftTimerId);
                                bullet.style.display = "none";
                            }

                            if (score < 30) {
                                score ++;
                                scoreProgress = score * 5;
                                scoreSpan.style.width = `${scoreProgress}px`;
                            }

                        }
                    }
                }
                
                let rightStr = item.style.right;
                let tempArr = rightStr.split("");
                tempArr.pop();
                let right = parseInt(tempArr.join(""));
                if (right <= 110) {
                    right ++;
                    item.style.right = `${right}%`;
                } else {
                    item.style.display = "none";
                    gameField.removeChild(gameField.firstChild);
                }
    
            })
            ciblesLeftAnimationId = requestAnimationFrame(mover);    
        }, 100)
    }
    requestAnimationFrame(mover)
}


/******************** Bullet functions *****************/

function lastBulletKiller () {
    let lastBullet = ufoWrapper.lastChild;
    if (lastBullet) {
        ufoWrapper.removeChild(lastBullet);
    }
}

function bulletMaker () {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.id = "bullet";

    bulletLeftSpace = 0;
    bulletUpSpace = ufoUpSpace + 11;
    bullet.style.top = `${bulletUpSpace}%`;
    bullet.style.left = `${bulletLeftSpace}%`;

    ufoWrapper.appendChild(bullet);
    return bullet
}

function bulletMoveToRight (bullet) {
    bulletLeftSpace += 5;
    bullet.style.left = `${bulletLeftSpace}%`;
}

function collisionDetector (bulletXPosition) {
    let isCollision = false;
    let collisionIndex = 0;

    ciblesArr.forEach((cible, index) => {
        let cibleXPosition = cible.getBoundingClientRect()["x"];

        if (bulletXPosition <= (cibleXPosition + 12) && bulletXPosition >= (cibleXPosition - 12)) {
            isCollision = true;
            collisionIndex = index;
        }
    })

    return [isCollision, collisionIndex]
}

function spaceButtonHandler () {
    clearInterval(leftTimerId);

    if (seconds > 0 && gameMode) {
        // To kill the other bullet not to have more than one bullet at a time
        lastBulletKiller();
    
        // Creating the bullet
        const bullet = bulletMaker();
    
        // Moving the bullet right (smoothly)
        leftTimerId = setInterval(() => {
            if (bulletLeftSpace <  3000) {
    
                bulletMoveToRight(bullet);

            } else {
                bullet.style.display = "none";
                clearInterval(leftTimerId);
            }
        }, 2)

    } else {
        let bullet = document.getElementById("bullet");
        if (bullet) {
            bullet.style.display = "none";
        }
    }
}