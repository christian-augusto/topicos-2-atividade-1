import "regenerator-runtime";
import "es6-promise/auto";
import "fetch-polyfill";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

document.addEventListener("DOMContentLoaded", function () {
  createApp(App).use(router).mount("#app");
});
