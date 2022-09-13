import Character from "./Character";
import State from "./State";
import { AnimationCollection } from "./StateManager";

export default class StateAttack implements State
{
    constructor(character: Character, animations: AnimationCollection)
    {
        character.sprite.textures = animations.attack
        character.sprite.play()
    }
}