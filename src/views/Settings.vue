<template>
  <div>
    <RouteMenu title="Settings" />
    <!-- 
    <v-col cols="12">
      <v-subheader class="pl-0">
        Max levels
      </v-subheader>
      <v-slider
        :slider="slider"
        thumb-label="always"
        value="300"
        step="100"
        min="100"
        max="1000"
        ticks="always"
      ></v-slider>
    </v-col> -->

    <v-switch :showCgpa="showCgpa" label="Show CGPA"></v-switch>
  </div>
</template>

<script>
import RouteMenu from "../components/RouteMenu";
export default {
  data: () => ({
    showCgpa: true,
  }),
  components: { RouteMenu },
};
</script>
