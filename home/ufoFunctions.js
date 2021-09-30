const mainUfo = document.getElementById("main-ufo");

function ufoMaker() {
    let ufoDiv = document.createElement("div");
    ufoDiv.classList.add("ufo");

    let ufoHead = document.createElement("div");
    ufoHead.classList.add("ufo-head");

    let alien = document.createElement("div");
    alien.classList.add("alien");
    let eye1 = document.createElement("div");
    let eye2 = document.createElement("div");
    eye1.classList.add("eye");
    eye2.classList.add("eye");
    let nose = document.createElement("div");
    nose.classList.add("nose");

    alien.appendChild(eye1);
    alien.appendChild(nose)
    alien.appendChild(eye2);

    ufoHead.appendChild(alien)

    let ufoBody = document.createElement("div");
    ufoBody.classList.add("ufo-body");

    for (let i=0; i<3; i++) {
        let dot = document.createElement("div");
        dot.classList.add("ufo-dot");
        ufoBody.appendChild(dot);
    }

    let ufoLeg = document.createElement("div");
    ufoLeg.classList.add("ufo-leg");

    ufoDiv.appendChild(ufoHead);
    ufoDiv.appendChild(ufoBody);
    ufoDiv.appendChild(ufoLeg);

    return ufoDiv
}

function ufoMoveToRight() {

    function mover (timeStamp) {

        ufoRightTimerId = setTimeout(() => {
            let ufosArr = document.querySelectorAll(".moving-ufo");
            let bullet = document.getElementById("bullet");
            //console.log(badScore)

            ufosArr.forEach((item) => {
                if (bullet) {
                    let ufoYPosition = item.getBoundingClientRect()["y"];
                    let ufoXPosition = item.getBoundingClientRect()["x"];

                    let bulletYPosition = bullet.getBoundingClientRect()["y"];
                    let bulletXPosition = bullet.getBoundingClientRect()["x"];


                    if (bulletYPosition <= ufoYPosition + 10 && bulletYPosition >= ufoYPosition - 10) {

                        if (bulletXPosition <= ufoXPosition + 35 && bulletXPosition >= ufoXPosition - 10) {
                            item.lastChild.classList.add("shot");
                            item.firstChild.classList.add("shot");

                            clearInterval(upTimerId);
                            bullet.style.display = "none";

                            if (score) {
                                score --;
                                scoreProgress = score * 7;
                                scoreSpan.style.width = `${scoreProgress}px`;
                            }

                        }
                    }
                }
                
                let leftStr = item.style.left;
                let tempArr = leftStr.split("");
                tempArr.pop();
                let left = parseInt(tempArr.join(""));
                if (left <= 100) {
                    left ++;
                    item.style.left = `${left}%`;
                } else {
                    item.style.display = "none";
                    ufoWrapper.removeChild(ufoWrapper.firstChild);
                }
    
            })
            ufoRightAnimationId = requestAnimationFrame(mover);    
        }, 85)
    }
    requestAnimationFrame(mover)
}

function ufoHandler() {


    function creator (timeStamp) {

        ufoHandlerTimerId = setTimeout(() => {
            let ufo = ufoMaker();
            ufo.classList.add("moving-ufo");
        
            ufoLeft -= 10;
        
            let randomTop = randomMaker(0, 60);
            ufo.style.top = `${randomTop}%`;
            ufo.style.left = `${ufoLeft}%`;
        
            ufoWrapper.appendChild(ufo);
    
            ufoHandlerAnimationID = requestAnimationFrame(creator);

        }, 2000)
    }

    requestAnimationFrame(creator);
}

function ufoRemover() {
    clearTimeout(ufoHandlerTimerId);
    cancelAnimationFrame(ufoHandlerAnimationID);

    clearTimeout(ufoRightTimerId);
    cancelAnimationFrame(ufoRightAnimationId);

    ufoLeft = 0;
    
    while (ufoWrapper.firstChild) {
        ufoWrapper.removeChild(ufoWrapper.firstChild);
    }

}