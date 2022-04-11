<template>
  <div class="invoice-list">
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
          <p class="code">
            <span class="hash">#</span>{{ invoice.invoiceCode }}
          </p>
          <p class="clientName">{{ invoice.clientName }}</p>
          <p class="due">{{ invoice.due }}</p>
          <div class="status" :class="getStatusColor(invoice.status)">
            <span>{{ invoice.status }}</span>
          </div>
          <p class="total">{{ invoice.totalAmount }}</p>
          <div class="arrow hide-for-mobile">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1l4 4-4 4"
                stroke="#7C5DFA"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import illustrationEmptyImage from "../../assets/illustration-empty.svg";

const store = useStore();

// COMPUTED
const invoices = computed(() => store.getters.invoices);

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "status--paid";
    case "pending":
      return "status--pending";
    case "draft":
      return "status--draft";
  }
};

// STORE ACTIONS
const isInvoicesEmpty = computed(() => store.getters.invoices.length === 0);
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
      color: $black-2;
      margin-bottom: 1.333333rem;
    }

    small {
      font-style: normal;
      font-weight: 500;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      color: $violet-gray;
      text-align: center;
      width: 11.166666rem;
    }
  }

  .no-empty-list {
    padding-top: 1.777777rem;

    .item-container {
      cursor: pointer;
      transition: border 250ms ease-in-out;
      border: 1px solid transparent;
      &:not(:last-child) {
        margin-bottom: 0.888888rem;
      }

      &:hover {
        border: 1px solid $violet-1;
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
          grid-area: code;
          font-weight: bold;
          font-style: normal;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          margin-bottom: 1.333333rem;
          .hash {
            color: $blue-violet;
          }
        }

        .clientName {
          grid-area: clientName;
          font-style: normal;
          font-weight: 500;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          color: #858bb2;
          text-align: end;
        }

        .due {
          grid-area: due;
          font-style: normal;
          font-weight: 500;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
          color: $violet-gray;
          margin-bottom: 0.444444rem;
        }

        .status {
          grid-area: status;
          mix-blend-mode: normal;
          border-radius: 6px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 0;
          width: 5.777777rem;
          height: 2.222222rem;
          justify-self: flex-end;
          padding-left: 8px;
          span {
            font-style: normal;
            font-weight: 700;
            font-size: 0.666666rem;
            line-height: 0.833333rem;
            letter-spacing: -0.25px;
            position: relative;
            z-index: 1;
          }

          span::before {
            content: "";
            top: 0.222222rem;
            left: -0.888888rem;
            bottom: 0;
            position: absolute;
            width: 0.444444rem;
            height: 0.444444rem;
            border-radius: 100%;
          }
        }

        .status--paid {
          background-color: rgba(#33d69f, 0.06);

          span {
            color: #33d69f;
          }

          span::before {
            background-color: #33d69f;
          }
        }

        .status--draft {
          background-color: rgba(#373b53, 0.06);

          span {
            color: #373b53;
          }

          span::before {
            background-color: #373b53;
          }
        }

        .status--pending {
          background-color: rgba(#ff8f00, 0.06);

          span {
            color: #ff8f00;
          }

          span::before {
            background-color: #ff8f00;
          }
        }

        .total {
          grid-area: total;
          font-weight: 700;
          font-size: 0.888888rem;
          line-height: 1.333333rem;
          letter-spacing: -0.8px;
          color: $black-2;
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

          .status {
            grid-area: status;
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
      margin: 0 auto;
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

          .status {
            grid-area: status;
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
