import { IApplicationOptions } from "@pixi/app"

export default interface ConfiguresApplication
{
    render?: IApplicationOptions

    player: {
        spawn: {
            x: number
            y: number
        }
    }

    enemies: {
        spawn: {
            x: number
            y: number
            interval: number
        }
    }
}