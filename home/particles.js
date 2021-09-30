const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = 1200;
canvas.height = 240;



let particlesArray

// create particle

class Particle {
    constructor (x, y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
    }

    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        //ctx.fillStyle = "#8C5523"
        ctx.fillStyle = "#fff"
        ctx.fill()
    }

    update () {

        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }

        // move particle
        this.x += (this.directionX*0.7)
        this.y += (this.directionY*0.7)

        //draw particle

        this.draw()

    }
}

// create particles array

const init = () => {

    particlesArray = []
    let numberOfParticles = (canvas.width * canvas.height) / 5000

    for (let i=0; i<numberOfParticles; i++) {
        let size = (Math.random() * 4) + 1
        let x = (Math.random() * ((innerWidth - size*2) - (size*2)) + size*2)
        let y = (Math.random() * ((innerHeight - size*2) - (size*2)) + size*2)

        let directionX = (Math.random() * 5) - 2.5
        let directionY = (Math.random() * 5) - 2.5

        //let color = "#8c5523"
        let color = "#4e5e65"

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color))

    }
}

// check if particles are close enough to be connected

const connect = () => {
    // a represents each individual particle in our array
    // b represents all the consecutive particles
    for (let a=0; a<particlesArray.length; a++) {
        for (let b=a; b<particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y))

            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = "#4e5e65"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                ctx.stroke()
            }
        }
    }
}

// animation loop

const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,innerWidth, innerHeight)

    for (let i=0; i< particlesArray.length; i++) {
        particlesArray[i].update()
    }

    connect()
}

init()

animate()



