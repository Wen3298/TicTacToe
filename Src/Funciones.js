let Celda1 = document.getElementById("celda1");
        let Celda2 = document.getElementById("celda2");
        let Celda3 = document.getElementById("celda3");
        let Celda4 = document.getElementById("celda4");
        let Celda5 = document.getElementById("celda5");
        let Celda6 = document.getElementById("celda6");
        let Celda7 = document.getElementById("celda7");
        let Celda8 = document.getElementById("celda8");
        let Celda9 = document.getElementById("celda9");

        let arreListas = [Celda1, Celda2, Celda3, Celda4, Celda5, Celda6, Celda7, Celda8, Celda9];

        let jugador1m = parseInt(localStorage.getItem("marcadorX")) || 0;
        let jugador2m = parseInt(localStorage.getItem("marcadorO")) || 0;
        let jugadorActual = "❌";
        let juegoTerminado = false;

        function actualizarMarcador() {
            document.getElementById("jugador-x").textContent = jugador1m;
            document.getElementById("jugador-0").textContent = jugador2m;
        }

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

            for (let combination of JuegoGanador) {
                const [a, b, c] = combination;
                if (arreListas[a].innerHTML && 
                    arreListas[a].innerHTML === arreListas[b].innerHTML && 
                    arreListas[a].innerHTML === arreListas[c].innerHTML) {
                    if (arreListas[a].innerHTML === "❌") {
                        jugador1m++;
                        localStorage.setItem("marcadorX", jugador1m);
                    } else if (arreListas[a].innerHTML === "🔵") {
                        jugador2m++;
                        localStorage.setItem("marcadorO", jugador2m);
                    }
                    actualizarMarcador();
                    alert("¡Felicidades! ¡Hay un ganador!");
                    juegoTerminado = true;
                    return true;
                }
            }

            let empate = arreListas.every(celda => celda.innerHTML !== "");
            if (empate) {
                alert("¡Hay un empate!");
                juegoTerminado = true;
                return true;
            }

            return false;
        }

        function jugador1() {
            arreListas.forEach(celda => celda.addEventListener("click", function () {
                if (!juegoTerminado) {
                    if (celda.innerHTML === "") {
                        celda.innerHTML = jugadorActual;
                        if (!detectarGanador()) {
                            jugadorActual = (jugadorActual === "❌") ? "🔵" : "❌";
                            juegoAleaotorio();
                        }
                    }
                }
            }));
        }

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
            arreListas.forEach(celda => celda.innerHTML = "");
            jugadorActual = "❌";
            juegoTerminado = false;
        });

        // Inicializa el marcador
        actualizarMarcador();
