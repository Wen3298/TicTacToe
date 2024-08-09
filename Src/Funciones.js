    //llamo todas las celdas 
        let Celda1 = document.getElementById("celda1");
        let Celda2 = document.getElementById("celda2");
        let Celda3 = document.getElementById("celda3");
        let Celda4 = document.getElementById("celda4");
        let Celda5 = document.getElementById("celda5");
        let Celda6 = document.getElementById("celda6");
        let Celda7 = document.getElementById("celda7");
        let Celda8 = document.getElementById("celda8");
        let Celda9 = document.getElementById("celda9");
  // como llame a cada una de las celdas hago un arreglo
        let arreListas = [Celda1, Celda2, Celda3, Celda4, Celda5, Celda6, Celda7, Celda8, Celda9];
  // hago las variables para que se guarden en localstorage y mas abajo esta el resto
        let jugador1m = parseInt(localStorage.getItem("marcadorX")) || 0;
        let jugador2m = parseInt(localStorage.getItem("marcadorO")) || 0;
        let jugadorActual = "❌";
        let juegoTerminado = false;
  // creo la funcion que me va a actualizar el marcador que me va a contar los puntos que voy ganando 
        function actualizarMarcador() {
            document.getElementById("jugador-x").textContent = jugador1m;
            document.getElementById("jugador-0").textContent = jugador2m;
        }
  // hago la funcion detectar ganador donde hago un arreglo de las  jugadas con las que se pude ganar 
        function detectarGanador() {
            let JuegoGanador = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [2, 4, 6],
                [0, 4, 8],
            ];
// se hace un for para que me recorra todo el arreglo de el juego ganador 
            for (let combination of JuegoGanador) {
                const [a, b, c] = combination;
                if (arreListas[a].innerHTML && 
                    arreListas[a].innerHTML === arreListas[b].innerHTML && 
                    arreListas[a].innerHTML === arreListas[c].innerHTML) {
                    if (arreListas[a].innerHTML === "❌") {
                        jugador1m++; // aqui se suma cada vez que x vaya ganando y se va guardando en el localstorge
                        localStorage.setItem("marcadorX", jugador1m);
                    } else if (arreListas[a].innerHTML === "🔵") {
                        jugador2m++;
                        localStorage.setItem("marcadorO", jugador2m);
                    }
                    actualizarMarcador();
                    alert("¡Felicidades! ¡Hay un ganador!");
                    juegoTerminado = true; 
                    return true;// para detener el juego y salir del bucle
                }
            }
  // hago una variable donde me va a buscar que  las celdas no esten vacias 
            let empate = arreListas.every(celda => celda.innerHTML !== "");
            if (empate) {
                alert("¡Hay un empate!");
                juegoTerminado = true;
                return true;
            }

            return false;
        }
 //funcion del jugador que con un click en cada celda pone una x
        function jugador1() {
            arreListas.forEach(celda => celda.addEventListener("click", function () {
                if (!juegoTerminado) {
                    if (celda.innerHTML === "") {//si la celda esta vacia el jugador actual que es x puede marcar
                        celda.innerHTML = jugadorActual;
                        if (!detectarGanador()) {
                            jugadorActual = (jugadorActual === "❌") ? "🔵" : "❌"; // para alternar los jusgadores si es igual a jugador 
                                                                                      //es decir di es cambia desende quien tenga e turno
                            juegoAleaotorio();
                        }
                    }
                }
            }));
        }
//el juego aleatorio es la maquita la que esta jugando
        function juegoAleaotorio() {
            setTimeout(() => {
                let arreglosVacios = arreListas.filter(cel => cel.innerHTML === "");
                let aleatorio = Math.floor(Math.random() * arreglosVacios.length);
                if (!juegoTerminado) {
                    if (arreglosVacios.length > 0) {
                        arreglosVacios[aleatorio].innerHTML = "🔵";
                        jugadorActual = "❌";
                        detectarGanador();
                    }
                }
            }, 500);
        }

        jugador1();

        let btnEmpezar = document.getElementById("btn");
        btnEmpezar.addEventListener('click', () => {
            arreListas.forEach(celda => celda.innerHTML = "");// cuando de click en el boton se van a lipiar las celdas
            jugadorActual = "❌";//para que en la proxma parte siempre se empiece con x
            juegoTerminado = false;
        });

        
        actualizarMarcador();
