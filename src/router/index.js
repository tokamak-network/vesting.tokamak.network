import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import VueRouter from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/dashboard",
    component: HelloWorld
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
