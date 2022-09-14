import { AnimatedSprite } from "@pixi/sprite-animated"
import * as PIXI from "pixi.js"
import App from "../App"
import Config from "../Config"
import CharacterObject from "./CharacterObject"
import Collidable from "./Collidable"
import StateManager from "./StateManager"

export default abstract class Character implements CharacterObject, Collidable
{
    private app: App
    state: StateManager

    id: string
    
    level = 1
    health: number
    maxHealth: number
    attack: number
    defense: number
    speed: number = 1
    healthBar: PIXI.Graphics

    sprite!: AnimatedSprite

    collision: boolean = false
    colliders: Character[] = []

    constructor(app: App)
    {
        this.app = app
        this.id = Math.random().toString(36).slice(2)
         
        const { attack, defense, health } = this.getStats()

        this.attack = attack
        this.defense = defense
        this.health = health
        this.maxHealth = health
        
        this.state = new StateManager(this)
        
        this.sprite.position.x = Config.getInstance().player.spawn.x
        this.sprite.position.y = Config.getInstance().player.spawn.y
        this.sprite.scale.set(this.getScale())
        this.healthBar = new PIXI.Graphics()
    }

    onTick(_delta: number): void {
    }
    
    getChildren(): PIXI.DisplayObject[] {
        return [this.sprite, this.healthBar]
    }

    onCollision(_collider: Collidable) {}
    onCollisionEnter(_collider: Collidable) {}
    onCollisionLeave() {}

    die(): void
    {
        if(this.state.die()){
            this.app.stage.removeCollidable(this)
        }
    }

    drawHealthBar(xoff: number): void {
        const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
        const width = 70;
        const height = 10;
        const hp = map(this.health > 0 ? this.health : 0, 0, this.maxHealth, 0, width)
        this.healthBar.clear()
        this.healthBar
            .beginFill(0xDEDEDE)
            .drawRect(this.sprite.position.x + xoff, this.sprite.position.y, width, height)
            .endFill()
            .beginFill(0xcc1b0e)
            .drawRect(this.sprite.position.x + xoff, this.sprite.position.y, hp, height)
            .endFill()
    }

    abstract getStats(): {
        attack: number
        defense: number
        health: number
    }

    abstract getSpriteSheet(): {
        name: string
        path: string
    }

    abstract getScale(): number

    abstract getAnimationSpeed(): number
}