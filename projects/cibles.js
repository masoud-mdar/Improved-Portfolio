// Making a Planet
function planetMaker () {
    let cible = document.createElement("div");
    cible.classList.add("cible");
    let a = document.createElement("div");
    a.classList.add("a");

    let e = document.createElement("div");
    e.classList.add("e");
    let f = document.createElement("div");
    f.classList.add("f");
    let g = document.createElement("div");
    g.classList.add("g");

    a.appendChild(e);
    a.appendChild(f);
    a.appendChild(g);

    cible.appendChild(a)

    return cible
}

// Making a Satellite
function satelliteMaker () {
    let sat = document.createElement("div");
    sat.classList.add("satellite");

    let head = document.createElement("div");
    head.classList.add("sat-head");

    sat.appendChild(head);

    let body = document.createElement("div");
    body.classList.add("sat-body");

    let satLeft = document.createElement("div");
    satLeft.classList.add("sat-left");

    let leftBat = document.createElement("div")
    leftBat.classList.add("left-bat");

    for (let i=0; i<3; i++) {
        let div = document.createElement("div");
        leftBat.appendChild(div);
    }

    satLeft.appendChild(leftBat);

    let leftArm = document.createElement("div");
    leftArm.classList.add("left-arm");

    satLeft.appendChild(leftArm);

    body.appendChild(satLeft);

    let satMiddle = document.createElement("div");
    satMiddle.classList.add("sat-middle");

    let satLabel = document.createElement("div");
    satLabel.classList.add("sat-label");

    satMiddle.appendChild(satLabel);

    body.appendChild(satMiddle);

    let satRight = document.createElement("div");
    satRight.classList.add("sat-right");

    let rightArm = document.createElement("div");
    rightArm.classList.add("right-arm");

    satRight.appendChild(rightArm);

    let rightBat = document.createElement("div")
    rightBat.classList.add("right-bat");

    for (let i=0; i<3; i++) {
        let div = document.createElement("div");
        rightBat.appendChild(div);
    }

    satRight.appendChild(rightBat);

    body.appendChild(satRight);

    sat.appendChild(body);

    ///////////////////
    let satTail = document.createElement("div");
    satTail.classList.add("sat-tail");

    let part1 = document.createElement("div");
    part1.classList.add("part1");

    satTail.appendChild(part1);

    let part2 = document.createElement("div");
    part2.classList.add("part2");

    let leftHalf = document.createElement("div");
    leftHalf.classList.add("left-half");

    part2.appendChild(leftHalf);

    let rightHalf = document.createElement("div");
    rightHalf.classList.add("right-half");

    part2.appendChild(rightHalf);

    satTail.appendChild(part2);

    /////////
    let part3 = document.createElement("div");
    part3.classList.add("part3");

    satTail.appendChild(part3);

    let waves = document.createElement("div");
    waves.classList.add("waves");

    satTail.appendChild(waves);

    sat.appendChild(satTail);

    return sat
}