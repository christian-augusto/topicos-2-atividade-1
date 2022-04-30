<template>
  <section class="register-form">
    <form class="flex" @submit="registerFormSubmit">
      <div class="form__field flex">
        <label for="completeName-input">{{ translations.translation("completeNameInputLabel") }}</label>
        <input
          type="text"
          id="completeName-input"
          autocomplete="nope"
          required="required"
          minlength="5"
          :placeholder="translations.translation('completeNameInputPlaceholder')"
          v-model="completeName"
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__field flex">
        <label for="email-input">{{ translations.translation("emailInputLabel") }}</label>
        <input
          type="email"
          id="email-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('emailInputPlaceholder')"
          v-model="email"
          :class="{ 'is--blocked': blockedForm }"
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
          maxlength="10"
          required="required"
          :placeholder="translations.translation('birthDateInputPlaceholder')"
          v-model="birthDate"
          v-imask="birthDateMask"
          :class="{ 'has-errors': invalidBirthDate, 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__field flex">
        <label for="gender-select">{{ translations.translation("genderSelectLabel") }}</label>
        <select id="gender-select" v-model="gender" required="required" :class="{ 'is--blocked': blockedForm }">
          <option value="">{{ translations.translation("genderSelectPlaceholder") }}</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
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
          maxlength="14"
          required="required"
          :placeholder="translations.translation('cpfInputPlaceholder')"
          v-model="cpf"
          v-imask="cpfMask"
          :class="{ 'has-errors': invalidCpf, 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__field flex">
        <label for="postalCode-input">{{ translations.translation("postalCodeInputLabel") }}</label>
        <input
          type="text"
          id="postalCode-input"
          autocomplete="nope"
          minlength="9"
          maxlength="9"
          required="required"
          :placeholder="translations.translation('postalCodeInputPlaceholder')"
          v-model="postalCode"
          v-imask="postalCodeMask"
          :class="{ 'is--blocked': blockStateAndCities || blockedForm }"
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
          :class="{ 'is--blocked': blockedForm }"
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
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__field flex">
        <label for="state-select">{{ translations.translation("stateSelectLabel") }}</label>
        <select
          id="state-select"
          v-if="states.length > 0"
          v-model="state"
          required="required"
          :class="{ 'is--blocked': blockStateAndCities || blockedForm }"
        >
          <option value="">{{ translations.translation("stateSelectPlaceholder") }}</option>
          <option v-for="state in states" :key="state.id" :data-id="state.id" :value="state.sigla">
            {{ state.nome }}
          </option>
        </select>
        <select
          id="state-select"
          v-else
          required="required"
          :class="{ 'is--blocked': blockStateAndCities || blockedForm }"
        >
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
          :class="{ 'is--blocked': blockStateAndCities || blockedForm }"
        >
          <option value="">{{ translations.translation("citySelectPlaceholder") }}</option>
          <option v-for="city in cities" :key="city.id" :value="city.nome">
            {{ city.nome }}
          </option>
        </select>
        <select
          id="city-select"
          v-else
          required="required"
          :class="{ 'is--blocked': blockStateAndCities || blockedForm }"
        >
          <option value="">{{ translations.translation("citySelectPlaceholder") }}</option>
        </select>
      </div>
      <div class="form__field flex" id="acceptedTerms-wrapper">
        <label for="acceptedTerms-input">{{ translations.translation("acceptedTermsInputLabel") }}</label>
        <input
          type="checkbox"
          id="acceptedTerms-input"
          autocomplete="nope"
          required="required"
          v-model="acceptedTerms"
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__actions flex">
        <button type="submit" class="form__send-btn" :class="{ 'is--blocked': blockedForm || !acceptedTerms }">
          Cadastrar
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { IMaskDirective } from "vue-imask";

import Translations from "@/translations";
import translationsData from "./translations.json";
import { queryAddressByPostalCode, getStates, getStateCities, sendValidateCpf, sendRegister } from "./requests";
import { InvalidCpfError, SendRegisterError } from "./errors";
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
      completeName: "",
      email: "",
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
      blockedForm: false,
      acceptedTerms: false,
    };
  },
  watch: {
    cpf() {
      this.invalidCpf = false;
    },
    birthDate() {
      this.invalidBirthDate = false;
    },
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
    validBirthDate() {
      const birthDateSplit = this.birthDate.split("/");

      const aux = birthDateSplit[0];
      birthDateSplit[0] = birthDateSplit[1];
      birthDateSplit[1] = aux;

      const date = new Date(birthDateSplit.join("/"));

      return date instanceof Date && !isNaN(date);
    },
    registerFormSubmit(event) {
      event.preventDefault();

      this.register();
    },
    formatBirthDate() {
      return this.birthDate.split("/").reverse().join("-");
    },
    async register() {
      this.blockForm = true;

      const data = {
        nomeCompleto: this.completeName,
        dataNascimento: this.formatBirthDate(),
        sexo: this.gender,
        cpf: this.cpf.replace(/\D/gim, ""),
        logradouro: this.street,
        numeroLogradouro: this.streetNumber,
        cep: this.postalCode.replace(/\D/gim, ""),
        uf: this.state,
        cidade: this.city,
        email: this.email,
      };

      if (!this.validBirthDate()) {
        this.invalidBirthDate = true;
        alert(translations.translation("invalidBirthDateWarning"));
        this.blockForm = false;
        this.$refs.birthDate.focus();
        return;
      }

      try {
        await sendValidateCpf(data.cpf);
      } catch (error) {
        if (error instanceof InvalidCpfError) {
          this.invalidCpf = true;
          alert(error.message);
        } else {
          console.error(error);
        }

        this.blockForm = false;
        this.$refs.cpf.focus();
        return;
      }

      try {
        const responseBody = await sendRegister(data);

        alert(responseBody.message);
      } catch (error) {
        if (error instanceof SendRegisterError) {
          alert(error.message);
        } else {
          console.error(error);
        }
      }

      this.blockForm = false;

      document.location.reload();
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>
