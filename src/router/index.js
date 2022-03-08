import { createRouter, createWebHashHistory } from "vue-router";

import vHome from "@pages/home/home.vue";
import vRegister from "@pages/register/register.vue";
import vImc from "@pages/imc/imc.vue";
import vAboutUs from "@pages/about-us/about-us.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: vHome,
  },
  {
    path: "/register",
    name: "register",
    component: vRegister,
  },
  {
    path: "/imc",
    name: "imc",
    component: vImc,
  },
  {
    path: "/about-us",
    name: "about-us",
    component: vAboutUs,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
