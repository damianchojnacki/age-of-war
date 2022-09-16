import EnemyCharacter from './EnemyCharacter';

export default class Goblin extends EnemyCharacter 
{
    offsetMultiplier = {
        left: 0.5,
        right: 0.125
    }

    getStats()
    {
        return {
            attack: 9,
            defense: 2,
            health: 30,
        }
    }

    getExpValue()
    {
        return 16
    }

    getGoldValue()
    {
        return 2
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