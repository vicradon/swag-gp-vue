<template>
  <div>
    <Drawer />
    <div class="router-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Drawer from "../components/Drawer";

export default {
  name: "dashboard-layout",
  components: { Drawer },
};
</script>

<style scoped>
.router-slot {
  margin-left: 220px;
  padding-top: 1.5rem;
}
</style>
