<template>
  <div>
    <RouteMenu title="Profile" />
    <ProfileForm />
  </div>
</template>

<script>
import RouteMenu from "../components/RouteMenu";
import ProfileForm from "../components/ProfileForm";
export default {
  components: { RouteMenu, ProfileForm },
};
</script>
