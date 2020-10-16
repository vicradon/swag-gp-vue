<template>
  <div>
    <template v-if="width >= 600">
      <Drawer @miniChanged="toggleMini" />
      <div :class="{ 'router-slot-extra': !isMini, 'router-slot-base': isMini }" class="router-slot pt-6 px-6">
        <slot></slot>
      </div>
    </template>
    <template v-if="width < 600">
      <div class="px-4 pt-4">
        <slot></slot>
      </div>
      <div class="pb-7 mb-7"></div>
      <BottomNav />
    </template>
  </div>
</template>

<script>
import Drawer from "../components/Drawer";
import BottomNav from "../components/BottomNav";

export default {
  name: "dashboard-layout",
  components: { Drawer, BottomNav },
  computed: {
    width() {
      return this.$vuetify.breakpoint.width;
    },
  },
  data: () => ({
    isMini: false,
  }),
  methods: {
    toggleMini() {
      this.isMini = !this.isMini;
    },
  },
};
</script>

<style scoped>
.router-slot-base {
  margin-left: 55px;
}
.router-slot-extra {
  margin-left: 256px;
}
.bottom-nav {
  bottom: 0;
  position: fixed;
  width: 100%;
}
</style>
