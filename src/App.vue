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
    <router-view v-slot="{ Component }">
      <transition name="page-animation" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "sass/_breakpoints";
@import "sass/colors";
@import "sass/mixins";

.root {
  min-height: 100%;
}

.--light-mode {
  background-color: $global-bg;
}

.--dark-mode {
  background-color: $black-3;
}

.page-animation-enter-from,
.page-animation-leave-to {
  opacity: 0;
}

.page-animation-enter-active,
.page-animation-leave-active {
  transition: all 0.25s ease;
}

@include breakpoint-up(large) {
  .root {
    display: flex;
  }
}
</style>
