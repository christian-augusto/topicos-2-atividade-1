<template>
  <section class="imc-definition">
    <div class="imc-definition__wrapper flex">
      <h1 class="main__title" v-html="translations.translation('pageTitle')"></h1>
    </div>
    <div class="imc-definition__wrapper flex">
      <h4 class="main__sub-title" v-html="translations.translation('definitionTitle')"></h4>
      <p v-html="translations.translation('definitionText')"></p>
    </div>
    <div class="imc-definition__wrapper flex">
      <h4 class="main__sub-title" v-html="translations.translation('howMeasureTitle')"></h4>
      <p v-html="translations.translation('howMeasureText')"></p>
    </div>
  </section>
</template>

<script>
import Translations from "@/translations";
import translationsData from "./translations.json";
import "./imc-definition.scss";

const translations = new Translations(translationsData);

export default {
  data() {
    return {
      translations,
    };
  },
};
</script>
