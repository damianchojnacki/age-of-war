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
        switch(this.level){
            default: return {
                attack: 12,
                defense: 2,
                health: 100,
            }

            case 2: return {
                attack: 15,
                defense: 3,
                health: 110,
            }

            case 3: return {
                attack: 18,
                defense: 4,
                health: 120,
            }
        }
    }

    getScale(): number
    {
        return 0.15
    }

    getAnimationSpeed(): number
    {
        return 0.25
    }
}