const destroyButton = document.getElementById("destroy-btn");
const subTitle = document.getElementById("subtitle");
const starWrapper = document.getElementById("star-wrapper");
const homeButton = document.getElementById("home-btn");

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})

let normalMode = true;
let destroyMode = false;

if (normalMode) {
    gunWrapper.style.display = "none";
}

clearInterval(starTimerId);

destroyButton.addEventListener("click", () => {

    if (normalMode) {
        destroyModeSetter();

    } else {
        normalModeSetter();

    }
})

homeButton.addEventListener("click", () => {
    normalModeSetter();
})