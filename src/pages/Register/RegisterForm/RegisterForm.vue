<template>
  <form class="form">
    <div class="form__field">
      <label for="cpf-input">{{ translations["nameInputLabel"] }}</label>
      <input type="text" id="name-input" :placeholder="translations['nameInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="birthDate-input">{{ translations["birthDateInputLabel"] }}</label>
      <input type="text" id="birthDate-input" :placeholder="translations['birthDateInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="name-select">{{ translations["genderSelectLabel"] }}</label>
      <select id="gender-select">
        <option value="">{{ translations["genderSelectPlaceholder"] }}</option>
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
        <option value="other">Outro</option>
      </select>
    </div>
    <div class="form__field">
      <label for="name-input">{{ translations["nameInputLabel"] }}</label>
      <input type="text" id="name-input" :placeholder="translations['nameInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="cpf-input">{{ translations["cpfInputLabel"] }}</label>
      <input type="text" id="cpf-input" :placeholder="translations['cpfInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="street-input">{{ translations["streetInputLabel"] }}</label>
      <input type="text" id="street-input" :placeholder="translations['streetInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="number-input">{{ translations["numberInputLabel"] }}</label>
      <input type="text" id="number-input" :placeholder="translations['numberInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="postalCode-input">{{ translations["postalCodeInputLabel"] }}</label>
      <input type="text" id="postalCode-input" :placeholder="translations['postalCodeInputPlaceholder']" />
    </div>
    <div class="form__field">
      <label for="state-select">{{ translations["stateSelectLabel"] }}</label>
      <select id="state-select">
        <option value="">{{ translations["stateSelectPlaceholder"] }}</option>
      </select>
    </div>
    <div class="form__field">
      <label for="city-select">{{ translations["citySelectLabel"] }}</label>
      <select id="city-select">
        <option value="">{{ translations["citySelectPlaceholder"] }}</option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import translations from "./translations";
import "./RegisterForm.scss";

async function getStates() {
  // https://servicodados.ibge.gov.br/api/v1/localidades/estados
  const request = await fetch();
}

async function getStateCities() {
  // https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/distritos
  const request = await fetch();
}

export default defineComponent({
  data() {
    return {
      translations,
    };
  },
});
</script>
