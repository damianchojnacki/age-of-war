import Character from "./Character";
import State from "./State";
import { AnimationCollection } from "./StateManager";

export default class StateWalk implements State
{
    constructor(character: Character, animations: AnimationCollection)
    {
        character.sprite.textures = animations.walk
        character.sprite.play()
    }
}