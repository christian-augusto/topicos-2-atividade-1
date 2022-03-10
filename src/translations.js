import argumentRequired from "@errors/required-param";
import browserLanguage from "@utils/browser-language";

class Translations {
  constructor(languagesTranslations = argumentRequired()) {
    this.languagesTranslations = languagesTranslations;
  }

  translation(key = argumentRequired()) {
    let languageKey = null;

    if (this.isPt()) {
      languageKey = "pt";
    }

    return this.languagesTranslations[languageKey][key];
  }

  isPt() {
    return browserLanguage.indexOf("pt") != -1;
  }
}

export default Translations;
