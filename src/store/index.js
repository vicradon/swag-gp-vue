import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { query as q, Client } from "faunadb";
import levels, { initialLevelsState } from "./modules/levels";

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
    };
  },
  actions: {
    async logout({ commit }) {
      const client = new Client({
        secret: localStorage.getItem("DB_SECRET"),
      });

      return new Promise((resolve, reject) => {
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
        const client = new Client({
          secret: localStorage.getItem("DB_SECRET"),
        });
        client
          .query(
            q.Update(q.Identity(), {
              data: { settings: { showCgpa: !state.settings.showCgpa } },
            }),
          )
          .then(() => {
            commit("toggleCgpaVisibility");
          });
      }
    },
    async initialStateSync({ state }) {
      const client = new Client({
        secret: localStorage.getItem("DB_SECRET"),
      });

      return new Promise((reject) => {
        client
          .query(
            q.Update(q.Identity(), {
              data: {
                ...state,
                levels: initialLevelsState,
              },
            }),
          )
          // .then((user) => localStorage.setItem("app-state", JSON.stringify(user.data)))
          .catch(({ message }) => reject(message));
      });
    },
  },
  mutations: {
    setAuthenticated(state, val) {
      state.authenticated = val;
    },
    setAppState(state, value) {
      Vue.set(state, "levels", value.levels);
      Vue.set(state, "settings", value.settings);
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
    levels,
  },
});
