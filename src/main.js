import "regenerator-runtime";
import "es6-promise/auto";
import "fetch-polyfill";
import { createApp } from "vue";

import vApp from "./app.vue";
import router from "./router";
import store from "./store";

document.addEventListener("DOMContentLoaded", function () {
  createApp(vApp).use(store).use(router).mount("#app");
});
