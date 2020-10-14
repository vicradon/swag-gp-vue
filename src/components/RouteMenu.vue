<template>
  <div class="d-flex justify-space-between">
    <h3>{{ title }}</h3>
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <div class="px-3">
          <router-link class="text-decoration-none text--black" to="/profile">Profile</router-link>
        </div>
        <v-btn text>
          <v-icon left>mdi-logout </v-icon>
          <span class="body-2">Logout</span>
        </v-btn>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "RouteMenu",
  props: ["title"],
};
</script>

<style></style>
