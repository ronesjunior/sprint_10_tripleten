// 🔹 Função genérica que recebe uma config
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  console.log("formlist=", formList);

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    console.log("inputlist=", inputList);
    console.log("formelement=", formElement);

    const toggleButtonState = () => {
      if (inputList.some((input) => !input.validity.valid)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };

    const checkInputValidity = (inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      console.log(inputElement);
      if (!inputElement.validity.valid) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(config.errorClass);
      } else {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(config.errorClass);
      }
    };

    toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement);
        toggleButtonState();
      });
    });

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!inputList.some((input) => !input.validity.valid)) {
        console.log("✅ Formulário válido e pronto para envio!");
      }
    });
  });

  // fechar popup clicando fora da janela (na sobreposição)
  const overlay = document.querySelector(config.popupSelector);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      // garante que só fecha se clicar fora do conteúdo
      overlay.style.display = "none";
    }
  });

  // Fechar ao pressionar Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.style.display = "none";
    }
  });
};

// Object Configuração de validação para o popup "perfil"  (função enableValidation que envia um Object com key e value)
enableValidation({
  popupSelector: "#popup", // Seleciona qual popup vai ser validado
  formSelector: ".popup__form", // Seleciona qual form vai ser validado
  inputSelector: ".popup__input", // Seleciona os inputs dentro do form
  submitButtonSelector: ".popup__button", // Seleciona o botão de submit
  inactiveButtonClass: "popup__button_disabled", // Classe aplicada ao botão desativado
  inputErrorClass: "popup__input_type_error", // Classe aplicada ao input inválido
  errorClass: "popup__error_visible", // Classe aplicada à mensagem de erro
});

// Configuração de validação para o popup "card" (função enableValidation que envia um Object com key e value)
enableValidation({
  popupSelector: "#popup-add-card",
  formSelector: "#popup-add-card__form",
  inputSelector: ".popup-add-card__entrada",
  submitButtonSelector: ".popup-add-card__criar-botao",
  inactiveButtonClass: "popup-add-card__criar-botao_inativo",
  inputErrorClass: "popup-add-card__entrada_tipo_erro",
  errorClass: "popup-add-card__entrada-error_ativo",
});
