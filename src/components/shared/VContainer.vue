<template>
  <div class="v-container">
    <slot></slot>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../sass/breakpoints";
@import "../../sass/colors";
@import "../../sass/functions";
.v-container {
  background-color: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
}
</style>
