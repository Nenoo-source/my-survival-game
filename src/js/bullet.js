import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Zombie } from "./zombie.js";
import { SpeedZombie } from "./speed-zombie.js";

export class Bullet extends Actor {
    // We slaan de richting tijdelijk op in de klasse
    constructor(myposx, myposy, direction) {
        super({
            width: 16,
            height: 16,
            scale: new Vector(0.5, 0.5), // Aangepast naar je ronde bullet grid (16x16)
            collisionType: CollisionType.Passive
        });
        this.pos = new Vector(myposx, myposy);
        this.bulletDirection = direction; // Sla de meegegeven vector op
    }

    onInitialize() {
        this.graphics.use(Resources.Bullet.toSprite());
        
        // HIER GING HET MIS: We gebruiken nu de opgeslagen richting i.p.v. een hardcoded -500 vector!
        this.vel = this.bulletDirection.scale(500); 

        this.events.on("exitviewport", (e) => this.kill());
    }

    onCollisionStart(event, other) {
        // Zorgt dat zowel normale als snelle zombies geraakt kunnen worden
        if (other.owner instanceof Zombie || other.owner instanceof SpeedZombie) {
            other.owner.kill();
            this.kill();
        }   
    }
}