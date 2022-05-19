<template>
  <div
    class="invoice-list"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
  >
    <div data-test="empty-list" class="empty-list" v-if="isInvoicesEmpty">
      <img
        data-test="illustration-empty-image"
        :src="illustrationEmptyImage"
        alt="illustration of an empty list of invoies"
      />
      <h2>There is nothing here</h2>
      <small
        >Create an <span class="hide-for-mobile">new</span> invoice by clicking
        the <b>New</b> <b class="hide-for-mobile">Invoice</b> button and get
        started</small
      >
    </div>

    <TransitionGroup
      tag="div"
      name="list"
      class="no-empty-list"
      data-test="no-empty-list"
      v-else
    >
      <v-container
        class="item-container"
        v-for="invoice in invoices"
        :key="invoice"
      >
        <div class="invoice-item">
          <a @click="navigateToDetail(invoice.invoiceCode)" class="code">
            <span class="hash">#</span>{{ invoice.invoiceCode }}
          </a>
          <p class="clientName">{{ invoice.clientName }}</p>
          <p class="due">
            {{ "Due " + formatDate(Date.now() + 8.64e7 * invoice.due) }}
          </p>
          <div class="status">
            <VStatusIndicator :status="invoice.status" />
          </div>
          <p class="total">{{ invoice.totalAmount }}</p>
          <div class="arrow hide-for-mobile">
            <a @click="navigateToDetail(invoice.invoiceCode)">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4 4-4 4"
                  stroke="#7C5DFA"
                  stroke-width="2"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </v-container>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import illustrationEmptyImage from "../../assets/illustration-empty.svg";

const store = useStore();
const router = useRouter();

// COMPUTED
const invoices = computed(() => store.getters.invoices);
const currentMode = computed(() => store.getters["layout/currentMode"]);
const isInvoicesEmpty = computed(() => invoices.value.length === 0);

// FUNCTIONS

function navigateToDetail(invoiceCode) {
  store.dispatch("setCurrentInvoice", { invoiceCode: invoiceCode });
  router.push({ path: `/invoices/${invoiceCode}` });
}

function formatDate(toFormat) {
  const day =
    new Date(toFormat).getDate().toString().length === 1
      ? "0" + new Date(toFormat).getDate()
      : new Date(toFormat).getDate();
  return (
    day +
    " " +
    new Date(toFormat).toLocaleDateString("en-US", {
      month: "short",
    }) +
    " " +
    new Date(toFormat).getUTCFullYear()
  );
}

// STORE ACTIONS
</script>
<style lang="scss" scoped>
@import "../../sass/breakpoints";
@import "../../sass/colors";
@import "../../sass/mixins";
@import "../../sass/functions";

.invoice-list {
  .empty-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: toRem(102, 18);
    @media (orientation: landscape) {
      padding-top: 0rem;
      padding-bottom: 2rem;
    }

    img {
      width: toRem(193, 18);
      height: toRem(160, 18);
      margin-bottom: toRem(40, 18);
    }

    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: toRem(20, 18);
      line-height: toRem(22.4, 18);
      letter-spacing: -0.625px;
      margin-bottom: toRem(24, 18);
    }

    small {
      font-style: normal;
      font-weight: 500;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      text-align: center;
      width: toRem(21, 18);
    }
  }

  .no-empty-list {
    padding-top: toRem(32, 18);
    padding-bottom: toRem(105, 18);
    .item-container {
      transition: border 250ms ease-in-out;
      border: transparent;
      &:not(:last-child) {
        margin-bottom: toRem(16, 18);
      }

      &:hover {
        border: 1px solid $violet-1;
      }

      .invoice-item {
        padding: toRem(24, 18); // 24px
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto toRem(15, 18) auto;
        grid-template-areas:
          "code   clientName"
          "due    status"
          "total  status";

        .code {
          cursor: pointer;
          grid-area: code;
          font-weight: bold;
          font-style: normal;
          font-size: toRem(12, 18);
          line-height: toRem(15, 18);
          letter-spacing: -0.25px;
          margin-bottom: toRem(24, 18);
          .hash {
            color: $blue-violet; // used for dark and light mode !!!
          }
        }

        .code:hover {
          transform: scale(1.05);
        }

        .clientName {
          grid-area: clientName;
          font-style: normal;
          font-weight: 500;
          font-size: toRem(12, 18);
          line-height: toRem(15, 18);
          letter-spacing: -0.25px;
          text-align: end;
        }

        .due {
          grid-area: due;
          font-style: normal;
          font-weight: 500;
          font-size: toRem(12, 18);
          line-height: toRem(15, 18);
          letter-spacing: -0.25px;
        }

        .status {
          grid-area: status;
          justify-self: flex-end;
          padding-top: toRem(4, 18);
        }

        .total {
          grid-area: total;
          font-weight: 700;
          font-size: toRem(16, 18);
          line-height: toRem(24, 18);
          letter-spacing: -0.8px;
          padding-top: toRem(8, 18);
        }
      }
    }
  }
}

