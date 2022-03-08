<template>
  <section class="imc-calc">
    <form class="flex" @submit="imcCalcFormSubmit">
      <div class="form__field flex">
        <label for="weight-input">{{ translations.weightInputLabel }}</label>
        <input
          type="number"
          id="weight-input"
          autocomplete="nope"
          min="0"
          required="required"
          :placeholder="translations.weightInputPlaceholder"
          v-model="weight"
        />
      </div>
      <div class="form__field flex">
        <label for="height-input">{{ translations.heightInputLabel }}</label>
        <input
          type="number"
          id="height-input"
          min="0"
          autocomplete="nope"
          required="required"
          :placeholder="translations.heightInputPlaceholder"
          v-model="height"
        />
      </div>
      <div class="form__actions flex">
        <button type="button" class="form__clean-btn" @click="cleanForm">Limpar</button>
        <button type="submit" class="form__send-btn">Calcular</button>
      </div>
      <div class="form__result flex">
        <p>{{ imc }}</p>
      </div>
      <div class="form__result flex">
        <p>{{ classification }}</p>
      </div>
    </form>
  </section>
</template>

<script>
import translations from "./translations";
import "./imc-calc.scss";

const IMC_FIRST_CLASS_SEP = 18.5;
const IMC_SECOND_CLASS_SEP = 24.9;
const IMC_THIRD_CLASS_SEP = 29.9;
const IMC_FOURTH_CLASS_SEP = 39.9;

export default {
  data() {
    return {
      weight: "",
      height: "",
      imc: "",
      classification: "",
      translations,
    };
  },
  methods: {
    calcImc() {
      const height = Number(this.height) / 100;
      const weight = Number(this.weight);

      const imc = weight / (height * height);

      this.imc = `${imc}`;

      if (imc < IMC_FIRST_CLASS_SEP) {
        this.classification = translations.imcFirstClass;
      } else if (imc < IMC_SECOND_CLASS_SEP) {
        this.classification = translations.imcSecondClass;
      } else if (imc < IMC_THIRD_CLASS_SEP) {
        this.classification = translations.imcThirdClass;
      } else if (imc < IMC_FOURTH_CLASS_SEP) {
        this.classification = translations.imcFourthClass;
      } else {
        this.classification = translations.imcFifthClass;
      }
    },
    imcCalcFormSubmit(event) {
      event.preventDefault();

      this.calcImc();
    },
    cleanForm() {
      this.weight = "";
      this.height = "";
      this.imc = "";
      this.classification = "";
    },
  },
};
</script>
