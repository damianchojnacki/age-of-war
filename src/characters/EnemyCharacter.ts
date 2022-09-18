import App from "../App";
import Config from "../Config";
import Character from "./Character";
import Collidable from "./Collidable";
import PlayerCharacter from "./PlayerCharacter";

export default abstract class EnemyCharacter extends Character
{
    constructor(app: App)
    {
        super(app)

        this.level = this.app.state.enemyLevel

        this.attack *= this.level
        this.defense *= this.level
        this.health *= this.level
        this.maxHealth = this.health

        this.sprite.scale.x *= -1
        this.sprite.position.x = Config.getInstance().enemies.spawn.x
        this.sprite.position.y = Config.getInstance().enemies.spawn.y
    }

    canSpawn(spawn: {x: number, y: number})
    {
        return this.sprite.position.x + this.sprite.width > spawn.x
    }

    onTick(delta: number) 
    {   
        if(this.health <= 0){
            this.die()
            
            return;
        }

        if(!this.collision){
            this.state.walk()

            this.sprite.position.x -= this.speed * delta
        }

        this.collision = false
    }

    onCollision(collider: Collidable): void
    {
        if(this.health <= 0){
            this.drawHealthBar(-105)

            this.die()

            return;
        }

        if(collider instanceof PlayerCharacter){
            this.drawHealthBar(-105)

            if(this.state.attack()){
                collider.health -= this.attack - collider.defense

                collider.state.hurt()
            }

            return;
        }

        this.state.idle()
    }

    getExpForKill(): number
    {
        const increaseFactor = Config.getInstance().enemies.expForKillPercentIncrease / 100

        return Math.round(Math.pow(1 + increaseFactor, this.level)) * this.getExpValue()
    }

    getGoldForKill(): number
    {
        const increaseFactor = Config.getInstance().enemies.goldForKillPercentIncrease / 100

        return Math.round(Math.pow(1 + increaseFactor, this.level)) * this.getGoldValue()
    }

    protected abstract getExpValue(): number

    protected abstract getGoldValue(): number
}