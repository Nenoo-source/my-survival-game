import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Zombie extends Actor {
    constructor() {
        super({
            width: 64,
            height: 64,
            pos: new Vector(Math.random() * 1280, Math.random() * 700),
            vel: new Vector(Math.random() * 100, 0)
        })
        this.scale = new Vector(0.2, 0.2);
        console.log("I am a zombie")
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Zombie.toSprite())
        console.log("i'm hunting for the player")
        this.actions.meet(this.scene.myplayer, 100)
    }
}