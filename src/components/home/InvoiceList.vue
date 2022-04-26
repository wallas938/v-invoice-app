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

    <div class="no-empty-list" data-test="no-empty-list" v-else>
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
          <p class="due">{{ invoice.due }}</p>
          <VStatusIndicator :status="invoice.status" />
          <!-- <div class="status" :class="getStatusColor(invoice.status)">
            <span>{{ invoice.status }}</span>
          </div> -->
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
    </div>
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

// FUNCITONS
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "paid":
      return "status--paid";
    case "pending":
      return "status--pending";
    case "draft":
      return "status--draft";
  }
}

function navigateToDetail(invoiceCode) {
  store.dispatch("setCurrentInvoice", { invoiceCode: invoiceCode });
  router.push({ path: `/invoices/${invoiceCode}` });
}

// STORE ACTIONS
</script>
<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";

.invoice-list {
  .empty-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5.666666rem;
    @media (orientation: landscape) {
      padding-top: 0rem;
      padding-bottom: 2rem;
    }

    img {
      width: 10.722222rem;
      height: 8.888888rem;
      margin-bottom: 2.222222rem;
    }

    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 1.111111rem;
      line-height: 1.244444rem;
      letter-spacing: -0.625px;
      margin-bottom: 1.333333rem;
    }

    small {
      font-style: normal;
      font-weight: 500;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      text-align: center;
      width: 11.166666rem;
    }
  }

  .no-empty-list {
    padding-top: 1.777777rem;
    .item-container {
      border: 1px solid transparent;
      &:not(:last-child) {
        margin-bottom: 0.888888rem;
      }

      &:hover {
        border: 1px solid $violet-1; // used for dark and light mode !!!
      }

      .invoice-item {
        padding: 1.333333rem; // 24px
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, auto);
        grid-template-areas:
          "code   clientName"
          "due    status"
          "total  status";

        .code {
          cursor: pointer;
          grid-area: code;
          font-weight: bold;
          font-style: normal;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          margin-bottom: 1.333333rem;
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
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          text-align: end;
        }

        .due {
          grid-area: due;
          font-style: normal;
          font-weight: 500;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          margin-bottom: 0.444444rem;
        }

        .total {
          grid-area: total;
          font-weight: 700;
          font-size: 0.888888rem;
          line-height: 1.333333rem;
          letter-spacing: -0.8px;
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
      &:hover {
        border: 1px solid $violet-1;
      }

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

@media screen and (min-width: $tablet-min) {
  .invoice-list {
    .empty-list {
      padding-top: 11.666666rem; // 210px

      @media (orientation: landscape) {
        padding-top: 5rem;
        padding-bottom: 2rem;
      }

      img {
        width: 13.38888rem; // 241px
        height: 11.111111rem; // 200px
        margin-bottom: 3.555555rem; // 64px
      }

      small {
        width: 12.666666rem;
      }
    }

    .no-empty-list {
      max-width: 53.333333rem; // 960px
      margin: 0 auto;
      padding-top: 3.111111rem;
      .item-container {
        .invoice-item {
          padding: 0.888888rem 1.333333rem;
          display: grid;
          grid-template-columns: 4.277777rem 7.944444rem 1fr 1fr 8rem 1.333333rem;
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

@media screen and (min-width: $desktop-min) {
  .invoice-list {
    .empty-list {
      padding-top: 7.833333rem; // 141px

      @media (orientation: portrait) {
        padding-top: unset;
        padding-bottom: unset;
      }

      img {
        width: 13.407777rem; // 241px
      }

      small {
        width: 12.277777rem;
      }
    }

    .no-empty-list {
      width: 40.555555rem;
      padding-top: 3.611111rem;
      .item-container {
        .invoice-item {
          padding: 0.888888rem 1.777777rem 0.888888rem 1.333333rem;
          display: grid;
          grid-template-columns: 4.277777rem 7.944444rem 1fr 1fr 8rem 1.333333rem;
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
