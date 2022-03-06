import Translations from "@interfaces/translations";

function setTranslations() {
  const translations: Translations = {};

  translations["banner1ImgSrc"] = require("@/assets/images/home/main-banner-1.jpg");
  translations["banner1ImgAlt"] = "Ícones da saúde em faces de dados (objeto)";

  translations["banner2ImgSrc"] = require("@/assets/images/home/main-banner-2.jpg");
  translations["banner2ImgAlt"] = "Equipamentos médicos";

  translations["banner3ImgSrc"] = require("@/assets/images/home/main-banner-3.jpg");
  translations["banner3ImgAlt"] = "Estetoscópio";

  translations["banner4ImgSrc"] = require("@/assets/images/home/main-banner-4.jpg");
  translations["banner4ImgAlt"] = "IMC";

  return translations;
}

export default setTranslations();
