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
  console.log("elemento excluído = ", element);
  element.remove();
};
