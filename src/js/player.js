import { Actor, Vector, Keys } from "excalibur";
import { Resources } from "./resources.js";
import { Bullet } from "./bullet.js";
import { Zombie } from "./zombie.js";

export class Player extends Actor {
    speed = 200;
    facingVector = new Vector(1, 0);

    constructor(myposx = 640, myposy = 360) {
        super({
            width: 64,
            height: 64
        });
        this.pos = new Vector(myposx, myposy);
    }

    onInitialize() {
        this.graphics.use(Resources.Player.toSprite());
        this.scale = new Vector(0.8, 0.8);
    }

    onPostUpdate(engine) {
        let kb = engine.input.keyboard;
        let xspeed = 0;
        let yspeed = 0;

        if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up)) {
            yspeed = -this.speed;
            this.facingVector = new Vector(0, -1);
        }
        if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) {
            yspeed = this.speed;
            this.facingVector = new Vector(0, 1);
        }
        if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) {
            xspeed = -this.speed;
            this.facingVector = new Vector(-1, 0);
        }
        if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) {
            xspeed = this.speed;
            this.facingVector = new Vector(1, 0);
        }

        if (xspeed !== 0 && yspeed !== 0) {
            this.facingVector = new Vector(xspeed, yspeed).normalize();
        }

        this.vel = new Vector(xspeed, yspeed);

        if (kb.wasPressed(Keys.Space)) {
            this.shoot();
        }
    }

    shoot() {
        let bullet = new Bullet(this.pos.x, this.pos.y, this.facingVector);
        this.scene.add(bullet);
    
    }
}