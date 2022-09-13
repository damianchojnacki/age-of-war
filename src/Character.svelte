<script>
    import { Application, Text, AnimatedSprite, Loader, getResource, track, Container, Graphics } from 'svelte-pixi'
    import * as PIXI from 'pixi.js'
    import App from './App.svelte';
import { Sprite } from 'pixi.js';

    export let character
    export let animation = "idle"
    export let x = 0, y = 400

    let instance;

    $: props = character.bind(instance, animation)
    
    $: healthBarWidth = character.health > 0 ? character.health / 2 : 0
</script>

<Graphics
    x={x - character.maxHealth / 4}
    y={y - character.sprite?.height / 2.5}
    draw={(graphics) => {
        graphics.beginFill(0x000000)
        graphics.drawRect(0, 0, character.maxHealth / 2, 5)

        graphics.beginFill(0xcc3333)
        graphics.drawRect(0, 0, healthBarWidth, 5)

        graphics.endFill()
    }}
/>

<AnimatedSprite
    bind:instance
    playing
    {x}
    {y}
    anchor={0.5}
    {...props}
/>


  