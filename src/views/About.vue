<template>
  <div>
    <RouteMenu title="About" />
    <p>Swag-Gp is a solution to the personalized storage of grades</p>

    <h3>Privacy policy</h3>
    <p>We won't steal your data</p>

    <h3>Contact</h3>
    {{ `${authenticated}` }}
    <ContactForm />
  </div>
</template>

<script>
import RouteMenu from "../components/RouteMenu";
import ContactForm from "../components/ContactForm";

export default {
  components: { RouteMenu, ContactForm },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
};
</script>
