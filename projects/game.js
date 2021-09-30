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

                            //item.style.display = "none";
                            



                            /*if (score) {
                                score --;
                                scoreProgress = score * 7;
                                scoreSpan.style.width = `${scoreProgress}px`;
                            }*/

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