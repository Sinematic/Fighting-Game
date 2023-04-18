const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.3

class Sprite {

    constructor({position, velocity}) {

        this.position = position,
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 10
    }
})

console.log(player)
player.draw()


const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    }
})

enemy.draw()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()

document.addEventListener("keydown", (event) => {

    switch(event.key) {

        case "d":
            player.velocity.x = 1
            break
        case "f":
            player.velocity.x = -1
        break
        default:
            console.log(event.key)
    }
})

document.addEventListener("keyup", (event) => {

    switch(event.key) {

        case "d":
            player.velocity.x = 0
            break
        case "f":
            player.velocity.x = 0
        break
        default:
            console.log(event.key)
    }
})