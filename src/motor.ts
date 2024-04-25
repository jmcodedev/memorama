import { Tablero, Carta, cartas } from "./model";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  return cartas;
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    !tablero.cartas[indice].estaVuelta &&
    !tablero.cartas[indice].encontrada
  ) {
    voltearCarta(tablero, indice);
    return true;
  } else {
    return false;
  }
};

const voltearCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice;
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    parejaEncontrada(tablero, indiceA, indiceB);
    return true;
  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    return false;
  }
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  if (esPartidaCompleta(tablero)) {
    alert("Has ganado!!!");
    tablero.estadoPartida = "PartidaCompleta";
  }
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;

  tablero.estadoPartida = "CeroCartasLevantadas";
};

const esPartidaCompleta = (tablero: Tablero): boolean =>
  tablero.cartas.every((cartas) => cartas.encontrada);

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas = barajarCartas(cartas);
};

export const comprobarCarta = (tablero: Tablero, indice: number): boolean => {
  return sePuedeVoltearLaCarta(tablero, indice);
};
