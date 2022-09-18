import App from "./App";
import EnemyCharacter from "./characters/EnemyCharacter";
import Goblin from "./characters/Goblin";
import CollisionHandler from "./CollisionHandler";
import Config from "./Config";
import Stage from "./Stage";

export default class EnemySpawner
{
    protected app: App

    lastSpawnTime: number = 0

    constructor(app: App)
    {
        const spawnInterval = Config.getInstance().enemies.spawn.interval * 1000

        this.app = app

        this.app.engine.ticker.add(() => {
            if(Date.now() - this.lastSpawnTime > spawnInterval){
                this.spawn()
            }
        })
    }

    canSpawn(stage: Stage, enemy: EnemyCharacter): boolean
    {
        return !!(stage.collidables.find((element) => {
            return CollisionHandler.checkCollision(element, enemy)
        })) === false
    }

    spawn(): void
    {
        if(this.shouldLevelUp()){
            this.app.state.enemyLevel++
        }

        const enemy = new Goblin(this.app)
            
        if(this.canSpawn(this.app.stage, enemy)){
            this.app.stage.addCollidable(enemy)

            this.lastSpawnTime = Date.now()
        }
    }

    shouldLevelUp()
    {
        const current = this.app.stage.elements.filter((element) => element instanceof EnemyCharacter).length

        const increaseFactor = Config.getInstance().enemies.levelUpPercentIncrease / 100

        const threshold = Math.round(10 * Math.pow(1 + increaseFactor, this.app.state.enemyLevel))

        return current > threshold
    }
}