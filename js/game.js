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


const logs = document.getElementById("logs")

class Sprite {

    constructor({position, velocity, offset, color = "red"}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.isAttacking
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        },
        this.color = color
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.isAttacking) {
            c.fillStyle = "green"
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

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

        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    offset: {
        x: 0,
        y: 0
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
    },
    offset: {
        x: -50,
        y: 0
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
        case " ":
            player.attack()
            enemy.attack()
            break
    }

    if (player.isAttacking) {
        if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x 
            && player.attackBox.position.x <= enemy.position.x + enemy.width 
            && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
            && player.attackBox.position.y <= enemy.position.y + enemy.height) {
            logs.innerHTML += "<p>Hit !</p>"
        }
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