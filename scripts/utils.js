// utils.js

const popupImage = document.querySelector(".popup-img");
const popupImg = popupImage.querySelector(".popup-img__image");
const popupCaption = popupImage.querySelector(".popup-img__caption");
const popupClose = popupImage.querySelector(".popup-img__close");

export function openPopup_img(imgSrc, imgAlt, captionText) {
  popupImg.src = imgSrc;
  popupImg.alt = imgAlt;
  popupCaption.textContent = captionText;
  popupImage.classList.add("popup-img__opened_img");
}

export function closePopup_img() {
  popupImage.classList.remove("popup-img__opened_img");
}

// Evento de fechar
popupClose.addEventListener("click", closePopup_img);

// Função para excluir cards
export const excluir_card = (element) => {
  // recebe a classe .element selecionada com click pelo deleteButton.addEventListener do método _setEventListeners dentro da class card em card.js
  // console.log("elemento excluído = ", element);
  element.remove();
};

// FECHAR O POPUP PARA ADICIONAR CARD
const popupOpen = document.querySelector(".profile__add-button"); // variável que chama a classe do botão para abrir o popup de add card
const popupClose_add = document.querySelector(".popup-add-card__fechar-botao");
const popupcard = document.querySelector(".popup-add-card");

export function fecharPopup_add() {
  popupcard.style.display = "none";
}

// ABRIR O POPUP PARA ADICIONAR CARD
function abrirPopup_add() {
  popupcard.style.display = "flex";
}

// CHAMANDO AS FUNÇÕES abrirPopup_add e fecharPopup_add
popupClose_add.addEventListener("click", fecharPopup_add);
popupOpen.addEventListener("click", abrirPopup_add);

// FECHAR CLICANDO NO ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup_img(); // fecha popup de imagem (função exportada do utils.js)
    fecharPopup(); // fecha popup de perfil
    fecharPopup_add(); // fecha popup de adicionar card
    console.log("cliquei em ESC: fechei todos os popups");
  }
});

// FECHAR CLICANDO FORA DOS POPUPS
document.addEventListener("click", (e) => {
  if (e.target === popupImage) {
    popupImage.classList.remove("popup-img__opened_img");
    console.log("Fechei popup imagem clicando fora do card");
  }

  if (e.target === popup) {
    fecharPopup();
    console.log("Fechei popup perfil clicando fora do card");
  }

  if (e.target === popupcard) {
    fecharPopup_add();
    console.log("Fechei popup add card clicando fora do card");
  }
});

// ABRIR POPUP PARA EDITAR O PERFIL NOME E SOBRE MIM

const popup = document.querySelector(".popup"); // variável do popup do perfil interior inclusive lado de fora
const editBotao = document.querySelector(".profile__square"); // classe para abrir o popup perfil
const fecharBotao = document.querySelector(".popup__fechar-botao");

// ABRIR O POPUP PARA ADICIONAR CARD
function abrirPopup() {
  popup.style.display = "flex";
  document.querySelector(".popup__form").reset();
}

// FECHAR O POPUP PARA ADICIONAR CARD
export function fecharPopup() {
  popup.style.display = "none";
}

// CHAMANDO AS FUNÇÕES abrirPopup e fecharPopup
editBotao.addEventListener("click", abrirPopup);
fecharBotao.addEventListener("click", fecharPopup);
