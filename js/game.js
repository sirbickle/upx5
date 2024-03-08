

const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  {
    caracter: "caixa_agua",
    text: " A higienização da caixa d’água e o seu tampamento de forma correta evitam a proliferação do mosquito aedes aegypti, responsável pela transmissão de dengue, chikungunya e zika vírus. ",
  },
  {
    caracter: "lixo_tampar",
    text: " O descarte correto do lixo é fundamental para que recipientes não se tornem criadouros do Aedes aegypti. Colocar o lixo em sacos plásticos e manter a lixeira bem fechada. Não jogar lixo em terrenos baldios. Lavar principalmente por dentro com escova e sabão os utensílios usados para guardar água em casa, como jarras, garrafas, potes, baldes, etc.",
  },
  {
    caracter: "plantas",
    text: "Não cultive plantas em vasos com água. Encha o vaso com terra ou areia.",
  },
  {
    caracter: "doente",
    text: "De maneira geral, a dengue clássica começa com uma febre alta (39º a 40º). Muitas vezes, é acompanhada de dor de cabeça, fadiga, náuseas, vômitos, vermelhidão e coceira na pele. Também é possível sentir dores nas articulações e pequenas manifestações hemorrágicas, como sangramento nasal e nas gengivas. PROCURE UM HOSPITAL CASO TENHA ESSES SINTOMAS.",
  },
  {
    caracter: "pneu",
    text: "Pneus e garrafas: atenção redobrada para evitar o mosquito da dengue. Muitas pessoas guardam pneus usados ou garrafas vazias em casa e acabam esquecendo de tomar alguns cuidados básicos. Se deixados expostos à chuva, podem acumular água, gerando criadouros do mosquito Aedes Aegypti.",
  },
  {
    caracter: "calha",
    text: "Calhas, lajes e caixas d'água podem abrigar larvas do mosquito da Dengue. Negligenciar a limpeza destes locais aumenta as chances de proliferação do Aedes aegypti e os riscos contra a saúde humana.",
  },
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const showModal = (character) => {
  const modalContainer = document.getElementById("modal-container");
  const modalText = document.getElementById("modal-text");

  const foundCharacter = characters.find((c) => c.caracter === character);

  if (foundCharacter) {
    modalText.innerHTML = `<p><b>Você acertou!</b> <br> ${foundCharacter.text}</p>`;
    modalContainer.style.display = "flex";
  }
};

const closeModal = () => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.style.display = "none";
};

const finishedGame = () => {
  const finishedBox = document.getElementById("finished")
  const finishedText = document.getElementById("finished-text")
  console.log('oi')
  finishedBox.style.display = "flex";
  finishedText.innerHTML = `<p>Parabéns você Finalizou o jogo!</p>`;
}
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 12) {
    clearInterval(this.loop);
    finishedGame()
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";
    showModal(firstCharacter);
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character.caracter);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
