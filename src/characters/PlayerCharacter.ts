import App from "../App";
import Character from "./Character";
import Collidable from "./Collidable";
import EnemyCharacter from "./EnemyCharacter";

export default abstract class PlayerCharacter extends Character
{
    exp: number = 0

    constructor(app: App)
    {
        super(app)

        this.app.state.requiredExp = this.getRequiredExp()
    }

    onTick(_delta: number): void 
    {
        this.drawHealthBar(55)

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

                if(collider.health <= 0){
                    this.exp += collider.getExpValue()

                    this.app.state.exp = this.exp
                    this.app.state.gold += collider.getGoldValue()

                    if(this.exp > this.getRequiredExp()){
                        this.levelUp()
                    }
                }
            }

            return;
        }

        this.state.idle()
    }

    getRequiredExp(): number
    {
        const increaseFactor = 0.05

        return Math.round(100 * Math.pow(1 + increaseFactor, this.level))
    }

    levelUp(): void
    {
        this.exp -= this.getRequiredExp()

        this.level++

        this.app.state.exp = this.exp
        this.app.state.requiredExp = this.getRequiredExp()

        const { attack, defense, health } = this.getStats()

        this.attack = attack * this.level
        this.defense = defense * this.level
        this.health = health * this.level
        this.maxHealth = this.health
    }
}