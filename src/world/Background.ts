import * as PIXI from 'pixi.js'
import WorldObject from './WorldObject'

export default class Background implements WorldObject
{
    layers: PIXI.Sprite[] = []
    clouds: PIXI.TilingSprite

    scale: number = 0.4
    cloudsSpeed: number = 0.3

    constructor()
    {
        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/battleground.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/back_land.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/back_decor.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/back_decor.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/back_wall.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/ground_decor.png')
        )

        this.layers.push(
            PIXI.Sprite.from('/assets/backgrounds/game_background_4/layers/front_decor.png')
        )

        this.layers.forEach((sprite, index) => {
            sprite.scale.set(this.scale)

            sprite.zIndex = (index + 1) * 10
        })

        this.clouds = PIXI.TilingSprite.from('/assets/backgrounds/game_background_4/layers/clouds.png', {
            width: window.innerWidth * 3,
            height: window.innerHeight
        })

        this.clouds.scale.set(this.scale)
        this.clouds.zIndex = 20
    }

    onTick(delta: number)
    {
        this.clouds.tilePosition.x += this.cloudsSpeed * delta
    }

    getChildren()
    {
        return [
            ...this.layers,
            this.clouds,
        ]
    }

    getSpriteSheet()
    {
        return null
    }

}