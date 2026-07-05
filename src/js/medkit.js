import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./player.js";

const HEAL_FRACTION = 0.2; // 20% van maxHealth

export class Medkit extends Actor {
    constructor(x, y) {
        super({
            width: 32,
            height: 32,
            scale: new Vector(0.11, 0.11),
            collisionType: CollisionType.Passive
        });
        this.pos = new Vector(x, y);
    }

    onInitialize() {
        this.graphics.use(Resources.Medkit.toSprite());
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player) {
            other.owner.heal(other.owner.maxHealth * HEAL_FRACTION);
            this.kill();
        }
    }
}
