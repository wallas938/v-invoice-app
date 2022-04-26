<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import VModals from "./components/shared/VModals.vue";
import InvoiceForm from "./components/home/InvoiceForm.vue";

const store = useStore();

const currentMode = computed(() => store.getters["layout/currentMode"]);
const showModals = computed(() => store.getters["layout/showModals"]);
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
    <teleport to="body">
      <v-modals v-if="showModals"></v-modals>
    </teleport>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "sass/variables";
@import "sass/colors";

.root {
  transition: all 550ms ease-in-out;
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
  }
}
</style>
