const starWrapper = document.getElementById("star-wrapper");

function randomMaker (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let starTimerId;

function starMaker () {
    let starNum = 0;
    function maker(timeStamp) {
        starTimerId = setTimeout(() => {


            let randomLeft = randomMaker(25, 75);
            let randomTop = randomMaker(25, 75);
        
            let star = document.createElement("div");
            star.classList.add("star");
            star.id = `star${starNum}`;
            star.style.left = `${randomLeft}%`;
            star.style.top = `${randomTop}%`;
            star.style["animation-delay"] = `${starNum*2}s`
            starWrapper.appendChild(star);
    
            starNum ++;

            requestAnimationFrame(maker);
    
        }, 200)
    }
    requestAnimationFrame(maker);
}

starMaker();