<template>
  <button @click="$emit('button-press')" class="acl-button acl-button-raised">
    <span class="acl-button__label">{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
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