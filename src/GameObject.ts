import { DisplayObject } from "@pixi/display";

export type SpriteSheet = {
    name: string
    path: string
}

export default interface GameObject {
    onTick(delta: number): void
    getChildren(): DisplayObject[]
    //getSpriteSheet(): SpriteSheet | null
}