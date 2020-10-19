import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { query as q, Client } from "faunadb";
import sidebar from "./modules/sidebar";
import levels from "./modules/levels";

const vuexPersist = new VuexPersist({
  key: "app-state",
  storage: window.localStorage,
});
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state() {
    return {
      authenticated: false,
      settings: {
        showCgpa: false,
      },
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  actions: {
    async logout({ commit }) {
      return new Promise((resolve, reject) => {
        const client = new Client({
          secret: localStorage.getItem("DB_SECRET"),
        });
        client
          .query(q.Logout(true))
          .then(() => {
            commit("setAuthenticated", false);
            localStorage.clear();
            resolve("success");
          })
          .catch(({ message }) => reject(message));
      });
    },
    async toggleCgpaVisibility({ state, commit }) {
      if (!state.authenticated) {
        commit("toggleCgpaVisibility");
      } else {
        commit("toggleCgpaVisibility");
      }
    },
  },
  mutations: {
    setAuthenticated(state, val) {
      state.authenticated = val;
    },
    setUser(state, user) {
      state.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    },
    toggleCgpaVisibility(state) {
      state.settings.showCgpa = !state.settings.showCgpa;
    },
  },
  modules: {
    sidebar,
    levels,
  },
});
