let FondoMusica =new Audio("./assets/audio/FondoInicio.mp3")

FondoMusica.play()
FondoMusica.loop=true

document.addEventListener('keydown',function(event){
    if (event.key==="Enter"){
        window.location.href="Nivel 1.html"
        
    }
})


