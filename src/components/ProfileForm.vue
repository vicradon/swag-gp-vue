<template>
  <div>
    <v-form ref="form" @submit.prevent="update" v-model="valid" lazy-validation>
      <v-text-field v-model="firstName" :rules="nameRules" label="First Name" required></v-text-field>
      <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="school" label="School" required></v-text-field>

      <v-select @change="handleSelect" :items="levels" label="Level" :value="level"></v-select>
      <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4">
        Update
      </v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarValue }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { query as q, Client } from "faunadb";

export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      select: null,
      level: "",
      snackbarValue: "",
      levels: Array(8)
        .fill(0)
        .map((item, index) => (index + 1) * 100),
    };
  },

  methods: {
    handleSelect(level) {
      this.level = level;
    },
    update() {
      const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

      this.$refs.form.validate();
      client
        .query(
          q.Update(q.Identity(), {
            data: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              school: this.school,
              level: this.level,
            },
          }),
        )
        .then(() => {
          this.snackbar = true;
          this.snackbarValue = "profile updated successfully";
        })
        .catch(({ message }) => {
          this.$store.commit("setAuthenticated", false);
          this.snackbarValue = message;
        });
    },
  },
  created() {
    const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

    client
      .query(
        q.Let(
          {
            user: q.Get(q.Identity()),
          },
          {
            firstName: q.Select(["data", "firstName"], q.Var("user")),
            lastName: q.Select(["data", "lastName"], q.Var("user")),
            email: q.Select(["data", "email"], q.Var("user")),
            school: q.Select(["data", "school"], q.Var("user"), ""),
            level: q.Select(["data", "level"], q.Var("user"), ""),
          },
        ),
      )
      .then((data) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.school = data.school;
        this.level = data.level;
      })
      .catch((error) => {
        this.snackbarValue = error;
        this.$store.commit("setAuthenticated", false);
      });
  },
};
</script>

<style></style>
