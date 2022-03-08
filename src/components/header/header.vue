<template>
  <header class="header">
    <div class="header__wrapper flex">
      <div class="header__logo">
        <router-link to="/">
          <img class="header__logo-img" src="@assets/svg/logo.svg" :alt="translations['logoImg']" />
        </router-link>
      </div>
      <nav class="header__navigation">
        <ul class="flex">
          <li>
            <router-link to="/">{{ translations["navigationHomeLink"] }}</router-link>
          </li>
          <li>
            <router-link to="/register">{{ translations["navigationRegisterLink"] }}</router-link>
          </li>
          <li>
            <router-link to="/imc">{{ translations["navigationImcLink"] }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import translations from "./translations";
import "./header.scss";

export default {
  data() {
    return {
      translations: translations,
    };
  },
};
</script>
