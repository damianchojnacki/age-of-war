import App from "../App";
import Config from "../Config";
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
                    this.exp += collider.getExpForKill()

                    this.app.state.exp = this.exp
                    this.app.state.gold += collider.getGoldForKill()

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
        const increaseFactor = Config.getInstance().player.requiredExpPercentIncrease / 100

        return Math.round(100 * Math.pow(1 + increaseFactor, this.level))
    }

    levelUp(): void
    {
        this.exp -= this.getRequiredExp()

        this.level++

        this.app.state.playerLevel = this.level
        this.app.state.exp = this.exp
        this.app.state.requiredExp = this.getRequiredExp()

        const { attack, defense, health } = this.getStats()

        this.attack = attack * this.level
        this.defense = defense * this.level
        this.health = health * this.level
        this.maxHealth = this.health
    }
}