import Character from "./Character";
import Collidable from "./Collidable";
import EnemyCharacter from "./EnemyCharacter";

export default abstract class PlayerCharacter extends Character
{
    onTick(_delta: number): void 
    {
        this.drawHealthBar(40)
        if(!this.collision){
            this.state.idle()
        }

        this.collision = false
    }
    
    onCollision(collider: Collidable): void
    {
        if(collider instanceof EnemyCharacter){
            if(this.state.attack()){
                collider.health -= this.attack - collider.defense

                collider.state.hurt()
            }

            return;
        }

        this.state.idle()
    }
}