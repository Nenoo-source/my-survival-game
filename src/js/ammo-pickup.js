import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./player.js";

const AMMO_PER_PICKUP = 15;

export class AmmoPickup extends Actor {
    constructor(x, y) {
        super({
            width: 16,
            height: 16,
            scale: new Vector(1.2, 1.2), // iets groter dan een kogel
            collisionType: CollisionType.Passive
        });
        this.pos = new Vector(x, y);
    }

    onInitialize() {
        // hergebruikt voorlopig de bullet-sprite, zet hier je eigen ammo-plaatje
        // in resources.js zodra je er een hebt
        this.graphics.use(Resources.Bullet.toSprite());
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player) {
            other.owner.pickupAmmo(AMMO_PER_PICKUP);
            this.kill();
        }
    }
}
