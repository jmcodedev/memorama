import "./style.css";

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const cartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

const numeroAleatorio = (): number =>
  Math.floor(Math.random() * cartas.length + 1);

const barajarArray = (array: InfoCarta[]): InfoCarta[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const handleClick = document.querySelectorAll(".grid-item");

handleClick.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    const imagen = elemento.querySelector("img");
    if (imagen && imagen instanceof HTMLImageElement) {
      imagen.src = cartas[numeroAleatorio()].imagen;
    }
  });
});

const arrayBarajado = barajarArray(cartas);
console.log(arrayBarajado);
