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

export default {
  name: "App",

  components: {
    "dashboard-layout": dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
