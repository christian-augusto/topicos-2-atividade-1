import Translations from "@interfaces/translations";

function setTranslations() {
  const translations: Translations = {};

  translations["logoImg"] = "Mais Saúde Logo";
  translations["navigationHomeLink"] = "Home";
  translations["navigationRegisterLink"] = "Cadastre-se";

  return translations;
}

export default setTranslations();
