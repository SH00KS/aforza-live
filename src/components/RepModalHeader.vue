<template>
  <h1 v-if="rep">{{ rep.Name }}</h1>
</template>

<script>
export default {
  props: ["rep"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>