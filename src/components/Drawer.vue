<template>
  <div :class="{ 'navbar-width': !sidebarOpen }" class="navbar">
    <div class="pl-4 d-flex">
      <v-icon @click="toggleSidebar()" color="white">
        mdi-menu
      </v-icon>
      <h3 v-if="!sidebarOpen" class="logo">Swag-GP</h3>
    </div>
    <div class="links d-flex flex-column justify-space-between">
      <div class="mt-7">
        <SidebarLink title="Levels" icon="mdi-poll" link="levels" />
        <SidebarLink
          title="Profile"
          icon="mdi-account-outline"
          link="profile"
        />
        <SidebarLink
          title="About"
          icon="mdi-information-outline "
          link="about"
        />
      </div>
      <div>
        <div class="pl-4">
          <v-icon color="white">mdi-logout</v-icon>
          <span v-if="!sidebarOpen" class="logout body-2">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidebarLink from "./SidebarLink.vue";
export default {
  name: "Drawer",
  components: { SidebarLink },
  methods: {
    toggleSidebar() {
      this.$store.commit("toggleSidebar");
    },
  },
  computed: mapState({
    sidebarOpen: (state) => state.sidebar.isOpen,
  }),
};
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
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
  height: 90%;
}
</style>
