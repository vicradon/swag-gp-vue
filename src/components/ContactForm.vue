<template>
  <v-card class="mt-2">
    <p v-if="status === 'success'">Thank you, we got your submission!</p>
    <p v-if="status === 'error'">
      Oops, something went wrong. Please try again.
    </p>

    <v-form @submit="sendForm" class="py-4 px-6" v-model="valid">
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-textarea name="input-7-1" label="Message" hint="Hello, I want to hire you"></v-textarea>
      <div class="d-flex justify-end">
        <v-btn class="text-right" color="primary">Submit</v-btn>
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
