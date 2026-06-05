import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
Zombie: new ImageSource('./images/small-zombie.png'),
Player: new ImageSource('./images/speed-zombie.png'),
//SpeedZombie: new ImageSource('./images/speed-zombie.png'),
//TankZombie: new ImageSource('./images/tank-zombie.png'),
Background: new ImageSource('./images/zsg-background.png'),
//Gun1: new Sound('./sounds/gun1.wav'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }