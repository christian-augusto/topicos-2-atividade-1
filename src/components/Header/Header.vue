<template>
  <header class="header">
    <div class="header__top">
      <div class="header__logo">
        <router-link to="/">
          <img class="header__logo-img" src="@assets/svg/logo.svg" :alt="translations['logoImg']" />
        </router-link>
      </div>
      <nav class="header__navigation">
        <ul class="flex-row">
          <li>
            <router-link to="/">{{ translations["navigationHomeLink"] }}</router-link>
          </li>
          <li>
            <router-link to="/register">{{ translations["navigationRegisterLink"] }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import translations from "./translations";
import "./Header.scss";

export default defineComponent({
  data() {
    return {
      translations: translations,
    };
  },
});
</script>

<style src="./Header.scss" lang="scss"></style>
