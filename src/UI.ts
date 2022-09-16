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

    constructor(app: App)
    {
        this.app = app

        this.container = new Graphics()
            .beginFill(0x000000)
            .drawRect(80, 20, 256, 120)
            .endFill()

        this.expBox = new Text('', {
            fontSize: 36,
            fill: 0xFFFFFF,
        })
        this.expBox.position.x = 100
        this.expBox.position.y = 40

        this.goldBox = new Text('', {
            fontSize: 36,
            fill: 0xFFFFFF,
        })
        this.goldBox.position.x = 100
        this.goldBox.position.y = 80
    }
    
    onTick(_delta: number): void {
        this.drawExpBox()        
        this.drawGoldBox()
    }

    getChildren(): DisplayObject[] {
        return [
            this.container,
            this.expBox,
            this.goldBox
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
}