import * as PIXI from 'pixi.js'
import Goblin from './characters/Goblin';
import Warrior from './characters/Warrior';
import CollisionHandler from './CollisionHandler';
import ConfiguresApplication from './ConfiguresApplication';
import LoadingScreen from './LoadingScreen';
import Stage from './Stage';
import Background from './world/Background';

/**
 * Application
 */
export default class App {
    engine: PIXI.Application
    config: ConfiguresApplication
    stage: Stage
    collisionHandler: CollisionHandler

    /**
     * Creates new {@link https://pixijs.download/release/docs/PIXI.Application.html Pixi.js Application} with provided config.
     *
     * @param {object} [config] - Optional renderer parameters.
     *
     * <p>Default config:</p>
     * @param {number} config.width - screen width
     * @param {number} config.height - screen height
     * @param {boolean} config.antialias - false
     * @param {number} config.backgroundColor - white
     *
     * <p>These two parameters enables SSAA</p>
     *
     * @param {number} config.resolution - 2 (SSAA multipler)
     * @param {number} config.autoDensity - true
     *
     * @returns {PIXI.Application}
     */
    constructor(config: ConfiguresApplication){
        PIXI.settings.RESOLUTION = window.devicePixelRatio
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

        this.engine = new PIXI.Application(config.render)
        this.config = config

        document.body.appendChild(this.engine.view)

        this.collisionHandler = CollisionHandler.getInstance()
        this.stage = new Stage(this)
    }

    /**
     * Loads all renderer resources.
     */
    async loadResources(loading: LoadingScreen): Promise<void>
    {
        return new Promise((resolve) => {
            const resources = [
                Goblin.getSpriteSheet(),
                Warrior.getSpriteSheet()
            ]

            resources.forEach(({name, path}) => {
                PIXI.Loader
                .shared
                .add(name, path)
            })

            PIXI.Loader
                .shared
                .onProgress
                .add(({progress}) => loading.update(progress))

            PIXI.Loader
                .shared
                .load(() => resolve())
        })
    }

    async start()
    {
        const loading = new LoadingScreen()

        await this.loadResources(loading);

        this.engine.ticker.stop()

        this.setupStage()
        
        this.engine.ticker.add(this.collisionHandler.checkCollision, this.collisionHandler)

        this.finishSetup(loading)
    }

    async finishSetup(loading: LoadingScreen)
    {
        this.engine.start()

        setTimeout(() => {
            loading.hide()

            this.engine.ticker.start()
        }, 2000)
    }

    setupStage(): void
    {
        this.stage.add(new Background())
        this.stage.spawnPlayer()
        this.stage.spawnEnemies()
    }
}