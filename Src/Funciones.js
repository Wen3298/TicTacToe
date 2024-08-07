let Celda1 = document.getElementById("celda1")
let Celda2 = document.getElementById("celda2")
let Celda3 = document.getElementById("celda3")
let Celda4 = document.getElementById("celda4")
let Celda5 = document.getElementById("celda5")
let Celda6 = document.getElementById("celda6")
let Celda7 = document.getElementById("celda7")
let Celda8 = document.getElementById("celda8")
let Celda9 = document.getElementById("celda9")
//Hago un arreglo de todas las celdas
let arreListas = [Celda1,Celda2,Celda3,Celda4,Celda5,Celda6,Celda7,Celda8,Celda9]


function detectarGanador() {
    let JuegoGanador = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];

    for (let combination of JuegoGanador) {
        const [a, b, c] = combination;
        if (arreListas[a].innerHTML && 
            arreListas[a].innerHTML === arreListas[b].innerHTML && 
            arreListas[a].innerHTML === arreListas[c].innerHTML) {
            alert("¡Felicidades! ¡Hay un ganador!");
            return true;
           
        }
        
    }
    
    return false;
}
function jugador1(){
    arreListas.forEach(celda => celda.addEventListener("click",function(){
        if (!detectarGanador()) {
           if(celda.innerHTML===""){
               celda.innerHTML= "❌";
            juegoAleaotorio()
           }
        }
       
        
    }))

}
function juegoAleaotorio() {
    setTimeout(() => {
        
        let arreglosVacios = arreListas.filter(cel=>cel.innerHTML==="")
        let aleatorio = Math.floor(Math.random() * arreglosVacios.length)
        if(!detectarGanador()){
        if(arreglosVacios.length>0){
            arreglosVacios[aleatorio].innerHTML = "🔵"
        }
    }
    }, 500);
    
}
jugador1()

