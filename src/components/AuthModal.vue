<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <p class="mb-0" v-bind="attrs" v-on="on"><slot></slot></p>
    </template>
    <v-card v-if="dialogType === 'login'">
      <v-form v-model="loginValid" ref="login" @submit.prevent="login" lazy-validation>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Email is required']"
                  v-model="loginForm.email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Password is required']"
                  label="Password"
                  v-model="loginForm.password"
                  type="password"
                  required
                ></v-text-field>
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
          <v-btn :loading="loading" :disabled="!loginValid" type="submit" color="primary darken-1">
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card v-if="dialogType === 'signup'">
      <v-form v-model="signupValid" ref="signup" @submit.prevent="signup">
        <v-card-title>
          <span class="headline">Sign up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :rules="[(v) => !!v || 'First name is required']"
                  v-model="signupForm.firstName"
                  label="First name *"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Last name is required']"
                  v-model="signupForm.lastName"
                  label="Last name *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Email is required']"
                  v-model="signupForm.email"
                  label="Email *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Password is required']"
                  v-model="signupForm.password"
                  label="Password *"
                  type="password"
                  required
                ></v-text-field>
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
          <v-btn :loading="loading" :disabled="!signupValid" type="submit" color="primary darken-1">
            Signup
          </v-btn>
        </v-card-actions>
      </v-form>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["dialogState"],
  data() {
    return {
      loading: false,
      dialogType: "login",
      dialog: this.dialogState,
      loginValid: true,
      signupValid: true,
      loginForm: {
        email: "test@email.com",
        password: "Test1234",
      },
      signupForm: {
        firstName: "Some",
        lastName: "Name",
        email: "test@email.com",
        password: "Test1234",
      },
      error: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.$refs.login.validate();

      fetch("https://swag-gp-functions.azurewebsites.net/api/login", {
        method: "POST",
        body: JSON.stringify({ email: this.loginForm.email, password: this.loginForm.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("DB_SECRET", data.secret);
          this.$store.commit("setAuthenticated", true);
          this.$store.commit("setAppState", data.user.data);
          this.loading = false;
        })
        .catch((error) => {
          this.$store.commit("setAuthenticated", false);
          this.loading = false;
          this.error = error.message;
        });
    },
    async signup() {
      this.loading = true;
      this.$refs.signup.validate();

      fetch("https://swag-gp-functions.azurewebsites.net/api/signup", {
        // fetch("http://localhost:7071/api/signup", {
        method: "POST",
        cors: "no-cors",
        body: JSON.stringify({
          firstName: this.signupForm.firstName,
          lastName: this.signupForm.lastName,
          email: this.signupForm.email,
          password: this.signupForm.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(({ credentials }) => {
          localStorage.setItem("DB_SECRET", credentials.secret);
          this.$store.commit("setAuthenticated", true);
          this.$store.dispatch("initialStateSync");
          this.loading = false;
        })
        .catch((error) => {
          this.$store.commit("setAuthenticated", false);
          this.loading = false;
          this.error = error.message;
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
