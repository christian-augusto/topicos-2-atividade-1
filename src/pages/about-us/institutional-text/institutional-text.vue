<template>
  <section class="institutional-text">
    <div class="institutional-text__wrapper flex">
      <h1 class="main__title" v-html="translations.translation('pageTitle')"></h1>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title" v-html="translations.translation('targetTitle')"></h4>
      <p v-html="translations.translation('targetText')"></p>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title" v-html="translations.translation('missionTitle')"></h4>
      <p v-html="translations.translation('missionText')"></p>
    </div>
    <div class="institutional-text__wrapper flex">
      <h4 class="main__sub-title" v-html="translations.translation('importanceTitle')"></h4>
      <p v-html="translations.translation('importanceText')"></p>
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
