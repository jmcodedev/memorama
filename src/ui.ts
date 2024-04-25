// IMPORTS
import "./style.css";
import { comprobarCarta, iniciaPartida, sonPareja } from "./motor";
import { tablero, Tablero } from "./model";

// DECLARACIÓN DE VARIABLES

const elementoIniciarPartida = document.getElementById("empezarPartida");
const elementoDivCartas = document.querySelectorAll(".grid-item");
const mensaje = document.getElementById("mensaje");
let primeraCarta: HTMLDivElement | null = null;
let segundaCarta: HTMLDivElement | null = null;

let contador: number = 0;

// FUNCIONES

const voltearCarta = (
  carta: HTMLDivElement,
  tablero: Tablero,
  indice: number
): void => {
  const img = carta.querySelector("img");
  if (img) {
    img.src = tablero.cartas[indice].imagen;
  }
};

const bajarCartas = (carta1: HTMLDivElement, carta2: HTMLDivElement) => {
  const img1 = carta1.querySelector("img");
  const img2 = carta2.querySelector("img");
  setTimeout(() => {
    if (img1 && img2) {
      img1.src = "";
      img2.src = "";
    }
  }, 1000);
};

// TRIGGERS

if (
  elementoIniciarPartida &&
  elementoIniciarPartida instanceof HTMLButtonElement
) {
  elementoIniciarPartida.addEventListener("click", () => {
    tablero.cartas.forEach((carta) => {
      carta.estaVuelta = false;
      carta.encontrada = false;
    });
    contador = 0;
    iniciaPartida(tablero);
    elementoDivCartas.forEach((cartaDiv) => {
      if (
        cartaDiv &&
        cartaDiv instanceof HTMLDivElement &&
        mensaje &&
        mensaje instanceof HTMLParagraphElement
      ) {
        const imagenes = cartaDiv.querySelector("img");
        if (imagenes instanceof HTMLImageElement && imagenes) {
          imagenes.src = "";
        }
        cartaDiv.style.pointerEvents = "auto";
        cartaDiv.classList.add("activada");
        mensaje.textContent = "Se ha iniciado la partida";
        elementoIniciarPartida.textContent = "REINICIAR PARTIDA";
      }
    });
  });
}

elementoDivCartas.forEach((carta, indice) => {
  carta.addEventListener("click", () => {
    if (comprobarCarta(tablero, indice)) {
      if (!primeraCarta) {
        primeraCarta = carta as HTMLDivElement;
        voltearCarta(primeraCarta, tablero, indice);
      } else if (!segundaCarta) {
        segundaCarta = carta as HTMLDivElement;
        voltearCarta(segundaCarta, tablero, indice);

        if (
          tablero.indiceCartaVolteadaA !== undefined &&
          tablero.indiceCartaVolteadaB !== undefined
        ) {
          if (
            sonPareja(
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB,
              tablero
            )
          ) {
          } else if (primeraCarta && segundaCarta) {
            bajarCartas(primeraCarta, segundaCarta);
            contador++;
          }
        }

        primeraCarta = null;
        segundaCarta = null;
      }
    } else {
      console.log(tablero);
      console.log("No se puede levantar");
    }

    if (
      mensaje instanceof HTMLParagraphElement &&
      mensaje &&
      tablero.estadoPartida !== "PartidaCompleta"
    ) {
      mensaje.textContent = `Número de intentos ${contador}`;
    }
  });
});
