const canvas =document.querySelector('canvas');
const ctx= canvas.getContext('2d');
canvas.width=1024
canvas.height=576

const gravedad= 0.5


function MapaJuego(){
    const tileSize =50;
    const playerSize = 30;
const player ={
    x:50,
    y:50,
    width:30,
    height:30,
    speed:10
}
/* const Bloque ={
    x:200,
    y:200,
    width:50,
    height:50
} */

/* const camino = [
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 150, y: 100 },
    { x: 150, y: 150 },
    { x: 100, y: 200 },
    { x: 50, y: 200 },
    { x: 50, y: 250 },
    { x: 100, y: 300 },
    { x: 150, y: 300 },
    { x: 200, y: 250 },
    { x: 250, y: 250 },
    { x: 300, y: 300 },
    { x: 350, y: 300 }
  ];
 */
let PlayerEntryBloque =false

const bloqueVerde =new Image()
bloqueVerde.src='./assets/img/nivel.png'

function Jugador(){
    ctx.fillStyle='blue';
    ctx.fillRect(player.x,player.y,player.width,player.height)
}

function dibujoBloque(){
ctx.drawImage(bloqueVerde,canvas.width -tileSize,canvas.height-tileSize,tileSize,tileSize)

 
}
/* function dibujarLinea(x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  function dibujarCamino() {
    ctx.lineWidth = 5;
    for (let i = 1; i < camino.length; i++) {
      const puntoAnterior = camino[i - 1];
      const puntoActual = camino[i];
      dibujarLinea(puntoAnterior.x, puntoAnterior.y, puntoActual.x, puntoActual.y, 'yellow');
    }
  } */
function verificarColision(){
  return player.x +playerSize >=canvas.width -tileSize &&
        player.y +playerSize>=canvas.height - tileSize;
}

function keydownHandler(event){
    if (verificarColision() && event.key ==='Enter'){
        window.location.href="Nivel 1.html"
    }
    let newPlayerX = player.x
    let newPlayerY = player.y

    switch(event.key){
        case 'ArrowUp':
            newPlayerY -= player.speed;
            break;
        
        case 'ArrowDown':
            newPlayerY += player.speed;
            break;

        case 'ArrowLeft': 
        console.log("Izquierda")
            newPlayerX -= player.speed;
            break;

        case 'ArrowRight':
            console.log("Derecha")
            newPlayerX += player.speed;
            break;
    }

    player.x =newPlayerX
    player.y =newPlayerY

    verificarColision()
}
document.addEventListener('keydown',keydownHandler);


function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    dibujoBloque()
   
    Jugador()
    requestAnimationFrame(draw)
}
draw()
    /* const map =[
        [0,0,1,1,1,0,0],
        [0,0,1,0,1,0,0],
        [0,0,1,0,1,0,0],
        [0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0],
        
    ]

    const tileSize =50;

    let playerX=50;
    let playerY=50;
    const playerWidth=30;
    const playerHeight=30;
    const playerSpeed=1;

    function draw(){
        for (let y=0;y<map.length;y++){
            for (let x=0;x<map[y].length;x++){
                if (map[y][x]===1){
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle='red';
                    ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
                }
            }

        }
    
    const playerBottom=playerY + playerHeight;
    const playerRight = playerX + playerWidth;
function colisionBloque(){
    const tileX=Math.floor(playerX/tileSize);
    const tileY=Math.floor(playerBottom/tileSize);

    if (map[tileY] && map[tileY][tileX]===1){
        return true;
    }   
    return false;
}
       
addEventListener('keydown', ({keyCode}) =>{
    switch(keyCode){
        case 38:
        if (playerY>0){
            playerY-=playerSpeed;
        }
        break;

        case 40:
        if(playerY<canvas.height-playerHeight){
            playerY+=playerSpeed;
        }
        break;
        
        case 37:
        if(playerX>0){
            playerX -=playerSpeed
        }
        break;

        case 39:
        if (playerX<canvas.width-playerWidth){
            playerX +=playerSpeed;
        }
        break;
    }
    if(event.key==='Enter' && colisionBloque()){
        window.location.href="Nivel 1.html"
    }
})


ctx.fillStyle='blue';
ctx.fillRect(playerX,playerY,playerWidth,playerHeight);


requestAnimationFrame(draw);

}

draw();
*/
} 


/* function bucle(){
    if(gameState==="MapaJuego") {
        MapaJuego()
    }
    else if(gameState==="iniciarJuego"){
        IniciarJuego()
    }
    requestAnimationFrame(bucle)
}

bucle()
 */

MapaJuego()


/* function IniciarJuego(){
   

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
const FondoJuego =createImage('/assets/img/fondoCeleste.jpg')



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
console.log(keyCode)
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
    console.log(keyCode)
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

} */


