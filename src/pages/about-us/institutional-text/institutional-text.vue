<template>
  <section class="institutional-text">
    <div class="institutional-text__wrapper flex">
      <h1 class="main__title">Mais Saúde</h1>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title">Visão</h4>
      <p v-html="translations.translation('target')"></p>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title">Missão</h4>
      <p v-html="translations.translation('mission')"></p>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title">Valores</h4>
      <p v-html="translations.translation('importance')"></p>
    </div>
  </section>
</template>

<script>
import Translations from "@/translations";
import translationsData from "./translations.json";
import "./institutional-text.scss";

const translations = new Translations(translationsData);

export default {
  data() {
    return {
      translations,
    };
  },
};
</script>
