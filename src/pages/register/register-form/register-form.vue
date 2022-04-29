<template>
  <section class="register-form">
    <form class="flex" @submit="registerFormSubmit">
      <div class="form__field flex">
        <label for="name-input">{{ translations.translation("nameInputLabel") }}</label>
        <input
          type="text"
          id="name-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('nameInputPlaceholder')"
          v-model="name"
        />
      </div>
      <div class="form__field flex">
        <label for="birthDate-input">{{ translations.translation("birthDateInputLabel") }}</label>
        <input
          type="text"
          id="birthDate-input"
          ref="birthDate"
          autocomplete="nope"
          minlength="10"
          required="required"
          :placeholder="translations.translation('birthDateInputPlaceholder')"
          v-model="birthDate"
          v-imask="birthDateMask"
          :class="{ 'has-errors': invalidBirthDate }"
        />
      </div>
      <div class="form__field flex">
        <label for="gender-select">{{ translations.translation("genderSelectLabel") }}</label>
        <select id="gender-select" v-model="gender" required="required">
          <option value="">{{ translations.translation("genderSelectPlaceholder") }}</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div class="form__field flex">
        <label for="cpf-input">{{ translations.translation("cpfInputLabel") }}</label>
        <input
          type="text"
          id="cpf-input"
          ref="cpf"
          autocomplete="nope"
          minlength="14"
          required="required"
          :placeholder="translations.translation('cpfInputPlaceholder')"
          v-model="cpf"
          v-imask="cpfMask"
          :class="{ 'has-errors': invalidCpf }"
        />
      </div>
      <div class="form__field flex">
        <label for="postalCode-input">{{ translations.translation("postalCodeInputLabel") }}</label>
        <input
          type="text"
          id="postalCode-input"
          autocomplete="nope"
          minlength="9"
          required="required"
          :placeholder="translations.translation('postalCodeInputPlaceholder')"
          v-model="postalCode"
          v-imask="postalCodeMask"
          :class="{ 'is--blocked': blockStateAndCities }"
        />
      </div>
      <div class="form__field flex">
        <label for="street-input">{{ translations.translation("streetInputLabel") }}</label>
        <input
          type="text"
          id="street-input"
          :placeholder="translations.translation('streetInputPlaceholder')"
          v-model="street"
          required="required"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="streetNumber-input">{{ translations.translation("streetNumberInputLabel") }}</label>
        <input
          type="text"
          id="streetNumber-input"
          required="required"
          :placeholder="translations.translation('streetNumberInputPlaceholder')"
          v-model="streetNumber"
          autocomplete="nope"
        />
      </div>
      <div class="form__field flex">
        <label for="state-select">{{ translations.translation("stateSelectLabel") }}</label>
        <select
          id="state-select"
          v-if="states.length > 0"
          v-model="state"
          required="required"
          :class="{ 'is--blocked': blockStateAndCities }"
        >
          <option value="">{{ translations.translation("stateSelectPlaceholder") }}</option>
          <option v-for="state in states" :key="state.id" :data-id="state.id" :value="state.sigla">
            {{ state.nome }}
          </option>
        </select>
        <select id="state-select" v-else required="required" :class="{ 'is--blocked': blockStateAndCities }">
          <option value="">{{ translations.translation("stateSelectPlaceholder") }}</option>
        </select>
      </div>
      <div class="form__field flex">
        <label for="city-select">{{ translations.translation("citySelectLabel") }}</label>
        <select
          id="city-select"
          required="required"
          v-if="cities.length > 0"
          v-model="city"
          :class="{ 'is--blocked': blockStateAndCities }"
        >
          <option value="">{{ translations.translation("citySelectPlaceholder") }}</option>
          <option v-for="city in cities" :key="city.id" :value="city.nome">
            {{ city.nome }}
          </option>
        </select>
        <select id="city-select" v-else required="required" :class="{ 'is--blocked': blockStateAndCities }">
          <option value="">{{ translations.translation("citySelectPlaceholder") }}</option>
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

import Translations from "@/translations";
import translationsData from "./translations.json";
import validCpf from "@utils/valid-cpf";
import { queryAddressByPostalCode, getStates, getStateCities } from "./requests";
import "./register-form.scss";

const translations = new Translations(translationsData);

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
      invalidBirthDate: false,
      birthDateMask: {
        mask: "00/00/0000",
      },
      cpfMask: {
        mask: "000.000.000-00",
      },
      gender: "",
      cpf: "",
      invalidCpf: false,
      street: "",
      streetNumber: "",
      postalCode: "",
      postalCodeMask: {
        mask: "00000-000",
      },
      state: "",
      city: "",
      translations,
      states: [],
      stateId: -1,
      cities: [],
      blockStateAndCities: false,
    };
  },
  watch: {
    state() {
      if (this.blockStateAndCities) {
        return;
      }

      this.stateId = getStateIdBySigla(this.state, this.states);
      this.setCities();
    },
    postalCode() {
      this.setStreetByPostalCode();
    },
  },
  mounted() {
    this.setStates();
  },
  methods: {
    async setStreetByPostalCode() {
      if (this.postalCode.length != 9) {
        return;
      }

      this.blockStateAndCities = true;

      const address = await queryAddressByPostalCode(this.postalCode);

      if (address === null) {
        this.blockStateAndCities = false;
        return;
      }

      this.street = address.logradouro;
      this.state = address.uf;

      this.stateId = getStateIdBySigla(this.state, this.states);
      await this.setCities();

      this.city = address.localidade;

      this.blockStateAndCities = false;
    },
    async setStates() {
      const states = await getStates();

      states.sort(function (a, b) {
        return a.nome.localeCompare(b.nome);
      });

      this.states = states;
    },
    async setCities() {
      const cities = await getStateCities(this.stateId);

      cities.sort(function (a, b) {
        return a.nome.localeCompare(b.nome);
      });

      this.cities = cities;
    },
    validBirthDate(birthDate) {
      const birthDateSplit = birthDate.split("/");

      const aux = birthDateSplit[0];
      birthDateSplit[0] = birthDateSplit[1];
      birthDateSplit[1] = aux;

      const date = new Date(birthDateSplit.join("/"));

      return date instanceof Date && !isNaN(date);
    },
    registerFormSubmit(event) {
      event.preventDefault();

      const data = {
        name: this.name,
        birthDate: this.birthDate,
        gender: this.gender,
        cpf: this.cpf.replace(/\D/gim, ""),
        street: this.street,
        streetNumber: this.streetNumber,
        postalCode: this.postalCode,
        state: this.state,
        city: this.city,
      };

      if (!this.validBirthDate(data.birthDate)) {
        this.invalidBirthDate = true;
        alert(translations.translation("invalidBirthDateWarning"));
        this.$refs.birthDate.focus();
        return false;
      }

      if (!validCpf(data.cpf)) {
        this.invalidCpf = true;
        alert(translations.translation("invalidCpfWarning"));
        this.$refs.cpf.focus();
        return false;
      }

      alert(translations.translation("successFormMessage"));

      console.log(data);
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>
