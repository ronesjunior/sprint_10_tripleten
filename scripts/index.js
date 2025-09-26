import Card from "./Card.js";
import { openPopup_img, excluir_card } from "./utils.js";
import FormValidator from "./FormValidator.js";

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

  fecharPopup();
}

formElement.addEventListener("submit", AlterarPerfilFormSubmit); // Conecta a função ao formulário

///////////////////////////////////////////////////////////////////////////
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
//Refatoração do código

const cardsContainer = document.querySelector(".elements-container"); // variável que recebe uma div com a classe .elements-container que segue o fluxo da estrutura e que receberá todos os dados do template
const popupOpen = document.querySelector(".profile__add-button");
const popupClose = document.querySelector(".popup-add-card__fechar-botao");
const popupcard = document.querySelector(".popup-add-card");

// INSTANCIAR A CLASSE CARD
initialCards.forEach((item) => {
  const card = new Card(
    item.name,
    item.link,
    ".elements",
    openPopup_img,
    excluir_card
  ); // card é o objeto instanciando com as propriedades recebidas do array e das funções
  // console.log(card);
  const cardElement = card.generateCard(); // Grava os dados do método generateCard() que está dentro da classe Card na variável cardElement. Coloca-se o card.generateCard() pois generateCard() é um método da classe Card.
  cardsContainer.append(cardElement); // pega o card e adiciona dentro do contêiner. Se houver outros cards, este vai entrar depois deles.
});

// ABRIR O POPUP PARA ADICIONAR CARD
popupOpen.addEventListener("click", () => {
  // popupcard.style.display = "flex";
  popupcard.classList.add("popup-add-card_opened");
});

// FECHAR O POPUP PARA ADICIONAR CARD
popupClose.addEventListener("click", () => {
  // popupcard.style.display = "none";
  popupcard.classList.remove("popup-add-card_opened");
});

////////////////////////////////////////////////////////////////////////////////////
//  CRIAR A INSTÂNCIA (OBJETO) PARA VALIDAR FORMULÁRIO DE ADIÇÃO DE CARD
const formAddcard = document.querySelector("#popup-add-card__form");
const cardNameInput = document.querySelector("#titulo");
const cardImageInput = document.querySelector("#link");
const formAddperfil = document.querySelector("#popup__form");

const configAdd = {
  popupSelector: "#popup-add-card",
  formSelector: "#popup-add-card__form",
  inputSelector: ".popup-add-card__entrada",
  submitButtonSelector: ".popup-add-card__criar-botao",
  inactiveButtonClass: "popup-add-card__criar-botao_inativo",
  inputErrorClass: "popup-add-card__entrada_tipo_erro",
  errorClass: "popup-add-card__entrada-error_ativo",
};

const configPerfil = {
  popupSelector: "#popup",
  formSelector: "#poppup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// 1. Criar as instâncias

const formValidatorAddcard = new FormValidator(configAdd, formAddcard);
const formValidatorAddperfil = new FormValidator(configPerfil, formAddperfil);

// 2. Ativar a validação (aqui que a mágica acontece!)
formValidatorAddcard.enableValidation();
formValidatorAddperfil.enableValidation();

function handleCardCreation(evt) {
  evt.preventDefault();
  const card = new Card(
    cardNameInput.value,
    cardImageInput.value,
    ".elements",
    openPopup_img,
    excluir_card
  ); // card é o objeto instanciando com as propriedades recebidas do array e das funções
  // console.log(card);
  const cardElement = card.generateCard(); // Grava os dados do método generateCard() que está dentro da classe Card na variável cardElement. Coloca-se o card.generateCard() pois generateCard() é um método da classe Card.
  cardsContainer.append(cardElement); // pega o card e adiciona dentro do contêiner. Se houver outros cards, este vai entrar depois deles.
  popupcard.classList.remove("popup-add-card_opened");
  formAddcard.reset();
}

formAddcard.addEventListener("submit", handleCardCreation);
