<template>
  <v-bottom-navigation class="align-center" color="primary" :value="value" grow fixed>
    <v-btn to="/levels" value="levels">
      <span>Levels</span>
      <v-icon>mdi-poll</v-icon>
    </v-btn>

    <v-btn to="/profile" value="profile">
      <span>Profile</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-btn to="/about" value="about">
      <span>About</span>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNav",
  data: () => ({ value: "levels" }),
};
</script>
