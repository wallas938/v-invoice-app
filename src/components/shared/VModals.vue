<template>
  <div
    class="modals-container"
    :class="{
      '--bg-position': getCurrentView === 'invoice-form',
      '--bg-prompt': getCurrentView === 'deletion-prompt',
    }"
  >
    <!-- <div class="backdrop" @click="closeForm"></div> -->
    <component :is="setView"></component>
    <!-- <invoice-form></invoice-form> -->
  </div>
</template>
<script setup>
import { computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import InvoiceForm from "../home/InvoiceForm.vue";
import DeletionPrompt from "../invoice-detail/DeletionPrompt.vue";

const store = useStore();

// COMPUTED
const setView = computed(() => {
  if (getCurrentView.value === "invoice-form") {
    return InvoiceForm;
  } else if (getCurrentView.value === "deletion-prompt") {
    return DeletionPrompt;
  }
});

const getCurrentView = computed(() => store.getters["layout/currentView"]);

/* const getCurrentViewHeight = computed(
  () => store.getters["layout/currentViewHeight"]
); */

// FUNCTIONS
function closeForm() {
  document.querySelector("body").classList.remove("remove-scroll");
  store.dispatch("layout/showModals", { currentView: "" });
}
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
    }

    @media screen and (min-width: $desktop-min) {
      top: 0;
    }
  }
}
</style>
