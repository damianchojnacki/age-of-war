import Character from "./Character";
import State from "./State";
import StateIdle from "./StateIdle";
import StateWalk from "./StateWalk";
import * as PIXI from "pixi.js"
import StateAttack from "./StateAttack";
import StateHurt from "./StateHurt";
import StateDie from "./StateDie";

export type AnimationCollection = PIXI.utils.Dict<PIXI.Texture<PIXI.Resource>[]>

export default class StateManager
{
    character: Character
    current!: State;
    animations: AnimationCollection
    lastAttackTime: number = 0
    lastHurtTime: number = 0
    dieTime: number = 0

    constructor(character: Character)
    {
        this.character = character

        const {name} = character.getSpriteSheet();

        const animations = PIXI.Loader.shared.resources[name]?.spritesheet?.animations

        if(!animations?.idle){
            throw new Error(`Character idle animation not found.`)
        }

        this.animations = animations

        character.sprite = new PIXI.AnimatedSprite(animations.idle);
        character.sprite.animationSpeed = character.getAnimationSpeed()

        this.idle()
    }

    idle(): void
    {
        if(this.current instanceof StateIdle){
            return;
        }

        this.current = new StateIdle(this.character, this.animations)
    }

    walk(): void
    {
        if(this.current instanceof StateWalk){
            return;
        }
        
        this.current = new StateWalk(this.character, this.animations)
    }

    die(): boolean
    {
        const now = Date.now()

        if(!this.isDying() && now - this.dieTime > 1000){
            this.current = new StateDie(this.character, this.animations)

            this.dieTime = now
            
            return false
        } else if(now - this.dieTime > 900) {
            return true
        }

        return false
    }

    attack(): boolean
    {
        if(this.current instanceof StateAttack){
            return false;
        }

        const now = Date.now()

        if(!this.isAttacking() && now - this.lastAttackTime > 1000){
            this.current = new StateAttack(this.character, this.animations)

            this.lastAttackTime = now

            return true
        } else if(now - this.lastAttackTime > 500){
            this.idle()
        }

        return false
    }

    hurt(): boolean
    {
        if(this.current instanceof StateHurt){
            return false
        }

        const now = Date.now()

        if(!this.isHurted() && now - this.lastHurtTime > 1000){
            this.current = new StateHurt(this.character, this.animations)

            this.lastHurtTime = now

            return true
        } else if(now - this.lastHurtTime > 500){
            this.idle()
        }

        return false
    }

    isAttacking(): boolean
    {
        return this.current instanceof StateAttack
    }

    isHurted(): boolean
    {
        return this.current instanceof StateHurt
    }

    isDying(): boolean
    {
        return this.current instanceof StateDie
    }
}