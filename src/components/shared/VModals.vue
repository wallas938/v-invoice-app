<template>
  <div
    class="modals-container"
    :class="{ '--bg-position': getCurrentView === 'invoice-form' }"
  >
    <div class="backdrop">
      <component :is="setView"></component>
    </div>
    <!-- <invoice-form></invoice-form> -->
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import InvoiceForm from "../home/InvoiceForm.vue";

const store = useStore();
const setView = computed(() => {
  if (getCurrentView.value === "invoice-form") {
    return InvoiceForm;
  }
});

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
  /*   .backdrop {
    @media screen and (min-width: $tablet-min) {
      bottom: -4.444444rem;
    }

    @media screen and (min-width: $desktop-min) {
      bottom: 0;
    }
  } */

  &.--bg-position {
    top: 4rem;

    @media screen and (min-width: $tablet-min) {
      top: 4.444444rem;
    }

    @media screen and (min-width: $desktop-min) {
      top: 0;
    }
  }
}
</style>
