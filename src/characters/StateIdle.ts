import Character from "./Character";
import State from "./State";
import { AnimationCollection } from "./StateManager";

export default class StateIdle implements State
{
    constructor(character: Character, animations: AnimationCollection)
    {
        character.sprite.textures = animations.idle
        character.sprite.play()
    }
}