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
      secret: localStorage.getItem("db_secret"),
    });
    client
      .query(q.Select(["ref", "id"], q.Get(q.Ref(q.Collection("Users"), "279519516000518663"))))
      .then(() => {
        this.$store.commit("setAuthenticated", true);
      })
      .catch(() => {
        this.$store.commit("setAuthenticated", false);
      });
  },
};
</script>
