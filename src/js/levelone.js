import { Scene, BoundingBox, Vector } from "excalibur";
import { Background } from './background.js';
import { Player } from './player.js';
import { Zombie } from './zombie.js';
import { SpeedZombie } from './speed-zombie.js';
import { AmmoPickup } from './ammo-pickup.js';
import { UI } from './ui.js';
import { Resources } from "./resources.js";

const MAP_WIDTH = 1920;
const MAP_HEIGHT = 1080;

export class Level extends Scene {
    zombieSpawnTimer = 0;
    zombieSpawnInterval = 90; // frames tussen nieuwe zombies 
    maxZombies = 40;

    ammoSpawnTimer = 0;
    ammoSpawnInterval = 300; // ~5 seconden

    onInitialize(engine) {
        this.background = new Background();
        this.add(this.background);
     
        this.myplayer = new Player();
        this.add(this.myplayer);

        this.ui = new UI();
        this.add(this.ui);

        // Spawn zombies binnen de echte map grenzen (1920 x 1080)
        for (let i = 0; i < 20; i++) {
            let z = new Zombie();
            z.pos.setTo(Math.random() * 1800 + 50, Math.random() * 1000 + 50);
            this.add(z);
        }

        for (let i = 0; i < 10; i++) {
            let sz = new SpeedZombie();
            sz.pos.setTo(Math.random() * 1800 + 50, Math.random() * 1000 + 50);
            this.add(sz);
        }

        // HIER ZETTEN WE DE CAMERA VAST:
        this.camera.strategy.lockToActor(this.myplayer);

        // De camera mag niet buiten deze box kijken (0 t/m 1920 breed, 0 t/m 1080 hoog)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, MAP_WIDTH, MAP_HEIGHT));
    }

    onPostUpdate(engine) {
        this.zombieSpawnTimer++;
        if (this.zombieSpawnTimer >= this.zombieSpawnInterval && this.countZombies() < this.maxZombies) {
            this.zombieSpawnTimer = 0;
            this.spawnZombieAtEdge(engine);
        }

        this.ammoSpawnTimer++;
        if (this.ammoSpawnTimer >= this.ammoSpawnInterval) {
            this.ammoSpawnTimer = 0;
            this.spawnAmmoPickup();
        }
    }

    // laat een zombie net buiten het zichtbare scherm verschijnen
    spawnZombieAtEdge(engine) {
        const halfW = engine.halfDrawWidth;
        const halfH = engine.halfDrawHeight;
        const margin = 100;
        const side = Math.floor(Math.random() * 4);
        const center = this.myplayer.pos;
        let x, y;

        if (side === 0) {          // boven
            x = center.x + (Math.random() * 2 - 1) * halfW;
            y = center.y - halfH - margin;
        } else if (side === 1) {   // onder
            x = center.x + (Math.random() * 2 - 1) * halfW;
            y = center.y + halfH + margin;
        } else if (side === 2) {   // links
            x = center.x - halfW - margin;
            y = center.y + (Math.random() * 2 - 1) * halfH;
        } else {                   // rechts
            x = center.x + halfW + margin;
            y = center.y + (Math.random() * 2 - 1) * halfH;
        }

        x = Math.max(0, Math.min(MAP_WIDTH, x));
        y = Math.max(0, Math.min(MAP_HEIGHT, y));

        const zombie = Math.random() < 0.7 ? new Zombie() : new SpeedZombie();
        zombie.pos = new Vector(x, y);
        this.add(zombie);
    }

    spawnAmmoPickup() {
        const x = Math.random() * MAP_WIDTH;
        const y = Math.random() * MAP_HEIGHT;
        this.add(new AmmoPickup(x, y));
    }

    countZombies() {
        let count = 0;
        for (let actor of this.actors) {
            if (actor instanceof Zombie || actor instanceof SpeedZombie) count++;
        }
        return count;
    }
}