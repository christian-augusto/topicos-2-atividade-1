function setTranslations() {
  const translations = {};

  translations.weightInputLabel = "Peso(kg):";
  translations.weightInputPlaceholder = "80";

  translations.heightInputLabel = "Altura(cm):";
  translations.heightInputPlaceholder = "150";

  const prefix = "Classificação:";
  translations.imcFirstClass = `${prefix} MAGREZA`;
  translations.imcSecondClass = `${prefix} NORMAL`;
  translations.imcThirdClass = `${prefix} SOBREPESO`;
  translations.imcFourthClass = `${prefix} OBESIDADE`;
  translations.imcFifthClass = `${prefix} OBESIDADE GRAVE`;

  return translations;
}

export default setTranslations();
