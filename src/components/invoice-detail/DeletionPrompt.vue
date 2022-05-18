<template>
  <div
    class="root"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
  >
    <v-container class="prompt-container">
      <div class="content">
        <h1>Confirm Deletion</h1>
        <p>
          Are you sure you want to delete invoice #{{
            currentInvoice.invoiceCode
          }}? This action cannot be undone.
        </p>
        <div class="cta">
          <button type="button" class="cancel" @click="closeForm">
            Cancel
          </button>
          <button type="button" class="delete" @click="removeInvoice">
            Delete
          </button>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const currentMode = computed(() => store.getters["layout/currentMode"]);
const currentInvoice = computed(() => store.getters.invoice);
// Functions
function closeForm() {
  document.querySelector("body").classList.remove("remove-scroll");
  store.dispatch("layout/showModals", { currentView: "" });
}

function removeInvoice() {
  closeForm();
  store.dispatch("removeInvoice", {
    invoiceCode: currentInvoice.value.invoiceCode,
  });
  router
    .push({
      path: "/",
    })
    .then(() => {
      store.dispatch("setCurrentInvoice", { invoiceCode: null });
    });
}
</script>
<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
@import "../../sass/breakpoints";
@import "../../sass/colors";
@import "../../sass/mixins";
@import "../../sass/functions";
.root {
  height: 100vh;
  .prompt-container {
    position: absolute;
    width: toRem(327, 18);
    height: toRem(220, 18);
    top: 50%;
    transform: translateY(-50%) translate(-50%);
    left: 50%;

    .content {
      padding: toRem(32, 18);
      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: toRem(20, 18);
        line-height: toRem(32, 18);
        letter-spacing: -0.416667px;
        color: $black-2;
      }

      p {
        font-style: normal;
        font-weight: 500;
        font-size: toRem(12, 18);
        line-height: toRem(22, 18);
        letter-spacing: -0.25px;
        color: $violet-gray;
        margin-bottom: toRem(24, 18);
      }

      .cta {
        display: flex;
        justify-content: flex-end;
      }

      .cta > button {
        font-style: normal;
        font-weight: bold;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
        padding: toRem(17, 18) toRem(23, 18) toRem(16, 18) toRem(24, 18);
        border-radius: toRem(24, 18);
        border: transparent;
      }

      .cta > button:first-child {
        margin-right: toRem(8, 18);
      }

      .cta > .cancel {
        color: $blue-violet;
        background-color: $light-bg-2;
        &:hover {
          color: $blue-violet;
          background-color: $blue-gray-light;
        }
      }

      .cta > .delete {
        color: #fff;
        background-color: $red;
        &:hover {
          background-color: $red-blurred;
        }
      }
    }
  }
}

.--light-mode {
  .prompt-container {
    .content {
      h1 {
        color: $black-2;
      }

      p {
        color: $violet-gray;
      }

      .cta > .cancel {
        color: $blue-violet;
        background-color: $light-bg-2;
        &:hover {
          color: $blue-violet;
          background-color: $blue-gray-light;
        }
      }

      .cta > .delete {
        color: #fff;
        background-color: $red;
        &:hover {
          background-color: $red-blurred;
        }
      }
    }
  }
}
.--dark-mode {
  .prompt-container {
    background-color: $black-1;
    .content {
      h1 {
        color: #fff;
      }

      p {
        color: $blue-gray-light;
      }

      .cta > .cancel {
        color: $blue-gray-light;
        background-color: $dark-blue;
        &:hover {
          color: $blue-gray-light;
          background-color: #fff;
        }
      }

      .cta > .delete {
        color: #fff;
        background-color: $red;
        &:hover {
          background-color: $red-blurred;
        }
      }
    }
  }
}

@include breakpoint-up(medium) {
  .root {
    height: 100vh;
    .prompt-container {
      position: absolute;
      width: toRem(480, 18); // 480px
      height: toRem(249, 18); // 249px

      .content {
        padding: toRem(48, 18); // 48px
        h1 {
          font-size: toRem(24, 18);
          line-height: toRem(32, 18);
          letter-spacing: -0.5px;
          margin-bottom: toRem(13, 18);
        }

        p {
          margin-bottom: toRem(16, 18);
        }

        .cta {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
