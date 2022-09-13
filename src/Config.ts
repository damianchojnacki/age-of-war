import type ConfiguresApplication from "./ConfiguresApplication"

export default class Config 
{
    private constructor() {}

    static getInstance(): ConfiguresApplication
    {
        return {
            render: {
                //width: 1280,
                //height: 720,
                view: document.getElementById('app') as HTMLCanvasElement,
                resizeTo: window,
                antialias: false,
                backgroundColor: 0xFFFFFF,
                resolution: 2,
                autoDensity: true,
                autoStart: false,
            },
            player: {
                spawn: {
                    x: 100,
                    y: 400,
                }
            },
            enemies: {
                spawn: {
                    x: 500,
                    y: 400,
                    interval: 3,
                }
            }
        }
    }
}