import Card from "./Card.js";
import { openPopup_img, excluir_card, closePopup_img } from "./utils.js";
import FormValidator from "./FormValidator.js";

// ABRIR POPUP PARA EDITAR O PERFIL NOME E SOBRE MIM

const popup = document.querySelector(".popup"); // variável do popup do perfil interior inclusive lado de fora
const editBotao = document.querySelector(".profile__square"); // classe para abrir o popup perfil
const fecharBotao = document.querySelector(".popup__fechar-botao");

// ABRIR O POPUP PARA ADICIONAR CARD
function abrirPopup() {
  popup.style.display = "flex";
}

// FECHAR O POPUP PARA ADICIONAR CARD
export function fecharPopup() {
  popup.style.display = "none";
}

// CHAMANDO AS FUNÇÕES abrirPopup e fecharPopup
editBotao.addEventListener("click", abrirPopup);
fecharBotao.addEventListener("click", fecharPopup);

///////////////////////////////////////////////////////////////////////////
// ALTERAR O NOME E O SOBRE MIM DO POPUUP

const formElement = document.querySelector("#popup__form");

function AlterarPerfilFormSubmit(evt) {
  evt.preventDefault();

  const entradaNome = document.querySelector("#nome");
  const entradaSobre = document.querySelector("#sobre");

  const valorNome = entradaNome.value;
  const valorSobre = entradaSobre.value;

  const perfilNome = document.querySelector(".profile__title");
  const perfilSobre = document.querySelector(".profile__description");

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
// INSTANCIAR A CLASSE CARD

const cardsContainer = document.querySelector(".elements-container"); // variável que recebe uma div com a classe .elements-container que segue o fluxo da estrutura e que receberá todos os dados do template
const popupOpen = document.querySelector(".profile__add-button"); // variável que chama a classe do botão para abrir o popup de add card
const popupClose = document.querySelector(".popup-add-card__fechar-botao");
const popupcard = document.querySelector(".popup-add-card");

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

// FECHAR O POPUP PARA ADICIONAR CARD
export function fecharPopup_add() {
  popupcard.style.display = "none";
}

// ABRIR O POPUP PARA ADICIONAR CARD
function abrirPopup_add() {
  popupcard.style.display = "flex";
}

// CHAMANDO AS FUNÇÕES abrirPopup_add e fecharPopup_add
popupClose.addEventListener("click", fecharPopup_add);
popupOpen.addEventListener("click", abrirPopup_add);

////////////////////////////////////////////////////////////////////////////////////
//  CRIAR As CONFIGS DE VALIDACAO
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
  formSelector: "#popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: "#popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
///////////////////////////////////////////////////////////////////////////////////////////////////
/////VALIDAR FORMULÁRIOS NOS INPUT E BOTÕES PARA ADIÇÃO DE CARD E EDIÇÃO DO PERFIL
// 1. Criar as instâncias
const formAddcard = document.querySelector("#popup-add-card__form");
const formAddperfil = document.querySelector("#popup__form");
const cardNameInput = document.querySelector("#titulo");
const cardImageInput = document.querySelector("#link");
const formValidatorAddcard = new FormValidator(configAdd, formAddcard); // cria um objeto para validar as configurações para adicionar cartão
const formValidatorAddperfil = new FormValidator(configPerfil, formAddperfil); // cria um objeto para validar as configurações para alterar o perfil
const popupImage = document.querySelector(".popup-img");

// 2. Ativar a validação (aqui que a mágica acontece!)
formValidatorAddcard.enableValidation();
formValidatorAddperfil.enableValidation();

// 3. Criar cartões
function handleCardCreation(evt) {
  evt.preventDefault();
  const card = new Card(
    cardNameInput.value,
    cardImageInput.value,
    ".elements",
    openPopup_img,
    excluir_card
  ); // card é o objeto instanciando com as propriedades recebidas do array e das funções
  const cardElement = card.generateCard(); // Grava os dados do método generateCard() que está dentro da classe Card na variável cardElement. Coloca-se o card.generateCard() pois generateCard() é um método da classe Card.
  cardsContainer.append(cardElement); // pega o card e adiciona dentro do contêiner. Se houver outros cards, este vai entrar depois deles.
  popupcard.classList.remove("popup-add-card_opened"); // remove o css display: flex para fechar o popup logo após clicar em salvar (submit do form)
  formAddcard.reset(); // limpa todos os campos do popup após fechá-lo
}

formAddcard.addEventListener("submit", handleCardCreation);

// FECHAR CLICANDO NO ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup_img(); // fecha popup de imagem (função exportada do utils.js)
    fecharPopup(); // fecha popup de perfil
    fecharPopup_add(); // fecha popup de adicionar card
    console.log("ESC: fechei todos os popups");
  }
});

// FECHAR CLICANDO FORA DOS POPUPS
document.addEventListener("click", (e) => {
  if (e.target === popupImage) {
    popupImage.classList.remove("popup-img__opened_img");
  }

  if (e.target === popup) {
    fecharPopup();
  }

  if (e.target === popupcard) {
    fecharPopup_add();
  }
});
