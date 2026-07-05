import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Zombie extends Actor {
    damage = 15 // health die de speler verliest bij een aanraking

    constructor() {
        super({
            width: 64,
            height: 64,
            pos: new Vector(Math.random() * 1280, Math.random() * 700),
            vel: new Vector(Math.random() * 100, 0)
        })
        this.scale = new Vector(0.8, 0.8);
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Zombie.toSprite())
        // trager dan de speler (speed 200) -> te ontlopen
        this.actions.meet(this.scene.myplayer, 90)
    }
}