import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class SpeedZombie extends Actor {
    damage = 15

    constructor() {
        super({
            width: 64,
            height: 64,
            pos: new Vector(Math.random() * 1280, Math.random() * 720),
            vel: new Vector(Math.random() * 100, 0)
        })
        this.scale = new Vector(0.06, 0.06);
    }
    onInitialize(engine) {
        this.graphics.use(Resources.SpeedZombie.toSprite())
        // sneller dan de speler (speed 200) -> lastig te ontlopen
        // (stond hier eerst ook op 100, dus exact even snel als Zombie!)
        this.actions.meet(this.scene.myplayer, 140)
    }
}