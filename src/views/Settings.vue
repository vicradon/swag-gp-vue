<template>
  <div>
    <RouteMenu title="Settings" />

    <v-switch v-model="showCgpa" label="Show CGPA"></v-switch>
  </div>
</template>

<script>
import RouteMenu from "../components/RouteMenu";
export default {
  data: () => ({}),
  computed: {
    showCgpa: {
      get() {
        return this.$store.state.settings.showCgpa;
      },
      set() {
        this.$store.dispatch("toggleCgpaVisibility");
      },
    },
  },
  components: { RouteMenu },
};
</script>
