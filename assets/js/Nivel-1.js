const canvas =document.querySelector('canvas');
const ctx= canvas.getContext('2d');
canvas.width=1024
canvas.height=576
let gameState='loading'
const gravedad= 1.5
var vidas=3
var Monedas=0
let timepoLimite = 180
const backgroundMusic=document.getElementById('FondoMusica1')
const salto= document.getElementById('salto')
const perder = document.getElementById('gameover')
const money=document.getElementById('Money')


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
        ctx.font='16px Arial'
    ctx.fillStyle='White'
    ctx.textAlign='center'
    ctx.fillText('PRESS ENTER ', canvas.width/2,canvas.height/2+50)
    document.addEventListener('keydown',function(event){
        if (event.key==="Enter"){
            gameState='playing'
            ctx.clearRect(0,0,canvas.width,canvas.height)
            IniciarJuego()
            backgroundMusic.play()
        }
    })
        
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
            this.width =66
            this.height=150
            this.image =Sprite
            this.frames = 0
            this.sprites ={
                stand:{
                    right:Sprite,
                    left:SpriteI,
                    cropwidth:110
                },
                run:{
                    right:SpriteDRun,
                    left:SpriteIRun,
                    cropwidth:130
                }
            }
            this.currentSprite= this.sprites.stand.right
            this.currentCropWidth =110
            this.coins =[]
            this.enSuelo=true
        }
        agregarMoneda(x,y){
            const moneda = new Coins(x,y)
            this.coins.push(moneda)
        }
        recogerMonedas(){
            for (let i= this.coins.length-1; i>=0;i--){
                const moneda =this.coins[i]
                if(this.position.x < moneda.position.x + moneda.width &&
                    this.position.x + this.width > moneda.position.x &&
                    this.position.y < moneda.position.y +moneda.height &&
                    this.position.y + this.height > moneda.position.y)
                    {
                        this.coins.splice(i,1)
                    }
            }
        }

         drawPlayer(){
            ctx.drawImage(
                this.currentSprite,
                this.currentCropWidth* this.frames,
                0,
                this.currentCropWidth,
                165,
                this.position.x, 
                this.position.y,
                this.width,
                this.height)
           
            
        }
       
        update(){
            this.frames++
            if(this.frames >28 && (this.currentSprite===this.sprites.stand.right || this.sprites.stand.left)) 
            this.frames=1
            else if(
                this.frames>29 && (this.currentSprite===this.sprites.run.right || this.currentSprite===this.sprites.run.left)
            )
            this.frames=1

            this.drawPlayer()
            this.position.x +=this.velocity.x
            this.position.y +=this.velocity.y
    
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y +=gravedad
            
           if(this.position.y+this.height>=canvas.height){
            this.enSuelo=true
           }
        }
       
    
    }

    
    
class Enemy{

        constructor({ x, y, width, height, image }) {
            this.position = {
                x: x,
                y: y
            };
            this.width = width;
            this.height = height;
            this.image = image;
            this.frames = 0;
            this.sprites = {
                stand: {
                    right: image,
                    cropwidth: width
                }
            };
            this.currentSprite = this.sprites.stand.right;
            this.currentCropWidth = width;
            this.IsAlive = true;
            this.velocity = {
                x: -2,
                y: 0
            };
            this.movementCounter = 0;
            this.velocityY=0
        }
        
           
        
    draw(){
       
        if(this.IsAlive){
              let IsonPlatform = false
              for(let plataform of plataforms){
                if(this.position.x < plataform.position.x + plataform.image.width &&
                    this.position.x + this.width > plataform.position.x &&
                    this.position.y < plataform.position.y +plataform.image.height &&
                    this.position.y + this.height > plataform.position.y)
                    {
                        IsonPlatform=true
                        break;
                    }
              }
              if(!IsonPlatform){
                this.velocityY +=1
                if (this.position.y>canvas.height){
                    this.IsAlive=false
                }  
            }else{
                this.velocityY=0
                
              }
                this.position.y +=this.velocityY
              }
             
             ctx.drawImage( 
                this.currentSprite,
                this.frames*this.width,
                0,
                this.width,
                this.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
          
            
            this.movementCounter++
            if(this.movementCounter>=10){
                this.frames++
                this.movementCounter=0
            }
            if(this.frames >=this.image.width /this.width){
                this.frames=0
            }
            this.position.x+=this.velocity.x
              
       
       
    }

    checkColision(player){
        if(player.position.x < this.position.x + this.width &&
            player.position.x +player.width>this.position.x &&
            player.position.y <this.position.y + this.height &&
            player.position.y +player.height>this.position.y
            ){
                if(player.position.y < this.position.y){
                    vidas--
                    if(vidas<=0){
                        gameState='gameOver'
                        GameOver=false
                    }else{
                        init()
                    }
                    }
                }
            }
    }
    

    

