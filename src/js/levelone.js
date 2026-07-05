import { Scene, BoundingBox } from "excalibur";
import { Background } from './background.js';
import { Player } from './player.js';
import { Zombie } from './zombie.js';
import { SpeedZombie } from './speed-zombie.js';
import { Resources } from "./resources.js";

export class Level extends Scene {
    onInitialize(engine) {
        this.background = new Background();
        this.add(this.background);
     
        this.myplayer = new Player();
        this.add(this.myplayer);

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
        //this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1920, 1080));
    }
}