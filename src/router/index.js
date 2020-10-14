import Vue from "vue";
import VueRouter from "vue-router";
import Levels from "../views/Levels.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Levels1",
    component: Levels
  },
  {
    path: "/levels",
    name: "Levels",
    component: Levels
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
