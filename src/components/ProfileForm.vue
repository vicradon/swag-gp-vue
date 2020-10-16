<template>
  <v-form ref="form" @submit.prevent="update" v-model="valid" lazy-validation>
    <v-text-field v-model="firstName" :rules="nameRules" label="First Name" required></v-text-field>
    <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="school" label="School" required></v-text-field>

    <v-select v-model="select" :items="levels" label="Level" required></v-select>

    <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4">
      Update
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    nameRules: [(v) => !!v || "Name is required"],
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
    select: null,
    levels: Array(8)
      .fill(0)
      .map((item, index) => (index + 1) * 100),
  }),

  methods: {
    update() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style></style>