    //GANASTE
class final{
    constructor({x,y,width,height,image}){
        this.position={
            x,
            y
        }
        this.width = width;
        this.height = height;
        this.image= image
        
        this.velocityY=0
    }
    draw(){
        let IsonPlatform = false
              for(let plataform of plataforms){
                if(this.position.x < plataform.position.x + plataform.image.width &&
                    this.position.x + this.width > plataform.position.x &&
                    this.position.y < plataform.position.y +plataform.image.height &&
                    this.position.y + this.height > plataform.position.y)
                    {
                        IsonPlatform=true
                        break;
                    }
              }
              if(!IsonPlatform){
                this.velocityY +=1
            }else{
                this.velocityY=0
                
              }
                this.position.y +=this.velocityY

            

        ctx.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
    }
    ColisionFinal(player){
        if(player.position.x < this.position.x + this.width &&
            player.position.x +player.width>this.position.x &&
            player.position.y <this.position.y + this.height &&
            player.position.y +player.height>this.position.y
            ){
                if(player.position.y < this.position.y){
                   localStorage.setItem('vidas',vidas)
                   localStorage.setItem('Monedas',Monedas)
                   window.location.href="Nivel 2.html"
                    }
                }
    }
}

//PLATAFORMA
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
    class FallingPlataform extends Plataform{
        constructor({x,y,image,fallspeed}){
            super({x,y,image})
            this.fallspeed=fallspeed
            this.falling=false
        }
        fall(){
            if(this.falling){
                this.position.y += this.fallspeed
            }
        }
        
    }
    
