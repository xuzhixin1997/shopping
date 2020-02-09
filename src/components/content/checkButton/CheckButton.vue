<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }

  .check-button img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .check {
    border: 2px solid red;
    background-color: red;
  }

</style>