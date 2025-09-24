import Card from "./Card.js";
import { openPopup_img } from "./utils.js";
import { excluir_card } from "./utils.js";
// import FormValidator from "./FormValidator.js";

// ABRIR POPUP PARA EDITAR O NOME E SOBRE MIM

const popup = document.querySelector(".popup");
const editBotao = document.querySelector(".profile__square");
const fecharBotao = document.querySelector(".popup__fechar-botao");

function abrirPopup() {
  popup.style.display = "flex";
}

function fecharPopup() {
  popup.style.display = "none";
}

editBotao.addEventListener("click", abrirPopup);
fecharBotao.addEventListener("click", fecharPopup);

///////////////////////////////////////////////////////////////////////////
// ALTERAR O NOME E O SOBRE MIM DO POPUUP

let formElement = document.querySelector("#popup__form");

function AlterarPerfilFormSubmit(evt) {
  evt.preventDefault();

  let entradaNome = document.querySelector("#nome");
  let entradaSobre = document.querySelector("#sobre");

  let valorNome = entradaNome.value;
  let valorSobre = entradaSobre.value;

  let perfilNome = document.querySelector(".profile__title");
  let perfilSobre = document.querySelector(".profile__description");

  perfilNome.textContent = valorNome;
  perfilSobre.textContent = valorSobre;

  // A MANEIRA ABAIXO É TAMBÉM CORRETA E MAIS CURTA PARA SUBSTITUIR TODAS AS LINHA DE CÓDIGO ACIMA
  // let entradaNome = document.querySelector("#nome").value;
  // let entradaSobre = document.querySelector("#sobre").value;
  // document.querySelector(".profile__title").textContent = entradaNome;
  // document.querySelector(".profile__description").textContent = entradaSobre;

  fecharPopup();
}

formElement.addEventListener("submit", AlterarPerfilFormSubmit); // Conecta a função ao formulário

///////////////////////////////////////////////////////////////////////////
// MUDAR A COR DO BOTÃO 'LIKE' PARA PRETO DA SECTION ELEMENT

const likeButtons = document.querySelectorAll(".element__like-button");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector(".element__like-icon");
    icon.classList.toggle("element__like-icon_active"); // alterna a classe para mudar cor/estilo
  });
});

/////////////////////////////////////////////////////////////////////////////
// ABRIR POPUP PARA INSERIR IMAGENS (CARD)

const addButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelector(".popup-add-card__fechar-botao");
const popupcard = document.querySelector(".popup-add-card");

function openPopup() {
  popupcard.style.display = "flex";
}

function closePopup() {
  popupcard.style.display = "none";
}

addButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

///////////////////////////////////////////////////////////////////////////
// EXCLUIR IMAGEM (CARD) NO CONTAINER

// const cardsContainer = document.querySelector(".elements");

// cardsContainer.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("element__lixeira-icon")) {
//     const cardToDelete = evt.target.closest(".element");
//     cardToDelete.remove();
//   }
// });

////////////////////////////////////////////////////////////////////////////////////////////////
// CRIAR OS CARDS ATRAVÉS DO VETOR initialCards

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////
//Refatoração código

const cardsContainer = document.querySelector(".elements-container");
const form = document.querySelector("#popup-add-card__form");
const containerCards = document.querySelector(".elements");

// Quando criar os cards iniciais:
initialCards.forEach((item) => {
  const card = new Card(
    item.name,
    item.link,
    ".elements",
    openPopup_img,
    excluir_card
  );
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

// Quando criar novos cards no formulário:
function criarCard(titulo, imagem) {
  const card = new Card(titulo, imagem, ".elements", openPopup_img);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}
