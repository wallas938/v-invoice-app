<template>
  <div
    class="modals-container"
    :class="{
      '--bg-position': getCurrentView === 'invoice-form',
      '--bg-prompt': getCurrentView === 'deletion-prompt',
    }"
  >
    <!-- <div class="modals-container">
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
      appear
    > -->
    <div class="backdrop" @click="closeForm" v-if="getCurrentView !== ''"></div>
    <transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
      appear
    >
      <invoice-form v-if="getCurrentView === 'invoice-form'"></invoice-form>
    </transition>
    <transition
      enter-active-class="animate__animated animate__backInUp animate__faster"
      leave-active-class="animate__animated animate__backOutDown animate__faster"
      appear
    >
      <deletion-prompt
        v-if="getCurrentView === 'deletion-prompt'"
      ></deletion-prompt>
    </transition>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import InvoiceForm from "../home/InvoiceForm.vue";
import DeletionPrompt from "../invoice-detail/DeletionPrompt.vue";

const store = useStore();

// COMPUTED
const getCurrentView = computed(() => store.getters["layout/currentView"]);

// FUNCTIONS

function closeForm() {
  document.querySelector("body").classList.remove("remove-scroll");
  store.dispatch("layout/showModals", { currentView: "" });
}
</script>
<style lang="scss" scoped>
@import "../../sass/breakpoints";
@import "../../sass/colors";
@import "../../sass/mixins";
@import "../../sass/functions";
.modals-container {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  overflow-y: auto;

  .backdrop {
    position: absolute;
    width: 100%;
    background-color: rgba(#000, 0.25);
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &.--bg-prompt {
    z-index: 10;
  }
  &.--bg-position {
    top: 4rem;

    @include breakpoint-up(medium) {
      top: toRem(80, 18);
      overflow-y: unset;
    }

    @include breakpoint-up(large) {
      top: 0;
    }
  }
}
</style>
