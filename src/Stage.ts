import App from "./App";
import GameObject from "./GameObject";
import Collidable from "./characters/Collidable"
import EnemySpawner from "./EnemySpawner";
import Warrior from "./characters/Warrior";

export default class Stage
{
    app: App
    elements: GameObject[] = []
    collidables: Collidable[] = []

    constructor(app: App)
    {
        this.app = app
    }

    add(element: GameObject): void
    {
        this.elements.push(element)

        element.getChildren().forEach((object) => {
            this.app.engine.stage.addChild(object)
        })

        this.app.engine.ticker.add(element.onTick, element)
    }

    addCollidable(element: Collidable): void
    {
        this.add(element)

        this.collidables.push(element)
        this.app.collisionHandler.add(element)
    }

    remove(element: GameObject): void 
    {
        element.getChildren().forEach((object) => {
            this.app.engine.stage.removeChild(object)
        })

        this.app.engine.ticker.remove(element.onTick, element)
    }

    removeCollidable(element: Collidable): void 
    {
        this.app.collisionHandler.remove(element)

        this.remove(element)
    }

    spawnEnemies(): void
    {
        new EnemySpawner(this.app)
    }

    spawnPlayer(): void
    {
        this.addCollidable(new Warrior(this.app))
    }
}