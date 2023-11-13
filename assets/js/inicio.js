let fondomusic =document.getElementById('FondoInicio')
document.getElementById("Texto").style.display="None"
    document.getElementById("Titulo").style.display="None"
    document.getElementById("FondoVideo").style.display="None"

document.getElementById("playButton").addEventListener("click",function(){
    this.style.display="none"
    document.getElementById("Texto").style.display="Block"
    document.getElementById("Titulo").style.display="Block"
    document.getElementById("FondoVideo").style.display="Block"
    fondomusic.play()

    document.addEventListener('keydown',function(event){
        if (event.key==="Enter"){
            window.location.href="Nivel 1.html"
            fondomusic.pause()
        }
    })
})




