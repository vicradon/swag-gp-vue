<template>
  <v-app>
    <v-main>
      <dashboard-layout>
        <router-view />
      </dashboard-layout>
    </v-main>
  </v-app>
</template>

<script>
import dashboard from "./layout/dashboard";
import { query as q, Client } from "faunadb";

export default {
  name: "App",

  components: {
    "dashboard-layout": dashboard,
  },

  data: () => ({
    //
  }),

  created() {
    const client = new Client({
      secret: localStorage.getItem("DB_SECRET"),
    });
    client
      .query(q.Get(q.Identity()))
      .then((user) => {
        this.$store.commit("setAuthenticated", true);
        this.$store.commit("setAppState", user.data);
      })
      .catch(() => {
        this.$store.commit("setAuthenticated", false);
        this.$store.commit("setAppState", JSON.parse(localStorage.getItem("app-state")));
      });
  },
};
</script>
