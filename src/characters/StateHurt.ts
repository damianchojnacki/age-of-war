import Character from "./Character";
import State from "./State";
import { AnimationCollection } from "./StateManager";

export default class StateHurt implements State
{
    constructor(character: Character, animations: AnimationCollection)
    {
        character.sprite.textures = animations.hurt
        character.sprite.play()
    }
}