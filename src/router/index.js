
import { createRouter, createWebHashHistory } from "vue-router";
import HomePageVue from "../pages/HomePage.vue";

const routes = [
  { path: '/', component: HomePageVue },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})