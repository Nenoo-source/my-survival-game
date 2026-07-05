import { Resources } from "./resources.js";
import { Actor, Vector } from "excalibur";

export class Background extends Actor {
    constructor() {
        super({
            x: 0,
            y: 0,
            anchor: new Vector(0, 0),
            width: 1280,
            height: 720
        })
        this.scale = new Vector(3, 3)
    }
    onInitialize() {
        this.graphics.use(Resources.Background.toSprite())
    }
}