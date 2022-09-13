import Collidable from "./characters/Collidable"

export default class CollisionHandler
{
    private static instance: CollisionHandler
    colliders: Collidable[]

    private constructor(colliders: Collidable[] = []){
        this.colliders = colliders
    }

    static getInstance(colliders: Collidable[] = [])
    {
        if(!CollisionHandler.instance){
            CollisionHandler.instance = new this(colliders)
        } 
          
        return CollisionHandler.instance
    }

    add(collidable: Collidable): void
    add(collidable: Collidable[]): void
    add(collidable: Collidable | Collidable[]): void
    {
        if(Array.isArray(collidable)){
            this.colliders.push(...collidable)
        } else {
            this.colliders.push(collidable)
        }
    }

    remove(collidable: Collidable): void
    {      
        this.colliders = this.colliders.filter((element) => element !== collidable)
    }

    checkCollision()
    {
        this.colliders.forEach((current) => {
            this.colliders.forEach((collider) => {
                if(
                    current.sprite.position.x < collider.sprite.position.x + collider.sprite.width * (collider.offsetMultiplier?.left ?? 1) &&
                    current.sprite.position.x + current.sprite.width * (current.offsetMultiplier?.right ?? 1) > collider.sprite.position.x &&
                    current.sprite.position.y < collider.sprite.position.y + collider.sprite.height &&
                    current.sprite.height + current.sprite.position.y > collider.sprite.position.y &&
                    current !== collider
                ) {
                    current.collision = true

                    current.onCollision(collider)
                }
            })
        })
    }

    static checkCollision(current: Collidable, collider: Collidable)
    {
        return (
            current.sprite.position.x < collider.sprite.position.x + collider.sprite.width * (collider.offsetMultiplier?.left ?? 1) &&
            current.sprite.position.x + current.sprite.width * (current.offsetMultiplier?.right ?? 1) > collider.sprite.position.x &&
            current.sprite.position.y < collider.sprite.position.y + collider.sprite.height &&
            current.sprite.height + current.sprite.position.y > collider.sprite.position.y &&
            current !== collider
        )
    }
}