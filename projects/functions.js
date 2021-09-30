function randomMaker (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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