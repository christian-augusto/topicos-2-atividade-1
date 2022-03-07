function setTranslations() {
  const translations = {};

  translations.nameInputLabel = "Nome completo:";
  translations.nameInputPlaceholder = "Nome completo";

  translations.birthDateInputLabel = "Data de nascimento:";
  translations.birthDateInputPlaceholder = "__/__/____";

  translations.genderSelectLabel = "Gênero:";
  translations.genderSelectPlaceholder = "Selecione o gênero";

  translations.cpfInputLabel = "CPF:";
  translations.cpfInputPlaceholder = "XXX.XXX.XXX-XX";

  translations.streetInputLabel = "Logradouro:";
  translations.streetInputPlaceholder = "";

  translations.streetNumberInputLabel = "Número do Logradouro:";
  translations.streetNumberInputPlaceholder = "";

  translations.postalCodeInputLabel = "CEP:";
  translations.postalCodeInputPlaceholder = "";

  translations.stateSelectLabel = "Estado:";
  translations.stateSelectPlaceholder = "Selecione o estado";

  translations.citySelectLabel = "Cidade:";
  translations.citySelectPlaceholder = "Selecione a cidade";

  translations.invalidBirthDateWarning = "Data de nascimento não é válida";

  translations.invalidCpfWarning = "CPF não é válido";

  translations.successFormMessage = "Solicitação de cadastro enviada com sucesso";

  return translations;
}

export default setTranslations();
