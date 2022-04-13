<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const currentMode = computed(() => store.getters["layout/currentMode"]);
</script>

<template>
  <div
    class="root v-invoice-app"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
  >
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "sass/variables";
@import "sass/colors";

.root {
  transition: all 650ms ease-in-out;
  min-height: 100%;
}

.--light-mode {
  background-color: $global-bg;
}

.--dark-mode {
  background-color: $black-3;
}

@media screen and (min-width: $desktop-min) {
  .root {
    display: flex;
    height: 100%;
  }
}
</style>
