import { DisplayObject } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Text } from "@pixi/text";
import App from "./App";
import GameObject from "./GameObject";

export default class UI implements GameObject
{
    protected app: App

    container: Graphics
    expBox: Text
    goldBox: Text
    playerLevelBox: Text
    enemyLevelBox: Text

    constructor(app: App)
    {
        this.app = app

        this.container = new Graphics()
            .beginFill(0x000000)
            .drawRect(80, 20, 256, 160)
            .endFill()

        this.expBox = new Text('', {
            fontSize: 16,
            fill: 0xFFFFFF,
        })

        this.expBox.position.x = 100
        this.expBox.position.y = 40

        this.goldBox = new Text('', {
            fontSize: 16,
            fill: 0xFFFFFF,
        })

        this.goldBox.position.x = 100
        this.goldBox.position.y = 60

        this.playerLevelBox = new Text('', {
            fontSize: 16,
            fill: 0xFFFFFF,
        })

        this.playerLevelBox.position.x = 100
        this.playerLevelBox.position.y = 80

        this.enemyLevelBox = new Text('', {
            fontSize: 16,
            fill: 0xFFFFFF,
        })

        this.enemyLevelBox.position.x = 100
        this.enemyLevelBox.position.y = 100
    }
    
    onTick(_delta: number): void {
        this.drawExpBox()        
        this.drawGoldBox()
        this.drawPlayerLevelBox()
        this.drawEnemyLevelBox()
    }

    getChildren(): DisplayObject[] {
        return [
            this.container,
            this.expBox,
            this.goldBox,
            this.playerLevelBox,
            this.enemyLevelBox
        ]
    }

    drawExpBox()
    {
        this.expBox.text = `EXP: ${this.app.state.exp} / ${this.app.state.requiredExp}`
        this.expBox.updateText(true)
    }

    drawGoldBox()
    {
        this.goldBox.text = `GOLD: ${this.app.state.gold}`
        this.goldBox.updateText(true)
    }

    drawPlayerLevelBox()
    {
        this.playerLevelBox.text = `PLAYER LVL: ${this.app.state.playerLevel}`
        this.playerLevelBox.updateText(true)
    }

    drawEnemyLevelBox()
    {
        this.enemyLevelBox.text = `ENEMY LVL: ${this.app.state.enemyLevel}`
        this.enemyLevelBox.updateText(true)
    }
}