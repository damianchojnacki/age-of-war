import PlayerCharacter from './PlayerCharacter';

export default class Warrior extends PlayerCharacter
{
    offsetMultiplier = {
        left: 1.4,
        right: 1.5
    }

    static getSpriteSheet()
    {
        return {
            name: 'warrior',
            path: '/assets/characters/warrior/spritesheet.json'
        }
    }

    getSpriteSheet()
    {
        return Warrior.getSpriteSheet()   
    }

    getStats()
    {        
        return {
            attack: 12,
            defense: 3,
            health: 120,
        }
    }

    getScale(): number
    {
        return 1
    }

    getAnimationSpeed(): number
    {
        return 0.25
    }
}