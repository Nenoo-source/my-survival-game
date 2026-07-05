import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Bullet } from "./bullet.js";
import { Zombie } from "./zombie.js";
import { SpeedZombie } from "./speed-zombie.js";
import { facingRotation } from "./direction.js";
 
export class Player extends Actor {
    speed = 200;
    facingVector = new Vector(1, 0);
 
    health = 100;
    maxHealth = 100;
    ammo = 30;
    maxAmmo = 30;
    score = 0;
 
    constructor(myposx = 640, myposy = 360) {
        super({
            width: 64,
            height: 64,
            collisionType: CollisionType.Active // nodig om onCollisionStart te krijgen
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
        this.rotation = facingRotation(this.facingVector);
 
        if (kb.wasPressed(Keys.Space)) {
            this.shoot();
        }
    }
 
    shoot() {
        if (this.ammo <= 0) return; // geen ammo meer
 
        this.ammo--;
        this.scene.ui.updateAmmo(this.ammo);
 
        let bullet = new Bullet(this.pos.x, this.pos.y, this.facingVector);
        this.scene.add(bullet);
    }
 
    addScore(points) {
        this.score += points;
        this.scene.ui.updateScore(this.score);
    }
 
    pickupAmmo(amount) {
        this.ammo = Math.min(this.maxAmmo, this.ammo + amount);
        this.scene.ui.updateAmmo(this.ammo);
    }
 
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        this.scene.ui.updateHealth(this.health, this.maxHealth);
    }
 
    onCollisionStart(event, other) {
        if (other.owner instanceof Zombie || other.owner instanceof SpeedZombie) {
            this.health -= other.owner.damage;
            this.scene.ui.updateHealth(Math.max(this.health, 0), this.maxHealth);
            other.owner.kill(); // voorkomt dat dezelfde zombie elke frame opnieuw schade doet
 
            if (this.health <= 0) {
                this.scene.engine.finalScore = this.score;
                this.scene.engine.goToScene("gameover");
            }
        }
    }
}