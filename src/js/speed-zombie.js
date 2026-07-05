import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class SpeedZombie extends Actor {
    constructor() {
        super({
            width: 64,
            height: 64,
            pos: new Vector(Math.random() * 1280, Math.random() * 720),
            vel: new Vector(Math.random() * 100, 0)
        })
        this.scale = new Vector(0.2, 0.2);
        console.log("I am a speed zombie")
    }
    onInitialize(engine) {
        this.graphics.use(Resources.SpeedZombie.toSprite())
        console.log("i'm hunting for the player")
        this.actions.meet(this.scene.myplayer, 100)
    }
}