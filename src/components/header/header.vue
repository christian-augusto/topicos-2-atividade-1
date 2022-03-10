<template>
  <header class="header">
    <div class="header__wrapper flex">
      <div class="header__logo">
        <router-link to="/">
          <img class="header__logo-img" src="@assets/svg/logo.svg" :alt="translations.translation('logoImgAlt')" />
        </router-link>
      </div>
      <nav class="header__navigation">
        <ul class="flex">
          <li>
            <router-link to="/">{{ translations.translation("navigationHomeLink") }}</router-link>
          </li>
          <li>
            <router-link to="/register">{{ translations.translation("navigationRegisterLink") }}</router-link>
          </li>
          <li>
            <router-link to="/imc">{{ translations.translation("navigationImcLink") }}</router-link>
          </li>
          <li>
            <router-link to="/about-us">{{ translations.translation("navigationAboutUsLink") }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Translations from "@/translations";
import translationsData from "./translations.json";
import "./header.scss";

const translations = new Translations(translationsData);

export default {
  data() {
    return {
      translations: translations,
    };
  },
};
</script>
