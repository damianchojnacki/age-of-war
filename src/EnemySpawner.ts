import App from "./App";
import EnemyCharacter from "./characters/EnemyCharacter";
import Goblin from "./characters/Goblin";
import CollisionHandler from "./CollisionHandler";
import Config from "./Config";
import Stage from "./Stage";

export default class EnemySpawner
{
    constructor(app: App)
    {
        const spawnInterval = Config.getInstance().enemies.spawn.interval

        setInterval(() => {
            const enemy = new Goblin(app)
            
            if(this.canSpawn(app.stage, enemy)){
                app.stage.addCollidable(enemy)
            }
        }, spawnInterval * 1000)
    }

    canSpawn(stage: Stage, enemy: EnemyCharacter): boolean
    {
        return !!(stage.collidables.find((element) => {
            return CollisionHandler.checkCollision(element, enemy)
        })) === false
    }
}