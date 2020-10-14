import Vue from "vue";
import VueRouter from "vue-router";
import Levels from "../views/Levels.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "levels" },
  },
  {
    path: "/levels",
    name: "levels",
    component: Levels,
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
