<template>
  <div>
    <v-navigation-drawer class="navbar" absolute v-model="drawer" :mini-variant.sync="mini" permanent>
      <div class="pl-4 d-flex">
        <v-icon @click.stop="mini = !mini" color="white">
          mdi-menu
        </v-icon>
        <h3 class="logo">Swag-GP</h3>
      </div>
      <div class="links d-flex flex-column justify-space-between">
        <v-list class="my-7" dense>
          <v-list-item
            :class="{ 'active-link': $route.path === link.location }"
            class="py-3"
            v-for="link in links"
            :key="link.title"
          >
            <v-list-item-icon>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <router-link class="link d-flex align-center text-decoration-none" :to="link.location">
                <v-list-item-title class="white--text body-2 py-1">{{ link.title }}</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list v-if="authenticated" class="my-7" dense>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon color="white">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text body-2 py-1">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
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
export default {
  name: "Drawer",
  data() {
    return {
      mini: this.$props.isMini,
      drawer: true,
      snackbar: false,
      timeout: 2000,
      error: "",
    };
  },
  computed: {
    links() {
      const baselinks = [
        { title: "Levels", location: "/levels", icon: "mdi-poll" },
        { title: "About", location: "/about", icon: "mdi-information-outline" },
        { title: "Settings", location: "/settings", icon: "mdi-cog-outline" },
      ];
      return this.authenticated
        ? [...baselinks, { title: "Profile", location: "/profile", icon: "mdi-account-outline" }]
        : baselinks;
    },
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
  props: ["isMini"],

  watch: {
    mini() {
      this.$emit("miniChanged");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background: linear-gradient(90deg, #29323c 0%, #485563 100%);
  box-shadow: 3px 0px 2px 1px rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  height: 100vh !important;
  position: fixed;
}
.navbar-width {
  width: 200px;
}
.logout {
  margin-left: 2rem;
  color: white;
}
.logo {
  margin-left: 2rem;
  color: white;
}
.links {
  height: 85%;
}
.active-link {
  background: #e22d6d;
}
</style>
