<template>
  <section class="register-form">
    <form class="form flex" @submit="registerFormSubmit">
      <div class="form__field flex">
        <label for="cpf-input">{{ translations["nameInputLabel"] }}</label>
        <input
          type="text"
          id="name-input"
          :placeholder="translations['nameInputPlaceholder']"
          @change="nameInputOnChange"
          required="required"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="birthDate-input">{{ translations["birthDateInputLabel"] }}</label>
        <input
          type="text"
          id="birthDate-input"
          required="required"
          autocomplete="nope"
          :placeholder="translations['birthDateInputPlaceholder']"
          v-imask="birthDateMask"
          @change="birthDateInputOnChange"
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
          :placeholder="translations['cpfInputPlaceholder']"
          @change="cpfInputOnChange"
          required="required"
          autocomplete="nope"
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

<script lang="ts">
import { defineComponent } from "vue";
import { IMaskComponent } from "vue-imask";

import translations from "./translations";
import State from "./interfaces/state";
import City from "./interfaces/city";
import RegisterForm from "./interfaces/register-form";
import { getStates, getStateCities } from "./requests";
import "./register-form.scss";

function getStateIdBySigla(sigla: string, states: Array<State>): number {
  for (let i = 0; i < states.length; i++) {
    if (states[i].sigla == sigla) {
      return states[i].id;
    }
  }

  return -1;
}

export default defineComponent({
  data() {
    return {
      name: "",
      birthDate: "",
      birthDateMask: {
        mask: Date,
        min: new Date(1900, 0, 1),
        max: new Date(),
        lazy: false,
      },
      gender: "",
      cpf: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      state: "",
      city: "",

      translations,
      states: new Array<State>(),
      stateId: -1,
      cities: new Array<City>(),
    };
  },
  components: {
    "imask-input": IMaskComponent,
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
    nameInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.name = target.value;
    },
    birthDateInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.birthDate = target.value;
    },
    genderSelectOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.gender = target.value;
    },
    cpfInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.cpf = target.value;
    },
    streetInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.street = target.value;
    },
    streetNumberInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.streetNumber = target.value;
    },
    postalCodeInputOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.postalCode = target.value;
    },
    stateSelectOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.state = target.value;
      this.stateId = getStateIdBySigla(target.value, this.states);
    },
    citySelectOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.city = target.value;
    },
    registerFormSubmit() {
      const data: RegisterForm = {
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
});
</script>
