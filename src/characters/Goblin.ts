import EnemyCharacter from './EnemyCharacter';

export default class Goblin extends EnemyCharacter 
{
    offsetMultiplier = {
        left: 0.5,
        right: 0.125
    }

    getStats()
    {
        switch(this.level){
            default: return {
                attack: 10,
                defense: 2,
                health: 30,
            }

            case 2: return {
                attack: 15,
                defense: 3,
                health: 40,
            }

            case 3: return {
                attack: 20,
                defense: 4,
                health: 50,
            }
        }
    }

    static getSpriteSheet()
    {
        return {
            name: "goblin", 
            path: "/assets/characters/goblin/spritesheet.json"
        }
    }

    getSpriteSheet()
    {
        return Goblin.getSpriteSheet()
    }

    getScale(): number
    {
        return 0.17
    }

    getAnimationSpeed(): number
    {
        return 0.3
    }
}