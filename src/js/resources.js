import { ImageSource, Loader } from 'excalibur'

// Voeg hier jouw eigen resources toe
const Resources = {
    Zombie: new ImageSource('/images/zombie.png'),
    Player: new ImageSource('/images/jeff-idle.png'),
    PlayerFire: new ImageSource('/images/jeff-shooting.png'),
    SpeedZombie: new ImageSource('/images/speed-zombie.png'),
    //TankZombie: new ImageSource('/images/tank-zombie.png'),
    Background: new ImageSource('/images/zsg-background.jpg'),
    Bullet: new ImageSource('/images/bullet.png'),
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }