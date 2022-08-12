<template>
  <div class="ModalWrapper">
    <div class="Modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ModalWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal {
  background: white;
  z-index: 10000;
  position: fixed;
  top: 10%;
  right: 10%;
  bottom: 17%;
  left: 10%;
  margin: auto;
  border-radius: 10px;
}

.ModalToggle {
  background: white;
  z-index: 10000;
  position: fixed;

  top: 0;
  width: 200px;
}
</style>
