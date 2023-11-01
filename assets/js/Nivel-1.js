const canvas =document.querySelector('canvas');
const ctx= canvas.getContext('2d');
canvas.width=1024
canvas.height=576

const gravedad= 1.5
var vidas=3
const backgroundMusic=document.getElementById('FondoMusica1')


//LOADER
function drawLoader(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()
    ctx.arc(canvas.width/2,canvas.height/2,30,0,2*Math.PI)
    ctx.strokeStyle='green'
    ctx.lineWidth=5
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(canvas.width/2,canvas.height/2,30,0,2*Math.PI*(Date.now()%2000)/2000)
    ctx.strokeRect='Red'
    ctx.lineWidth=5
    ctx.stroke()

    ctx.font='16px Arial'
    ctx.fillStyle='White'
    ctx.textAlign='center'
    ctx.fillText('Nivel 1', canvas.width/2,canvas.height/2+50)

    if(Date.now() -startTime>=5000){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        IniciarJuego()
        backgroundMusic.play()
    } else{
        requestAnimationFrame(drawLoader)
    }
}
const startTime=Date.now()
drawLoader()

function IniciarJuego(){
    
   
//PAUSA


//JUEGO
    class Player{
        constructor(){
            this.speed =10
            this.position={
                x:100,
                y:100
            }
            this.velocity={
                x:0,
                y:0
            }
            this.width =200
            this.height=200
            this.image =Sprite
            this.frames = 0
            this.sprites ={
                stand:{
                    right:Sprite,
                    cropwidth:348
                },
                run:{
                    right:SpriteDRun,
                    cropwidth:272
                }
            }
            this.currentSprite= this.sprites.stand.right
            this.currentCropWidth =348
        }
         drawPlayer(){
            ctx.drawImage(
                this.currentSprite,
                this.currentCropWidth* this.frames,
                0,
                this.currentCropWidth,
                239,
                this.position.x, 
                this.position.y,
                this.width,
                this.height)
           
            
        }
         update(){
            this.frames++
            if(this.frames >3) this.frames=0
            this.drawPlayer()
            this.position.x +=this.velocity.x
            this.position.y +=this.velocity.y
    
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y +=gravedad
            
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
    
    let ImagenSuelo = createImage('./assets/img/Plataforma.png')
    let FondoJuego =createImage('./assets/img/fondoCeleste.jpg')
    let Nubes = createImage('./assets/img/Nubes.png')
    let Arbol = createImage('./assets/img/Arbol.png')
    let Sprite =createImage('./assets/img/SpriteInicial.png')
    let SpriteDRun =createImage('./assets/img/SpriteDRun.png')

    let player= new Player()
    
    let plataforms=[new Plataform({
        x:-1,
        y:470,
        image:ImagenSuelo
    }),
    new Plataform({
        x:299,
        y:470,
        image:ImagenSuelo
    })]
    
    
    ///Objetos del juego
    let genericObjects= [
        new GenericObject({
            x:100,
            y:50,
            image: Nubes
            
        }),
        new GenericObject({
            x:500,
            y:50,
            image: Nubes
            
        }),
        new GenericObject({
            x:100,
            y:190,
            image: Arbol
            
        })

    ]
    
    
    let keys ={
        right:{
            pressed:false
        },
        left:{
            pressed:false
        }
    }

    let ScrollOffset = 0
    

    function init(){
    
     player= new Player()
     plataforms=[new Plataform({
        x:-1,
        y:470,
        image:ImagenSuelo
    }),
    new Plataform({
        x:299,
        y:470,
        image:ImagenSuelo
    })]
    
    
    ///Objetos del juego
      genericObjects= [
        new GenericObject({
            x:100,
            y:50,
            image: Nubes
            
        }),
        new GenericObject({
            x:500,
            y:50,
            image: Nubes
            
        }),
        new GenericObject({
            x:100,
            y:190,
            image: Arbol
            
        })

    ]
    
    
     keys ={
        right:{
            pressed:false
        },
        left:{
            pressed:false
        }
    }

    ScrollOffset=0;
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
            player.velocity.x= player.speed
        }else if((keys.left.pressed && player.position.x>100)||
         (keys.left.pressed && ScrollOffset === 0 && player.position.x >0)){
            player.velocity.x=-player.speed
        }else {
           player.velocity.x=0 
    
           if (keys.right.pressed){
            ScrollOffset +=player.speed

            plataforms.forEach((plataform)=>{
                plataform.position.x-=player.speed
            })
           
            genericObjects.forEach((genericObject)=>{
                genericObject.position.x -= player.speed * 0.66
            })

           }else if (keys.left.pressed && ScrollOffset > 0){
            ScrollOffset -=player.speed
            plataforms.forEach((plataform)=>{
                plataform.position.x += player.speed
            })
          
            genericObjects.forEach((genericObject)=>{
                genericObject.position.x += player.speed * 0.66
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
//META
        if (ScrollOffset > 1000 ){
            console.log('Ganaste')
        }
//PERDISTE VIDA
        if (player.position.y>canvas.height){
            vidas--;
            init()
            if (vidas<0){
                alert("GAME OVER")
                window.location.href="index.html"
            }
        }
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText('Vidas: ' + vidas, 20, 30);
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
           player.currentSprite =player.sprites.run.right
           player.currentCropWidth =player.sprites.run.cropwidth
        break;
    
        case 38: 
            console.log('up')
            player.velocity.y -=20
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
                
                break;
        
        }
        })
    
    }
   