const canvas =document.querySelector('canvas');
const ctx= canvas.getContext('2d');
canvas.width=1024
canvas.height=576

const gravedad= 0.5

class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.velocity={
            x:0,
            y:1
        }
        this.width =30
        this.height=30
    }
     drawPlayer(){
        ctx.fillStyle='red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
     update(){
        this.drawPlayer()
        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y +=gravedad
        else this.velocity.y=0
    }

}

class Plataform{
    constructor({x,y,image}){
        this.position={
            x,
            y
        }
        this.image=image

    }
    draw(){
        ctx.drawImage(this.image,this.position.x, this.position.y,this.image.width,this.image.height)
       
    }
}

class GenericObject{
    constructor({x,y,image}){
        this.position={
            x,
            y
        }
        this.image=image
       
    }
    draw(){
        ctx.drawImage(this.image,this.position.x, this.position.y,this.image.width,this.image.height)
       
    }
}

function createImage(ImageSrc){
    const image =new Image()
    image.src=ImageSrc
return image
}    

const ImagenSuelo = createImage('./assets/img/Suelo.jpg')
const FondoJuego =createImage('./assets/img/fondoJuego.jpg')


/* image.onload=function(){ */
    const player= new Player()

const plataforms=[new Plataform({x:-1,y:470,image:ImagenSuelo}),new Plataform({x:500,y:470,image:ImagenSuelo})]


///Objetos del juego
const genericObjects= [
    new GenericObject({
        x:500,
        y:500,
        image: ImagenSuelo
        
    })
]


const keys ={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}



function animacion(){
    requestAnimationFrame(animacion)
    ctx.fillStyle='white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(FondoJuego, 0, 0, canvas.width, canvas.height);
    genericObjects.forEach((genericObject)=>{
        genericObject.draw()
    })

  
    plataforms.forEach((plataform)=>{
        plataform.draw()
    })
    player.update()  

    if (keys.right.pressed && player.position.x<400){
        player.velocity.x=5
    }else if(keys.left.pressed && player.position.x>100){
        player.velocity.x=-5
    }else {
       player.velocity.x=0 

       if (keys.right.pressed){
        plataforms.forEach((plataform)=>{
            plataform.position.x-=5
        })
       
       }else if (keys.left.pressed){
        plataforms.forEach((plataform)=>{
            plataform.position.x +=5
        })
      
       }
    }
    plataforms.forEach((plataform)=>{
    if (player.position.y + player.height <=
        plataform.position.y && player.position.y + player.height+player.velocity.y>=
        plataform.position.y && player.position.x + player.width>=
        plataform.position.x && player.position.x <=
        plataform.position.x+plataform.image.width)
        {
            player.velocity.y=0
        }
    })
}
animacion()

addEventListener('keydown', ({keyCode}) => {
/* console.log(keyCode) */
switch(keyCode){
    case 37:
        console.log('left')
        keys.left.pressed=true
    break;

    case 40: 
        console.log('down')

    break;

    case 39:
        console.log('right')
       keys.right.pressed=true
    break;

    case 38: 
        console.log('up')
        player.velocity.y -=10
        break;

}
})

addEventListener('keyup', ({keyCode}) => {
    /* console.log(keyCode) */
    switch(keyCode){
        case 37:
            console.log('left')
            keys.left.pressed=false
        break;
    
        case 40: 
            console.log('down')
    
        break;
    
        case 39:
            console.log('right')
            keys.right.pressed=false            
        break;
    
        case 38: 
            console.log('up')
            player.velocity.y -=10
            break;
    
    }
    })

/* }
 */

