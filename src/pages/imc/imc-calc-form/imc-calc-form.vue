<template>
  <section class="imc-calc">
    <form class="flex" @submit="imcCalcFormSubmit">
      <div class="form__field flex">
        <label for="weight-input">{{ translations.translation("weightInputLabel") }}</label>
        <input
          type="number"
          id="weight-input"
          autocomplete="nope"
          min="0"
          required="required"
          :placeholder="translations.translation('weightInputPlaceholder')"
          v-model="weight"
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__field flex">
        <label for="height-input">{{ translations.translation("heightInputLabel") }}</label>
        <input
          type="number"
          id="height-input"
          min="0"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('heightInputPlaceholder')"
          v-model="height"
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__actions flex">
        <button type="button" class="form__clean-btn" @click="cleanForm" :class="{ 'is--blocked': blockedForm }">
          Limpar
        </button>
        <button type="submit" class="form__send-btn" :class="{ 'is--blocked': blockedForm }">Calcular</button>
      </div>
      <div class="form__result flex">
        <p>{{ classification }}</p>
      </div>
    </form>
  </section>
</template>

<script>
import Translations from "@/translations";
import translationsData from "./translations.json";
import { sendCalcImc } from "./requests";
import "./imc-calc-form.scss";

const translations = new Translations(translationsData);

export default {
  data() {
    return {
      weight: "",
      height: "",
      classification: "",
      translations,
      blockedForm: false,
    };
  },
  methods: {
    async calcImc() {
      this.blockedForm = true;

      const height = Number(this.height) / 100;
      const weight = Number(this.weight);

      const responseBody = await sendCalcImc(height, weight);

      if (responseBody == null) {
        this.classification = translations.translation("imcCalcError");
      } else {
        this.classification = responseBody.message;
      }

      this.blockedForm = false;
    },
    imcCalcFormSubmit(event) {
      event.preventDefault();

      this.calcImc();
    },
    cleanForm() {
      this.weight = "";
      this.height = "";
      this.classification = "";
    },
  },
};
</script>