.--light-mode {
  .empty-list {
    background-color: $global-bg;
    h2 {
      color: $black-2;
    }

    small {
      color: $violet-gray;
    }
  }

  .no-empty-list {
    background-color: $global-bg;
    .item-container {
      .invoice-item {
        .code:hover {
          color: $dark-blue;
        }

        .clientName {
          color: #858bb2;
        }

        .due {
          color: $violet-gray;
        }

        .total {
          color: $black-2;
        }
      }
    }
  }
}

.--dark-mode {
  .empty-list {
    background-color: $black-3;
    h2 {
      color: #fff;
    }

    small {
      color: $blue-gray-light;
    }
  }

  .no-empty-list {
    background-color: $black-3;
    .item-container {
      background-color: $black-1;
      .invoice-item {
        .code {
          color: #fff;
        }

        .code:hover {
          color: $red;
        }

        .clientName {
          color: #fff;
        }

        .due {
          color: $blue-gray-light;
        }

        .total {
          color: #fff;
        }
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.7);
}

@include breakpoint-up(medium) {
  .invoice-list {
    .empty-list {
      padding-top: toRem(210, 18); // 210px

      @media (orientation: landscape) {
        padding-top: 5rem;
        padding-bottom: 2rem;
      }

      img {
        width: toRem(241, 18); // 241px
        height: toRem(200, 18); // 200px
        margin-bottom: toRem(64, 18); // 64px
      }

      small {
        width: toRem(230, 18);
      }
    }

    .no-empty-list {
      max-width: toRem(960, 18); // 960px
      margin: 0 auto;
      padding-top: toRem(56, 18);
      .item-container {
        .invoice-item {
          padding: toRem(16, 18) toRem(24, 18);
          display: grid;
          grid-template-columns: toRem(77, 18) toRem(143, 18) 1fr 1fr 8rem toRem(
              24,
              18
            );
          grid-template-rows: 1fr;
          grid-template-areas: "code due clientName total status arrow";
          align-items: center;

          .code {
            grid-area: code;
            margin-bottom: unset;
          }

          .clientName {
            grid-area: clientName;
            text-align: left;
          }

          .due {
            grid-area: due;
            margin-bottom: unset;
          }

          .status {
            grid-area: status;
            padding-top: 0;
          }

          .total {
            grid-area: total;
            text-align: right;
          }

          .arrow {
            grid-area: arrow;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}

@include breakpoint-up(large) {
  .invoice-list {
    .empty-list {
      padding-top: toRem(141, 18); // 141px

      @media (orientation: portrait) {
        padding-top: unset;
        padding-bottom: unset;
      }

      img {
        width: toRem(241, 18); // 241px
      }

      small {
        width: toRem(221, 18);
      }
    }

    .no-empty-list {
      width: toRem(730, 18);
      padding-top: toRem(65, 18);
      .item-container {
        .invoice-item {
          padding: toRem(16, 18) toRem(32, 18) toRem(16, 18) toRem(24, 18);
          display: grid;
          grid-template-columns: toRem(77, 18) toRem(143, 18) 1fr 1fr 8rem toRem(
              24,
              18
            );
          grid-template-rows: 1fr;
          grid-template-areas: "code due clientName total status arrow";
          align-items: center;

          .code {
            grid-area: code;
            margin-bottom: unset;
          }

          .clientName {
            grid-area: clientName;
          }

          .due {
            grid-area: due;
          }

          .total {
            grid-area: total;
          }

          .arrow {
            grid-area: arrow;
          }
        }
      }
    }
  }
}
</style>
