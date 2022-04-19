
import { createRouter, createWebHashHistory } from "vue-router";
import HomePageVue from "../pages/HomePage.vue";
import InvoiceDetailVue from "../pages/InvoiceDetailPage.vue";

export const routes = [
  { path: '/', component: HomePageVue },
  { path: '/invoices/:id', component: InvoiceDetailVue }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})