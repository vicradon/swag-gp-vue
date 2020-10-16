import Vue from "vue";
import Vuex from "vuex";
import sidebar from "./modules/sidebar";
Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      authenticated: false,
    };
  },
  mutations: {
    setAuthenticated(state, val) {
      state.authenticated = val;
    },
  },
  modules: {
    sidebar,
  },
});
