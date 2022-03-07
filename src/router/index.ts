import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@pages/Home/Home.vue";
import Register from "@pages/Register/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
