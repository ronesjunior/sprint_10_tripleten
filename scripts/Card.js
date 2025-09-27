export default class Card {
  constructor(name, link, templateSelector, handleImageClick, handleDelete) {
    // Guarda os dados do card
    // .this = new Card(item.name, item.link, ".elements", openPopup_img);
    this._name = name; // propriedade que recebe o nome da imagem / título do card
    this._link = link; // propriedade que recebe o link da imagem

    // Guarda o seletor do template que será usado para criar o card
    this._templateSelector = templateSelector; // propriedade que recebe a classe .elements do HTML

    // Função recebida de fora para abrir o popup
    this._handleImageClick = handleImageClick; // propriedade que recebe que recebe a função openPopup_img do utils.js

    // função externa para deletar o card
    this._handleDelete = handleDelete; // propriedade que recebe a função excluir_card do utils.js
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
    const salvarButton = this._element.querySelector(
      ".popup-add-card__criar-botao"
    );
    const titleInput = this._element.querySelector(".titulo");
    const linkInput = this._element.querySelector(".link");

    // Clique na imagem → abre popup
    elementImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name, this._name);
    });

    // Clique no botão de like → alterna classe
    likeButton.addEventListener("click", () => {
      const icon = likeButton.querySelector(".element__like-icon");
      icon.classList.toggle("element__like-icon_active");
    });

    // Clique no botão da lixeira → exclui card
    deleteButton.addEventListener("click", () => {
      this._handleDelete(this._element); // Chama a função excluir_card do utils.js e atibui o this._element (toda a class .element)
    });
  }

  // Preenche os dados do card
  generateCard() {
    // .this é o objeto card criado instanciado com todos os dados item.name,item.link... ou seja, é o new card criado
    this._element = this._getTemplate(); // nova propriedade this._element criada que recebe o clone de todo o template (<div> com a classe .element)
    // this (Card) = primeira interação (criou-se nova propriedade this._element)
    //  ├─ _name = "Montanhas Carecas"
    //  ├─ _link = "montanhas.jpg"
    //  ├─ _templateSelector = ".elements"
    //  ├─ _handleImageClick = openPopup_img
    //  ├─ _handleDelete = excluir_card
    //  └─ _element = <div class="element"> ... </div>

    this._element.querySelector(".element__title").textContent = this._name; //A propriedade criada _element recebe o título (item.name) dentro da <div class="element__title">
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;

    this._setEventListeners();
    return this._element; // generateCard() retorna com o objeto instanciado com as propriedades
  }
}
