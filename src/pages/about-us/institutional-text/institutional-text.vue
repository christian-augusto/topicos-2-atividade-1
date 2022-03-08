<template>
  <section class="institutional-text">
    <div class="institutional-text__wrapper">
      <h1 class="main__title">Mais Saúde</h1>
    </div>
    <div class="institutional-text__wrapper">
      <h4 class="main__sub-title">Visão</h4>
      <p v-html="translations.target"></p>
    </div>
    <div class="institutional-text__wrapper">
      <h4 class="main__sub-title">Missão</h4>
      <p v-html="translations.mission"></p>
    </div>
    <div class="institutional-text__wrapper">
      <h4 class="main__sub-title">Valores</h4>
      <p v-html="translations.importance"></p>
    </div>
  </section>
</template>

<script>
import translations from "./translations";
import "./institutional-text.scss";

export default {
  data() {
    return {
      translations,
    };
  },
};
</script>
