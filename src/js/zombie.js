import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Zombie extends Actor {
    constructor() {
        super({
            width: Resources.Zombie.width,
            height: Resources.Zombie.height,
            pos: new Vector(Math.random() * 1280, Math.random() * 700),
            vel: new Vector(Math.random() * 100, 0)
        })

        this.graphics.use(Resources.Zombie.toSprite())
        this.scale = new Vector(0.5, 0.5);
        console.log("I am a zombie")
    }
    onInitialize(engine) {
        console.log("i'm hunting for the player")
        this.actions.meet(this.scene.myplayer, 100)

    }
}