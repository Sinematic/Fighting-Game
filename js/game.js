const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.4

const keys = {
    d: {
        pressed: false
    },
    q: {
        pressed: false
    },
    z: {
        pressed: false
    }
}


class Sprite {

    constructor({position, velocity, color = "red"}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.color = color
        this.isAttacking = false
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = "green"
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
 
        if (this.position.x < 0) {
            this.position.x = 0
            this.velocity.x = 0
        }

        if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width
            this.velocity.x = 0
        }
    }

    attack() {
        this.isAttacking = true
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
    },
    color: "blue"
})

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

console.log(player)


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 1
    } else if (keys.q.pressed && player.lastKey === "q") {
        player.velocity.x = -1
    } else if (keys.z.pressed && player.lastKey === "z") {
    }
}

animate()

document.addEventListener("keydown", (event) => {

    switch(event.key) {

        case "d":
            keys.d.pressed = true
            player.lastKey = "d"
            break
        case "q":
            keys.q.pressed = true
            player.lastKey = "q"
            break
        case "z":
            player.velocity.y = -15
            break
    }
})

document.addEventListener("keyup", (event) => {

    switch(event.key) {

        case "d":
            keys.d.pressed = false
            break
        case "q":
            keys.q.pressed = false
            break
        case "z":
            player.velocity.y = 0
    }
})

