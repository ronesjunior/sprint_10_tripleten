class FormValidator {
  constructor(config, formElement) {
    // Guarda 2 parêmetro: seletores e classes de formulários + elemento de formulário para ser validado
    this._config = config; // configuração de seletores e classes de formulários
    this._formElement = formElement; // elemento de formulário para ser validado
  }

  enableValidation() {}
}
