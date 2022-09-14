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
        this.drawHealthBar(-110)
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
            this.die()

            return;
        }

        if(collider instanceof PlayerCharacter){
            if(this.state.attack()){
                collider.health -= this.attack - collider.defense

                collider.state.hurt()
            }

            return;
        }

        this.state.idle()
    }
}