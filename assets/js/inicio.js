let fondomusic =document.getElementById('FondoInicio')
fondomusic.play()
document.addEventListener('keydown',function(event){
    if (event.key==="Enter"){
        window.location.href="Nivel 1.html"
        fondomusic.pause()
    }
})


