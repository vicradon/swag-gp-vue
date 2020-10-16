<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <p class="mb-0" v-bind="attrs" v-on="on"><slot></slot></p>
    </template>
    <v-card v-if="dialogType === 'login'">
      <form @submit.prevent="login">
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-col>
            </v-row>
            <p>
              No account?
              <span @click="dialogType = 'signup'" class="cursor-pointer primary--text" text>Signup here</span>
            </p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary darken-1" text>
            Login
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-card v-if="dialogType === 'signup'">
      <v-card-title>
        <span class="headline">Sign up</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="First name *" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field label="Last name *" persistent-hint required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email *" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password *" type="password" required></v-text-field>
            </v-col>
          </v-row>
          <p>
            Already have an account?
            <span @click="dialogType = 'login'" class="cursor-pointer primary--text" text>Login instead</span>
          </p>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Signup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { query as q, Client } from "faunadb";

export default {
  props: ["dialogState"],
  data() {
    return {
      // loading: false,
      dialogType: "login",
      dialog: this.dialogState,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      const client = new Client({ secret: localStorage.getItem("DB_SECRET") });
      client
        .query(q.Login(q.Get(q.Identity()), { ttl: q.TimeAdd(q.Now(), 1, "day") }))
        .then(function() {
          this.$store.commit("setAuthenticated", true);
          this.loading = false;
        })
        .catch(() => {
          this.$store.commit("setAuthenticated", false);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
