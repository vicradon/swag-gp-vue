<template>
  <div class="d-flex justify-space-between">
    <h3>{{ title }}</h3>
    <v-menu open-on-click bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <div v-if="authenticated" class="px-3">
          <router-link class="text-decoration-none text--black" to="/profile">Profile</router-link>
        </div>
        <v-btn @click="logout()" v-if="authenticated" text>
          <v-icon left>mdi-logout</v-icon>
          <span class="body-2">Logout</span>
        </v-btn>
        <v-btn v-else text>
          <AuthModal>
            <v-icon left>mdi-login</v-icon>
            <span class="body-2">Login</span>
          </AuthModal>
        </v-btn>
      </v-list>
    </v-menu>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AuthModal from "./AuthModal.vue";

export default {
  name: "RouteMenu",
  props: ["title"],
  components: { AuthModal },
  data: () => ({
    snackbar: false,
    error: "",
    loading: "",
    timeout: 2000,
  }),
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout").catch(function(message) {
        this.snackbar = true;
        this.error = message;
      });
    },
  },
};
</script>

<style></style>