    //TRAMPA
    class trampa{
        constructor({x,y,width,height,image}){
            this.position={
                x,
                y
            }
            this.width = width;
            this.height = height;  
            this.image=image
            this.velocityY=0
        }
        draw(){
            let IsonPlatform = false
            for(let plataform of plataforms){
              if(this.position.x < plataform.position.x + plataform.image.width &&
                  this.position.x + this.width > plataform.position.x &&
                  this.position.y < plataform.position.y +plataform.image.height &&
                  this.position.y + this.height > plataform.position.y)
                  {
                      IsonPlatform=true
                      break;
                  }
            }
            if(!IsonPlatform){
              this.velocityY +=1
          }else{
              this.velocityY=0
              
            }
              this.position.y +=this.velocityY
            ctx.drawImage(this.image,this.position.x, this.position.y,this.image.width,this.image.height)
        }
        ColisionTrampa(player){
            if( player.position.x < this.position.x + this.image.width &&
                player.position.x +player.width>this.position.x &&
                player.position.y <this.position.y + this.image.height &&
                player.position.y +player.height>this.position.y
                ){
                    if(player.position.y < this.position.y){
                        vidas--
                        if(vidas<=0){
                            gameState='gameOver'
                            GameOver=false
                        }else{
                            init()
                        }

                }
        }
       
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

    //Monedas
    class Coins{
        constructor({x,y,width,height,image}){
            this.position={
                x,
                y
            }
            this.width = width;
            this.height = height;
            this.image= image
            this.colisionada=false
            this.velocityY=0
           
        }
        draw(){
            if(!this.colisionada){
            let IsonPlatform = false
                  for(let plataform of plataforms){
                    if(this.position.x < plataform.position.x + plataform.image.width &&
                        this.position.x + this.width > plataform.position.x &&
                        this.position.y < plataform.position.y +plataform.image.height &&
                        this.position.y + this.height > plataform.position.y)
                        {
                            IsonPlatform=true
                            break;
                        }
                  }
                  if(!IsonPlatform){
                    this.velocityY +=1
                }else{
                    this.velocityY=0
                    
                  }
                    this.position.y +=this.velocityY
    
                    ctx.drawImage(this.image,this.position.x, this.position.y,this.width,this.height)
                }
            
        }
        ColisionFinal(player){
            if(!this.colisionada && player.position.x < this.position.x + this.image.width &&
                player.position.x +player.width>this.position.x &&
                player.position.y <this.position.y + this.image.height &&
                player.position.y +player.height>this.position.y
                ){
                    if(player.position.y < this.position.y){
                       money.play()
                        Monedas++
                        this.colisionada=true
                        }
                    }
        }
    }
    

    function createImage(ImageSrc){
        const image =new Image()
        image.src=ImageSrc
    return image
    }    
    
    //Imagenes y sprites
    let ImagenSuelo = createImage('./assets/img/PlataformaG.png')
    let ImagenSueloP = createImage('./assets/img/Plataforma.png')
    let FondoJuego =createImage('./assets/img/fondoCeleste.jpg')
    let Nubes = createImage('./assets/img/Nubes1.png')
    let Arbol = createImage('./assets/img/Arbol.png')
    let Sprite =createImage('./assets/img/SpriteInicial.png')
    let SpriteDRun =createImage('./assets/img/SpriteDRun.png')
    let SpriteI =createImage('./assets/img/SpriteIniciali.png')
    let SpriteIRun=createImage('./assets/img/SpriteIRun.png')
    let Enemie1 =createImage('./assets/img/Enemie1.png')
    let BanderaFinal = createImage('./assets/img/Final.png')
    let monedas = createImage('./assets/img/monedas.png')
    /* let Enemie2 = createImage('./assets/img/plantaEnemie.png') */
    let pincho= createImage('./assets/img/trampa.png')
   

    
let moned = [
    new Coins({x:1250,y:100,width:40,height:40,image:monedas}),
    new Coins({x:1250,y:350,width:40,height:40,image:monedas}),
    new Coins({x:1800,y:100,width:40,height:40,image:monedas}),
    new Coins({x:2500,y:100,width:40,height:40,image:monedas}),
    new Coins({x:2900,y:100,width:40,height:40,image:monedas}),
    new Coins({x:3300,y:100,width:40,height:40,image:monedas}),
    new Coins({x:4100,y:100,width:40,height:40,image:monedas}),
    new Coins({x:4300,y:100,width:40,height:40,image:monedas}), 
    new Coins({x:5000,y:100,width:40,height:40,image:monedas}),
    new Coins({x:5200,y:100,width:40,height:40,image:monedas}), 
    new Coins({x:5500,y:100,width:40,height:40,image:monedas}),
]

let enemigo1=[
    new Enemy({x:600,y:100,width:50,height:50,image:Enemie1}),
    new Enemy({x:1700,y:100,width:50,height:50,image:Enemie1}),
    new Enemy({x:2100,y:100,width:50,height:50,image:Enemie1}),
   
]

let Trampas =[
    new trampa({x:1300, y:100, width:80, height:25, image:pincho }),
    new trampa({x:3900, y:100, width:80, height:25, image:pincho }),
    new trampa({x:4200, y:100, width:80, height:25, image:pincho }),
    new trampa({x:4900, y:100, width:80, height:25, image:pincho }),
    new trampa({x:5600, y:100, width:80, height:25, image:pincho }),
]
    let player= new Player()


    let Bandera =[
        new final({x:6800, y:100,width:40,height:46,image:BanderaFinal})
    ]
//PLATAFORMA
    let plataforms=[
    new Plataform({x:-1, y:470, image:ImagenSuelo }),
    new Plataform({x:1200, y:470, image:ImagenSuelo}),
    new Plataform({x:1200, y:367, image:ImagenSueloP}),
    new Plataform({x:1200, y:170, image:ImagenSueloP}),
    new Plataform({x:1700, y:300, image:ImagenSueloP}),
    new Plataform({x:2400, y:470, image:ImagenSueloP}),
    new Plataform({x:2800, y:470, image:ImagenSueloP}),
    new Plataform({x:3200, y:470, image:ImagenSueloP}),
    new Plataform({x:3600, y:470, image:ImagenSuelo}),
    new Plataform({x:4800, y:470, image:ImagenSuelo}),
    new Plataform({x:5800, y:370, image:ImagenSueloP}),
    new Plataform({x:6600, y:310, image:ImagenSueloP})
    ]
    
    let fallPlataform = [
        new FallingPlataform({x:6200, y:340, image:ImagenSueloP,fallspeed:4})
    ]
    ///Objetos del juego
    let genericObjects= [
        new GenericObject({x:500,y:50,image: Nubes}),
        new GenericObject({x:-1,y:190,image: Arbol}),
        new GenericObject({x:100,y:190,image: Arbol}),
        new GenericObject({x:160,y:190,image: Arbol}),
        new GenericObject({x:1000,y:190,image: Arbol}),
        new GenericObject({x:1200,y:190,image: Arbol}),
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
        moned = [
            new Coins({x:1250,y:100,width:40,height:40,image:monedas}),
    new Coins({x:1250,y:350,width:40,height:40,image:monedas}),
    new Coins({x:1800,y:100,width:40,height:40,image:monedas}),
    new Coins({x:2500,y:100,width:40,height:40,image:monedas}),
    new Coins({x:2900,y:100,width:40,height:40,image:monedas}),
    new Coins({x:3300,y:100,width:40,height:40,image:monedas}),
    new Coins({x:4100,y:100,width:40,height:40,image:monedas}),
    new Coins({x:4300,y:100,width:40,height:40,image:monedas}), 
    new Coins({x:5000,y:100,width:40,height:40,image:monedas}),
    new Coins({x:5200,y:100,width:40,height:40,image:monedas}), 
    new Coins({x:5500,y:100,width:40,height:40,image:monedas}),
            
        ]
        
        enemigo1=[
            new Enemy({x:600,y:100,width:50,height:50,image:Enemie1}),
            new Enemy({x:1700,y:100,width:50,height:50,image:Enemie1}),
            new Enemy({x:2100,y:100,width:50,height:50,image:Enemie1})
        ]
        Trampas =[
            new trampa({x:1300, y:100, width:80, height:25, image:pincho }),
            new trampa({x:3900, y:100, width:80, height:25, image:pincho }),
            new trampa({x:4200, y:100, width:80, height:25, image:pincho }),
            new trampa({x:4900, y:100, width:80, height:25, image:pincho }),
            new trampa({x:5600, y:100, width:80, height:25, image:pincho }),
        ]

        player= new Player()

        Bandera =[
            new final({x:6800, y:100,width:40,height:46,image:BanderaFinal})
        ]

    plataforms=[
        new Plataform({x:-1, y:470, image:ImagenSuelo }),
        new Plataform({x:1200, y:470, image:ImagenSuelo }),
        new Plataform({x:1200, y:367, image:ImagenSueloP}),
        new Plataform({x:1200, y:170, image:ImagenSueloP}),
        new Plataform({x:1700, y:300, image:ImagenSueloP}),
        new Plataform({x:2400, y:470, image:ImagenSueloP}),
        new Plataform({x:2800, y:470, image:ImagenSueloP}),
        new Plataform({x:3200, y:470, image:ImagenSueloP}),
        new Plataform({x:3600, y:470, image:ImagenSuelo}),
        new Plataform({x:4800, y:470, image:ImagenSuelo}),
        new Plataform({x:5800, y:370, image:ImagenSueloP}),
        new Plataform({x:6600, y:310, image:ImagenSueloP})

        ]
        fallPlataform = [
            new FallingPlataform({x:6200, y:340, image:ImagenSueloP,fallspeed:4})
        ]
    
    ///Objetos del juego
    genericObjects= [
        new GenericObject({x:500,y:50,image: Nubes}),
        new GenericObject({x:-1,y:190,image: Arbol}),
        new GenericObject({x:100,y:190,image: Arbol}),
        new GenericObject({x:160,y:190,image: Arbol})
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

    let timepoInicio =Date.now()
 
    function animacion(){
        
        
        requestAnimationFrame(animacion)
        ctx.fillStyle='white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(FondoJuego, 0, 0, canvas.width, canvas.height);
        /* contactoPlaforma()
        actualizar() */
//Jugando
        if (gameState==='loading'){
            drawLoader()
        }else if(gameState==='playing'){

           
            genericObjects.forEach((genericObject)=>{
                genericObject.draw()
            })
            
            plataforms.forEach((plataform)=>{
                plataform.draw()
            })

            fallPlataform.forEach((plataformf)=>{
                plataformf.fall()
                plataformf.draw()  
        })
            player.update()  

            enemigo1.forEach((enemigo)=>{
                enemigo.draw()
                enemigo.checkColision(player)
            })
            Bandera.forEach((Bfinal)=>{
            Bfinal.draw()
            Bfinal.ColisionFinal(player)
            })
            moned.forEach((mon)=>{
            mon.draw()
            mon.ColisionFinal(player)
             })
             
             Trampas.forEach((tram)=>{
                tram.draw()
                tram.ColisionTrampa(player)
             })

            if (keys.right.pressed && player.position.x<400){
                player.velocity.x= player.speed
            }else if((keys.left.pressed && player.position.x>100)||
             (keys.left.pressed && ScrollOffset === 0 && player.position.x >0)){
                player.velocity.x=-player.speed
            }
            else {
               player.velocity.x=0 
        
               if (keys.right.pressed){
                ScrollOffset +=player.speed
    
                plataforms.forEach((plataform)=>{
                    plataform.position.x-=player.speed
                    
                })
                fallPlataform.forEach((plataformf)=>{
                    plataformf.position.x -=player.speed
                })
                genericObjects.forEach((genericObject)=>{
                    genericObject.position.x -= player.speed * 0.66
                })
    
                enemigo1.forEach((enemigo)=>{
                    enemigo.position.x-=player.speed
                })
                Bandera.forEach((Bfinal)=>{
                    Bfinal.position.x-=player.speed
                })
                moned.forEach((mon)=>{
                    mon.position.x -=player.speed
                })
                Trampas.forEach((tram)=>{
                    tram.position.x -=player.speed
                })
                
               
               }else if (keys.left.pressed && ScrollOffset > 0){
                ScrollOffset -=player.speed

                plataforms.forEach((plataform)=>{
                    plataform.position.x += player.speed
              
                })
                fallPlataform.forEach((plataformf)=>{
                    plataformf.position.x +=player.speed
                })
                genericObjects.forEach((genericObject)=>{
                    genericObject.position.x += player.speed * 0.66
                })
                enemigo1.forEach((enemigo)=>{
                    enemigo.position.x+=player.speed
                })
                
                Bandera.forEach((Bfinal)=>{
                    Bfinal.position.x+=player.speed
                })
                moned.forEach((mon)=>{
                    mon.position.x +=player.speed
                })
                Trampas.forEach((tram)=>{
                    tram.position.x +=player.speed
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
                    player.enSuelo=true
                }
            })
            fallPlataform.forEach((plataformf)=>{
                if (player.position.y + player.height <=
                    plataformf.position.y && player.position.y + player.height+player.velocity.y>=
                    plataformf.position.y && player.position.x + player.width>=
                    plataformf.position.x && player.position.x <=
                    plataformf.position.x+plataformf.image.width)
                    {
                        player.velocity.y=0
                        plataformf.falling =true
                        player.enSuelo=true
                    }
            })
            
    //META
            /* if (ScrollOffset > 5000 ){
                console.log('Ganaste')
            } */

    //PERDISTE VIDA
            if (player.position.y>canvas.height){
                vidas--;
                
                if (vidas<=0){
                   gameState='gameOver'
                    GameOver=false
                }else{
                    init()
                }
                
               
            }
            let tiempoTranscurrido = Math.floor((Date.now()- timepoInicio)/1000)
            let tiempoRestante = timepoLimite - tiempoTranscurrido

            ctx.font ='36px  Pixelify Sans, sans-serif'
            ctx.fillStyle = 'red'
            ctx.textAlign='right'
            ctx.fillText('TIEMPO: '+ tiempoRestante , 600,30)
            if(tiempoRestante<=0){
                gameState='gameOver'
            }


            ctx.font = '36px  Pixelify Sans, sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'left';
            ctx.fillText('Vidas: ' + vidas, 20, 30);

            ctx.font = '36px  Pixelify Sans, sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'right';
            ctx.fillText('Coins: ' + Monedas, 1000, 30);
        }
        //GAME OVER
        else if(gameState==='gameOver'){
            backgroundMusic.pause()
            perder.play()
            ctx.font='100px Pixelify Sans, sans-serif'
            ctx.fillStyle='red'
            ctx.textAlign='center'
            if(Date.now()%1000<500){
            ctx.fillText('Game Over',canvas.width/2,canvas.height/2-50)
            }
 
            ctx.font='24px Pixelify Sans, sans-serif'
            ctx.fillText('Presiona r para reiniciar',canvas.width/2,canvas.height/2+50)
            
        }
    }
        
        
    

    animacion()

    addEventListener('keydown', ({keyCode}) => {
    /* console.log(keyCode) */
    switch(keyCode){
        case 37:
            console.log('left')
            keys.left.pressed=true
             player.currentSprite =player.sprites.run.left
           player.currentCropWidth =player.sprites.run.cropwidth
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
           
            if (player.enSuelo){
            salto.play()
                player.velocity.y -=20
                player.enSuelo=false
            }
            break;

        case 82:
            if (gameState==='gameOver'){
                window.location.href="index.html"
                vidas=3
            }
            break; 
    }
   
    })
    
    addEventListener('keyup', ({keyCode}) => {
        /* console.log(keyCode) */
        switch(keyCode){
            case 37:
                console.log('left')
                keys.left.pressed=false
                player.currentSprite =player.sprites.stand.left
                player.currentCropWidth =player.sprites.stand.cropwidth 
            break;
        
            case 40: 
                console.log('down')
        
            break;
        
            case 39:
                console.log('right')
                keys.right.pressed=false   
                player.currentSprite =player.sprites.stand.right
                player.currentCropWidth =player.sprites.stand.cropwidth         
            break;
        
            case 38: 
                console.log('up')
                
                break;
        
        }
        })

        
       
    }

    
    
