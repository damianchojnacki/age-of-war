import App from "./App"

export default class GameState
{
    app: App
    gold: number = 0
    exp: number = 0
    requiredExp: number = 0
    playerLevel: number = 1
    enemyLevel: number = 1

    constructor(app: App)
    {
        this.app = app
    }

    reset()
    {
        this.gold = 0
        this.exp = 0
        this.requiredExp = 0
        this.playerLevel = 1
        this.enemyLevel = 1
    }
}