export default class Card {
  constructor(name, link, templateSelector, handleImageClick, handleDelete) {
    // Guarda os dados do card
    // .this = new Card(item.name, item.link, ".elements", openPopup_img);
    this._name = name; // nome da imagem / título do card
    this._link = link; // link da imagem

    // Guarda o seletor do template que será usado para criar o card
    this._templateSelector = templateSelector; // é a classe .elements do HTML

    // Função recebida de fora para abrir o popup
    this._handleImageClick = handleImageClick; // é função openPopup_img do utils.js

    // função externa para deletar o card
    this._handleDelete = handleDelete; // é a função excluir_card do utils.js
  }

  // Método para pegar e clonar o template
  _getTemplate() {
    // 1. Seleciona o template no HTML usando o seletor (class='elements')
    const template = document.querySelector(this._templateSelector).content;

    // 2. Clona o elemento do template (true = clona todos os filhos ou seja toda a class .element que fica dentro da classe .elements)
    const cardElement = template.querySelector(".element").cloneNode(true);

    // 3. Retorna o elemento clonado pronto para ser preenchido
    return cardElement;
  }

  // Configura todos os listeners do card
  _setEventListeners() {
    const elementImage = this._element.querySelector(".element__image");
    const likeButton = this._element.querySelector(".element__like-button");
    const deleteButton = this._element.querySelector(".element__lixeira-icon");

    // Clique na imagem → abre popup
    elementImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name, this._name);
    });

    // Clique no botão de like → alterna classe
    likeButton.addEventListener("click", () => {
      const icon = likeButton.querySelector(".element__like-icon");
      icon.classList.toggle("element__like-icon_active");
    });

    deleteButton.addEventListener("click", () => {
      this._handleDelete(this._element); // Chama a função xcluir_card do utils.js e atibui o this._element (toda a class .element)
    });
  }

  // Preenche os dados do card
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._link;
    elementImage.alt = this._name;

    return this._element;
  }
}
