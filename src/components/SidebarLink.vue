<template>
  <div
    @click="setActiveLink(link)"
    class="link-wrapper"
    :class="{ 'active-link': activeLink === link }"
  >
    <router-link class="link d-flex align-center" :to="link">
      <v-icon color="white">{{ icon }}</v-icon>
      <span v-if="!sidebarOpen" class="title body-2">{{ title }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    sidebarOpen: (state) => state.sidebar.isOpen,
    activeLink: (state) => state.sidebar.activeLink,
  }),
  methods: {
    setActiveLink(link) {
      this.$store.commit("setActiveLink", link);
    },
  },
  props: ["title", "icon", "link"],
  name: "SidebarLink",
};
</script>

<style lang="css" scoped>
.link-wrapper {
  padding: 1rem 1rem;
  margin: 1rem 0;
}
.link {
  text-decoration: none;
  color: white;
}
.title {
  margin-left: 2rem;
}
.active-link {
  background: #e22d6d;
}
</style>
