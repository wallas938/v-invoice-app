<template>
  <div
    class="modals-container"
    :class="{
      '--bg-position': getCurrentView === 'invoice-form',
      '--bg-prompt': getCurrentView === 'deletion-prompt',
    }"
  >
    <transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
      appear
    >
      <invoice-form v-if="getCurrentView === 'invoice-form'"></invoice-form>
    </transition>
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
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
</script>
<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";
.modals-container {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  /* min-height: 100%; */
  background-color: rgba(#000, 0.25);
  overflow-y: scroll;

  &.--bg-prompt {
    z-index: 10;
  }
  &.--bg-position {
    top: 4rem;

    @media screen and (min-width: $tablet-min) {
      top: 4.444444rem;
      overflow-y: unset;
    }

    @media screen and (min-width: $desktop-min) {
      top: 0;
    }
  }
}
</style>
