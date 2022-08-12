<template>
  <Button buttonText="Show Route" @button-press="showRoute" />
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button: Button,
  },
  methods: {
    showRoute() {
      this.$emit("show-route");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>