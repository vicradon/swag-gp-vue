<template>
  <v-card class="mt-2">
    <p class="success--text text-center mb-0 py-4" v-if="status === 'success'">Thank you, we got your submission!</p>
    <p class="danger--text text-center mb-0 py-4" v-if="status === 'error'">
      Oops, something went wrong. Please try again.
    </p>

    <v-form ref="form" @submit.prevent="sendForm" class="py-4 px-6" v-model="valid">
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-textarea v-model="message" name="input-7-1" label="Message" hint="Hello, I want to hire you"></v-textarea>
      <div class="d-flex justify-end">
        <v-btn :disabled="!valid" type="submit" class="text-right" color="primary">Submit</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    status: "",
    email: "",
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],
    messageRules: [(v) => !!v || "Message is required"],
    message: "",
  }),
  methods: {
    sendForm: function(event) {
      event.preventDefault();

      fetch("https://formcarry.com/s/m4nVE3HtDZ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: this.email, message: this.message }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 200) {
            this.status = "success";
            this.$refs.form.reset();
          } else {
            // Formcarry error
            this.status = "error";
          }
        })
        // network error
        .catch(() => (this.status = "error"));
    },
  },
};
</script>
