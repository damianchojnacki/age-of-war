import Character from "./Character";
import State from "./State";
import { AnimationCollection } from "./StateManager";

export default class StateDie implements State
{
    constructor(character: Character, animations: AnimationCollection)
    {
        character.sprite.textures = animations.die
        character.sprite.loop = false
        character.sprite.play()
    }
}