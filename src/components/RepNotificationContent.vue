<template>
  <div class="rep-toast-content-wrapper">
    <img v-if="rep" class="rep-avatar" v-bind:src="rep.Avatar" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: ["rep", "message"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
}

.rep-toast-content-wrapper {
  display: flex;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 13§px;
}

.rep-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid white;
}
</style>