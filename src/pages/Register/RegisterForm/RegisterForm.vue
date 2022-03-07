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
      <select id="state-select" v-if="states.length > 0" @change="stateSelectOnChange">
        <option value="">{{ translations["stateSelectPlaceholder"] }}</option>
        <option v-for="state in states" :key="state.id" :data-id="state.id" :value="state.sigla">
          {{ state.nome }}
        </option>
      </select>
      <select id="state-select" v-else>
        <option value="">{{ translations["stateSelectPlaceholder"] }}</option>
      </select>
    </div>
    <div class="form__field">
      <label for="city-select">{{ translations["citySelectLabel"] }}</label>
      <select id="city-select" v-if="cities.length > 0" @change="citySelectOnChange">
        <option value="">{{ translations["citySelectPlaceholder"] }}</option>
        <option v-for="city in cities" :key="city.id" :data-id="city.id" :value="city.sigla">
          {{ city.nome }}
        </option>
      </select>
      <select id="city-select" v-else>
        <option value="">{{ translations["citySelectPlaceholder"] }}</option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import translations from "./translations";
import State from "./interfaces/state";
import City from "./interfaces/city";
import "./RegisterForm.scss";
import { buildHeaders } from "@utils/api-call";

async function getStates(): Promise<State[]> {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  try {
    const headers = new Map<string, string>();

    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(headers),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getStateCities(stateId: number): Promise<City[]> {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`;

  try {
    const headers = new Map<string, string>();

    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(headers),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
      translations,
      states: new Array<State>(),
      state: "",
      stateId: -1,
      cities: new Array<City>(),
      city: "",
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
    stateSelectOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.state = target.value;
      this.stateId = getStateIdBySigla(target.value, this.states);
    },
    citySelectOnChange(event: Event) {
      const target = <HTMLInputElement>event.target;

      this.city = target.value;
    },
  },
});
</script>
