import Vue from "vue";
import Router from "vue-router";
import SelectWalletContainer from "@/containers/SelectWalletContainer.vue";
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/dashboard",
    component: SelectWalletContainer
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
