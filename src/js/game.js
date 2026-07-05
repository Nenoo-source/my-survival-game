import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level } from './levelone.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
           
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

   startGame() {
        this.add('level', new Level())
        this.goToScene('level')
    }
}
new Game()
