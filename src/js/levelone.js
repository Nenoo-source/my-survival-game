import { Scene, Actor, Engine, Vector, DisplayMode, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Zombie } from './zombie.js'
import { Player } from './player.js'
export class Level extends Scene {
    onInitialize(engine) {
    Scene.Camera
     
        // camera volgen player
        Scene.Camera.strategy.lockToActor(this.myplayer)
        

        let background = new Actor({ anchor: new Vector(0, 0) })
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)

        // voeg player toe 
        this.myplayer = new Player()
        this.add(this.myplayer)

         //voeg x zombies toe 
        for (let i = 0; i < 20; i++) {
            this.add(new Zombie())
        }

        
    }

    onPostUpdate(engine) {

        // if (this.myplayer.pos.x < 0) {
        //     this.myplayer.pos.x = 0
        // }
        // if (this.myplayer.pos.x > 1280) {
        //     this.myplayer.pos.x = 1280
        // }
        // if (this.myplayer.pos.y < 0) {
        //     this.myplayer.pos.y = 0
        // }
        // if (this.myplayer.pos.y > 720) {
        //     this.myplayer.pos.y = 720
        // }
        // engine.camera.strategy.lockToActor(this.myplayer)
        // engine.camera.strategy.lockToActor(this.myplayer)
    }

    onActivate(ctx) {
        console.log("reset het level")
    }
}
