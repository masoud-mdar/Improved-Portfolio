function lastBulletKiller () {
    let lastBullet = gunWrapper.lastChild;
    if (lastBullet) {
        gunWrapper.removeChild(lastBullet);
    }
}

function bulletMaker () {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.id = "bullet";

    //Positionning the bullet exactly on the gun
    bulletLeftSpace = gunLeftSpace + 2.4;

    bullet.style.left = `${bulletLeftSpace}%`;
    gunWrapper.appendChild(bullet);

    bulletUpSpace = 0;
    canon.style.height = "25px";
    canon.style.top = "-12px";
    tankCircle.style["background-color"] = "#44ceab";
    setTimeout(() => {
        canon.style.height = "30px";
        canon.style.top = "-17px";
        tankCircle.style["background-color"] = "#cedfcd";
    }, 100)

    return bullet
}

function bulletMoveToUp (bullet) {
    bulletUpSpace -= 2;
    bullet.style.top = `${bulletUpSpace}%`;
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
    clearInterval(upTimerId);

    if (seconds > 0) {
        explanation.style.display = "none";

        // To kill the other bullet not to have more than one bullet at a time
        lastBulletKiller();
    
        // Creating the bullet
        const bullet = bulletMaker();
    
        // Moving the bullet up (smoothly)
        upTimerId = setInterval(() => {
            if (bulletUpSpace > - 1000) {
    
                bulletMoveToUp(bullet);
    
                //Collision detection:
    
                let bulletYPosition = bullet.getBoundingClientRect()["y"];
                let bulletXPosition = bullet.getBoundingClientRect()["x"];
                
                // Y collision: the bullet is in the area
                if (bulletYPosition <= (cibleYPosition + 5) && bulletYPosition >= (cibleYPosition - 5)) {
    
                    // Now we check if a collision occurs
                    let [isCollision, collisionIndex] = collisionDetector(bulletXPosition)
    
                    if (isCollision) {
                        let deadCible = ciblesArr[collisionIndex];
    
                        // if condition is for not to detect a collision with a transparent (dead) letter
                        if (deadCible.style.color !== "transparent") {
    
                            deadCible.style.color = "transparent";
                            deadCible.style["background-image"] = "url(./XCVT.gif)";
                            setTimeout(() => {
                                deadCible.style["background-image"] = "linear-gradient(#2c3445, #2c3445)";
                            }, 300)
    
                            bullet.style.display = "none";
                            score ++;
                            scoreProgress = score * 7;
                            scoreSpan.style.width = `${scoreProgress}px`;
    
                            clearInterval(upTimerId);
                        }
                    }
                }  
            } else {
                bullet.style.display = "none";
                clearInterval(upTimerId);
            }
        }, 2)

    } else {
        let bullet = document.getElementById("bullet");
        if (bullet) {
            bullet.style.display = "none";
        }
    }

}