import { Actor, Vector, Keys, randomInRange } from "excalibur";
import { Resources } from "./resources.js";

export class Player extends Actor {
speed = 200

    constructor(myplayer) {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
            pos: new Vector(640, 390),
        })

        this.graphics.use(Resources.Player.toSprite())
        this.scale = new Vector(0.5, 0.5);
        console.log("I am a player")
    }

    onPostUpdate(engine) {
        let kb = engine.input.keyboard
        let xspeed = 0
        let yspeed = 0
       

        // WASD besturing
        if (kb.isHeld(Keys.W || Keys.Up || Keys.ArrowUp)) {
            yspeed = -this.speed
        }
        if (kb.isHeld(Keys.S || Keys.Down || Keys.ArrowDown)) {
            yspeed = +this.speed
        }
        if (kb.isHeld(Keys.A || Keys.Left || Keys.ArrowLeft)) {
            xspeed = -this.speed
        }
        if (kb.isHeld(Keys.D || Keys.Right || Keys.ArrowRight)) {
            xspeed = +this.speed
        }
        this.vel = new Vector(xspeed, yspeed)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            //this.shoot()
        }
    }

    /*shoot() {
        let bubble = new Bubble(this.pos.x, this.pos.y, this.playerNum)
        this.scene.add(bubble)
    }*/


    // haai eet vis en update score
    //onCollisionStart(event, other) {
    /*if (other.owner instanceof Fish) {
    other.owner.kill()
        console.log(`Shark ${this.playerNum} ate a fish! Score: ${this.fishEaten}`)
    }*/
    //if (other.owner instanceof Mine) {
}

