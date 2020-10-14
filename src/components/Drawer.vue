<template>
  <v-navigation-drawer class="navbar" absolute v-model="drawer" :mini-variant.sync="mini" permanent>
    <div class="pl-4 d-flex">
      <!-- <v-icon @click="toggleSidebar()" color="white"> -->
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

      <v-list class="my-7" dense>
        <v-list-item>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Drawer",
  computed: mapState({
    sidebarOpen: (state) => state.sidebar.isOpen,
  }),
  props: ["toggleMin"],
  data() {
    return {
      drawer: true,
      mini: true,
      links: [
        { title: "Levels", location: "/levels", icon: "mdi-poll" },
        { title: "Profile", location: "/profile", icon: "mdi-account-outline" },
        { title: "About", location: "/about", icon: "mdi-information-outline" },
      ],
    };
  },
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
