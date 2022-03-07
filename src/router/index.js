import { createRouter, createWebHashHistory } from "vue-router";
import vHome from "@pages/home/home.vue";
import vRegister from "@pages/register/register.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
