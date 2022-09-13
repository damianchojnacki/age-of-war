import { Sprite } from "@pixi/sprite";
import GameObject from "../GameObject";

export default interface Collidable extends GameObject
{
    sprite: Sprite
    collision: boolean
    offsetMultiplier?: {
        left?: number
        right?: number
    }

    onCollision(collider: Collidable): void
    onCollisionEnter(collider: Collidable): void
    onCollisionLeave(): void
}