<template>
  <section class="register-form">
    <form class="form flex" @submit="registerFormSubmit">
      <div class="form__field flex">
        <label for="cpf-input">{{ translations["nameInputLabel"] }}</label>
        <input
          type="text"
          id="name-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations['nameInputPlaceholder']"
          @change="nameInputOnChange"
        />
      </div>
      <div class="form__field flex">
        <label for="birthDate-input">{{ translations["birthDateInputLabel"] }}</label>
        <input
          type="text"
          id="birthDate-input"
          autocomplete="nope"
          minlength="10"
          required="required"
          :placeholder="translations['birthDateInputPlaceholder']"
          @change="birthDateInputOnChange"
          v-imask="birthDateMask"
        />
      </div>
      <div class="form__field flex">
        <label for="name-select">{{ translations["genderSelectLabel"] }}</label>
        <select id="gender-select" @change="genderSelectOnChange" required="required">
          <option value="">{{ translations["genderSelectPlaceholder"] }}</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div class="form__field flex">
        <label for="cpf-input">{{ translations["cpfInputLabel"] }}</label>
        <input
          type="text"
          id="cpf-input"
          autocomplete="nope"
          minlength="14"
          required="required"
          :placeholder="translations['cpfInputPlaceholder']"
          @change="cpfInputOnChange"
          v-imask="cpfMask"
        />
      </div>
      <div class="form__field flex">
        <label for="street-input">{{ translations["streetInputLabel"] }}</label>
        <input
          type="text"
          id="street-input"
          :placeholder="translations['streetInputPlaceholder']"
          @change="streetInputOnChange"
          required="required"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="streetNumber-input">{{ translations["streetNumberInputLabel"] }}</label>
        <input
          type="text"
          id="streetNumber-input"
          :placeholder="translations['streetNumberInputPlaceholder']"
          @change="streetNumberInputOnChange"
          required="required"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="postalCode-input">{{ translations["postalCodeInputLabel"] }}</label>
        <input
          type="text"
          id="postalCode-input"
          :placeholder="translations['postalCodeInputPlaceholder']"
          @change="postalCodeInputOnChange"
          required="required"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="state-select">{{ translations["stateSelectLabel"] }}</label>
        <select id="state-select" v-if="states.length > 0" @change="stateSelectOnChange" required="required">
          <option value="">{{ translations["stateSelectPlaceholder"] }}</option>
          <option v-for="state in states" :key="state.id" :data-id="state.id" :value="state.sigla">
            {{ state.nome }}
          </option>
        </select>
        <select id="state-select" v-else required="required">
          <option value="">{{ translations["stateSelectPlaceholder"] }}</option>
        </select>
      </div>
      <div class="form__field flex">
        <label for="city-select">{{ translations["citySelectLabel"] }}</label>
        <select id="city-select" v-if="cities.length > 0" @change="citySelectOnChange" required="required">
          <option value="">{{ translations["citySelectPlaceholder"] }}</option>
          <option v-for="city in cities" :key="city.id" :data-id="city.id" :value="city.sigla">
            {{ city.nome }}
          </option>
        </select>
        <select id="city-select" v-else required="required">
          <option value="">{{ translations["citySelectPlaceholder"] }}</option>
        </select>
      </div>
      <div class="form__actions flex">
        <button type="submit" class="form__send-btn">Cadastrar</button>
      </div>
    </form>
  </section>
</template>

<script>
import { IMaskDirective } from "vue-imask";

import translations from "./translations";
import { getStates, getStateCities } from "./requests";
import "./register-form.scss";

function getStateIdBySigla(sigla, states) {
  for (let i = 0; i < states.length; i++) {
    if (states[i].sigla == sigla) {
      return states[i].id;
    }
  }

  return -1;
}

export default {
  data() {
    return {
      name: "",
      birthDate: "",
      birthDateMask: {
        mask: "00/00/0000",
      },
      cpfMask: {
        mask: "000.000.000-00",
      },
      gender: "",
      cpf: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      state: "",
      city: "",

      translations,
      states: [],
      stateId: -1,
      cities: [],
    };
  },
  watch: {
    state() {
      this.setCities();
    },
  },
  mounted() {
    this.setStates();
  },
  methods: {
    async setStates() {
      this.states = await getStates(); // sort states
    },
    async setCities() {
      this.cities = await getStateCities(this.stateId); // sort cities
    },
    nameInputOnChange(event) {
      this.name = event.target.value;
    },
    birthDateInputOnChange(event) {
      this.birthDate = event.target.value;
    },
    genderSelectOnChange(event) {
      this.gender = event.target.value;
    },
    cpfInputOnChange(event) {
      this.cpf = event.target.value;
    },
    streetInputOnChange(event) {
      this.street = event.target.value;
    },
    streetNumberInputOnChange(event) {
      this.streetNumber = event.target.value;
    },
    postalCodeInputOnChange(event) {
      this.postalCode = event.target.value;
    },
    stateSelectOnChange(event) {
      this.state = event.target.value;
      this.stateId = getStateIdBySigla(event.target.value, this.states);
    },
    citySelectOnChange(event) {
      this.city = event.target.value;
    },
    registerFormSubmit() {
      const data = {
        name: this.name,
        birthDate: this.birthDate,
        gender: this.gender,
        cpf: this.cpf,
        street: this.street,
        streetNumber: this.streetNumber,
        postalCode: this.postalCode,
        state: this.state,
        city: this.city,
      };

      console.log(data);
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>
