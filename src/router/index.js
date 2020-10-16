import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
// import { query as q, Client } from "faunadb";
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
    meta: { requiresLogin: true },
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresLogin && !store.state.authenticated) next({ name: from.name });
  else next();
});

export default router;
