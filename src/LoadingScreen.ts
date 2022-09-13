export default class LoadingScreen 
{
    progress: number = 0
    container: HTMLElement
    progressElement: HTMLElement

    constructor()
    {
        const container = document.createElement('div')
        container.classList.add('spinner')

        const ball = document.createElement('div')
        ball.classList.add('ball')
        container.appendChild(ball)

        const loading = document.createElement('p')
        loading.innerText = 'LOADING'

        container.appendChild(loading)
        
        const progress = document.createElement('p')
        progress.innerText = '(0 %)'

        container.appendChild(progress)

        document.body.appendChild(container)

        this.progressElement = progress
        this.container = container
    }

    update(progress: number)
    {
        this.progress = progress

        this.progressElement.innerText = `(${progress} %)`
    }

    hide()
    {
        this.container.style.opacity = '0';

        setTimeout(() => this.container.remove(), 1000)
    }
}