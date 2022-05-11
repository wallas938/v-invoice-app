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
@import "../../sass/variables";
@import "../../sass/colors";
.root {
  height: 100vh;
  .prompt-container {
    position: absolute;
    width: 18.166666rem;
    height: 12.222222rem;
    top: 50%;
    transform: translateY(-50%) translate(-50%);
    left: 50%;

    .content {
      padding: 1.777777rem;
      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 1.111111rem;
        line-height: 1.777777rem;
        letter-spacing: -0.416667px;
        color: $black-2;
      }

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 0.666666rem;
        line-height: 1.222222rem;
        letter-spacing: -0.25px;
        color: $violet-gray;
        margin-bottom: 1.333333rem;
      }

      .cta {
        display: flex;
        justify-content: flex-end;
      }

      .cta > button {
        font-style: normal;
        font-weight: bold;
        font-size: 0.666666rem;
        line-height: 0.8333333rem;
        letter-spacing: -0.25px;
        padding: 0.944444rem 1.277777rem 0.888888rem 1.333333rem;
        border-radius: 1.333333rem;
        border: transparent;
      }

      .cta > button:first-child {
        margin-right: 0.444444rem;
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

@media screen and (min-width: $tablet-min) {
  .root {
    height: 100vh;
    .prompt-container {
      position: absolute;
      width: 26.666666rem; // 480px
      height: 13.833333rem; // 249px

      .content {
        padding: 2.666666rem; // 48px
        h1 {
          font-size: 1.333333rem;
          line-height: 1.777777rem;
          letter-spacing: -0.5px;
          margin-bottom: 0.722222rem;
        }

        p {
          margin-bottom: 0.888888rem;
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
