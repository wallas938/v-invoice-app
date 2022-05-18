<template>
  <div
    v-if="invoice"
    class="root"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
  >
    <div class="link">
      <router-link to="../">Go Back</router-link>
    </div>
    <div class="title">
      <v-container class="status-container">
        <div class="wrapper">
          <p>Status</p>
          <VStatusIndicator class="statusInd" :status="invoice.status" />
          <div class="cta hide-for-mobile">
            <button class="edit" @click="editInvoice">Edit</button>
            <button class="delete" @click="promptBeforeRemoval">Delete</button>
            <button
              v-if="!invoiceIsPaid"
              class="mark-as-paid"
              @click="markAsPaid"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </v-container>
    </div>
    <v-container class="detail-container">
      <div class="detail">
        <div class="top-from-container">
          <div class="top">
            <p class="invoice-code">
              <span class="hash">#</span>{{ invoice.invoiceCode }}
            </p>
            <p class="description">{{ invoice.desc }}</p>
          </div>
          <div class="from">
            <p class="street">{{ invoice.fromStreet }}</p>
            <p class="city">{{ invoice.fromCity }}</p>
            <p class="post-code">{{ invoice.fromPostCode }}</p>
            <p class="country">{{ invoice.fromCountry }}</p>
          </div>
        </div>
        <div class="detail-grid-container">
          <div class="invoice-date">
            <p class="label">Invoice Date</p>
            <p class="date">{{ invoice.invoiceDate }}</p>
          </div>
          <div class="bill-to">
            <p class="label">Bill To</p>
            <p class="name">{{ invoice.clientName }}</p>
            <p class="street">{{ invoice.toStreet }}</p>
            <p class="city">{{ invoice.toCity }}</p>
            <p class="post-code">{{ invoice.toPostCode }}</p>
            <p class="country">{{ invoice.toCountry }}</p>
          </div>
          <div class="due">
            <p class="label">Payment Due</p>
            <p class="date">
              {{ "Due " + formatDate(Date.now() + 8.64e7 * invoice.due) }}
            </p>
          </div>
          <div class="sent-to">
            <p class="label">Sent to</p>
            <p class="email">{{ invoice.email }}</p>
          </div>
        </div>

        <div class="resume-container">
          <div class="resume">
            <div class="body">
              <div class="head hide-for-mobile">
                <small class="head-name">Item Name</small>
                <small class="head-qty">QTY.</small>
                <small class="head-price">Price</small>
                <small class="head-total">Total</small>
              </div>
              <div
                class="item"
                v-for="(item, index) in invoice.items"
                :key="index"
              >
                <p class="name">{{ item.itemName }}</p>
                <p class="qty">
                  {{ item.quantity }}
                  <span class="hide-for-tablet-and-desktop">x</span>
                  <span class="price hide-for-tablet-and-desktop">
                    £
                    {{
                      item.price ? item.price.toFixed(2) : (0).toFixed(2)
                    }}</span
                  >
                </p>
                <p class="price hide-for-mobile">£ {{ item.price }}</p>
                <p class="total">
                  £ {{ (item.quantity * item.price).toFixed(2) }}
                </p>
              </div>
            </div>
            <div class="footer">
              <p class="amount-due">Amount Due</p>
              <p class="big-total">{{ invoice.totalAmount }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-container>

    <v-container class="mobile-cta-container hide-for-tablet-and-desktop">
      <div
        class="cta"
        :class="{ 'cta--paid': invoiceIsPaid, 'cta--not-paid': !invoiceIsPaid }"
      >
        <button class="edit" @click="editInvoice">Edit</button>
        <button class="delete" @click="promptBeforeRemoval">Delete</button>
        <button v-if="!invoiceIsPaid" class="mark-as-paid" @click="markAsPaid">
          Mark as Paid
        </button>
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

// COMPUTED

if (!store.getters.invoice) {
  router
    .push({
      path: "/",
    })
    .then(() => {
      store.dispatch("setCurrentInvoice", { invoiceCode: null });
    });
}

const invoice = computed(() => store.getters.invoice);

const invoiceIsPaid = computed(() =>
  invoice.value.status === "Paid" ? true : false
);
const currentMode = computed(() => store.getters["layout/currentMode"]);

// FUNCITONS

function promptBeforeRemoval() {
  document.querySelector("body").setAttribute("class", "remove-scroll");
  store.dispatch("layout/showModals", { currentView: "deletion-prompt" });
}

function markAsPaid() {
  store.dispatch("markAsPaid", { invoiceCode: invoice.value.invoiceCode });
}

function editInvoice() {
  document.querySelector("body").setAttribute("class", "remove-scroll");
  store.dispatch("layout/setFormMode", { form_mode_is_edit: true });
  store.dispatch("setCurrentInvoice", {
    invoiceCode: invoice.value.invoiceCode,
  });
  store.dispatch("layout/showModals", { currentView: "invoice-form" });
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
</script>

<style lang="scss" scoped>
@import "../sass/breakpoints";
@import "../sass/colors";
@import "../sass/mixins";
@import "../sass/functions";

.root {
  padding-top: toRem(32, 18);

  .link {
    margin-bottom: toRem(32, 18);
    padding: 0 toRem(24, 18);
    position: relative;
    a {
      font-style: normal;
      font-weight: bold;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      margin-left: toRem(23.66, 18);
    }

    &::before {
      content: url("../assets/icon-arrow-left.svg");
      position: absolute;
      left: toRem(24, 18);
    }
  }

  .status-container {
    padding: toRem(24, 18) toRem(24, 18) toRem(27, 18) toRem(24, 18); // 24px 24px 27px 24px
    margin: 0 toRem(24, 18) toRem(16, 18) toRem(24, 18);
    > .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-style: normal;
        font-weight: 500;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
      }
    }
  }

  .detail-container {
    padding: toRem(24, 18) 0; // 24px
    margin: 0 toRem(24, 18) toRem(56, 18) toRem(24, 18);
    .detail {
      .top {
        padding: 0 toRem(24, 18);
      }

      .top .invoice-code {
        font-weight: bold;
        font-style: normal;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
        margin-bottom: toRem(4, 18);
        .hash {
          color: $blue-violet; // used for dark and light mode !!!
        }
      }

      .top .description {
        font-weight: 500;
        font-style: normal;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
        margin-bottom: toRem(30, 18); // 30px
        .hash {
          color: $blue-violet; // used for dark and light mode !!!
        }
      }

      .from {
        padding: 0 toRem(24, 18);
        font-weight: 500;
        font-style: normal;
        font-size: toRem(11, 18);
        line-height: 1rem;
        letter-spacing: -0.23px;
        margin-bottom: toRem(31, 18); // 31px
      }

      .detail-grid-container {
        padding: 0 toRem(24, 18);
        margin-bottom: toRem(40, 18);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: toRem(47, 18) toRem(75, 18) auto;
        grid-template-areas:
          "invoiceDate  billTo"
          "due          billTo"
          "sentTo       sentTo";

        .label {
          font-style: normal;
          font-weight: 500;
          font-size: toRem(12, 18); //12px
          line-height: toRem(15, 18); // 15px
          letter-spacing: -0.25px;
        }

        .date {
          font-style: normal;
          font-weight: bold;
          font-size: toRem(15, 18);
          line-height: toRem(20, 18);
          letter-spacing: -0.3125px;
        }

        .invoice-date {
          grid-area: invoiceDate;
          > .label {
            margin-bottom: toRem(12, 18);
          }
        }
        .bill-to {
          font-style: normal;
          font-weight: 500;
          font-size: toRem(11, 18); // 11px
          line-height: 1rem;
          letter-spacing: -0.229167px;
          > .label {
            margin-bottom: toRem(12, 18);
          }

          > .name {
            font-style: normal;
            font-weight: bold;
            font-size: toRem(15, 18);
            line-height: toRem(20, 18);
            letter-spacing: -0.3125px;
            margin-bottom: toRem(8, 18);
          }
        }
        .due {
          grid-area: due;
          padding-top: toRem(32, 18); // 32px
          > .label {
            margin-bottom: toRem(12, 18);
          }
        }
        .sent-to {
          grid-area: sentTo;
          padding-top: 2rem;
          > .label {
            margin-bottom: toRem(12, 18);
          }

          .email {
            font-style: normal;
            font-weight: bold;
            font-size: toRem(15, 18);
            line-height: toRem(20, 18);
            letter-spacing: -0.3125px;
          }
        }
      }
    }

    .resume-container {
      padding: 0 toRem(24, 18) 0 toRem(24, 18);
      .body {
        border-radius: toRem(8, 18) toRem(8, 18) 0 0;
        overflow: hidden;
        padding: toRem(24, 18);
        .item {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-template-areas:
            "name total"
            "qty total";

          .name {
            grid-area: name;
            font-style: normal;
            font-weight: bold;
            font-size: toRem(12, 18);
            line-height: toRem(15, 18);
            letter-spacing: -0.25px;
            margin-bottom: toRem(8, 18);
          }

          .price {
          }

          .qty {
            grid-area: qty;
            font-style: normal;
            font-weight: bold;
            font-size: toRem(12, 18);
            line-height: toRem(15, 18);
            letter-spacing: -0.25px;
          }

          .total {
            grid-area: total;
            display: flex;
            padding-top: toRem(12, 18);
            justify-content: flex-end;
            font-style: normal;
            font-weight: bold;
            font-size: toRem(12, 18);
            line-height: toRem(15, 18);
            letter-spacing: -0.25px;
          }
        }

        .item:not(:last-child) {
          margin-bottom: toRem(24, 18);
        }
      }

      .footer {
        padding: toRem(24, 18);
        border-radius: 0 0 toRem(8, 18) toRem(8, 18);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .amount-due {
          font-style: normal;
          font-weight: 500;
          font-size: toRem(11, 18); // 11px
          line-height: 1rem;
          letter-spacing: -0.229167px;
        }

        .big-total {
          font-style: normal;
          font-weight: 700;
          font-size: toRem(20, 18);
          line-height: toRem(32, 18);
          letter-spacing: -0.416667px;
        }
      }
    }
  }

  .mobile-cta-container {
    border-radius: unset;
    .cta {
      justify-self: flex-end;
      padding: toRem(21, 18) toRem(24, 18) toRem(22, 18) toRem(24, 18);
      display: flex;
      justify-content: space-evenly;
      > button {
        border-radius: toRem(24, 18);
        border: none;
        font-style: normal;
        font-weight: bold;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
      }

      > button:not(:last-child) {
        margin-right: toRem(8, 18);
      }
      .edit {
        padding: toRem(17, 18) toRem(23, 18) toRem(16, 18) toRem(24, 18);
      }
      .delete {
        padding: toRem(17, 18) toRem(24, 18) toRem(16, 18) toRem(24, 18);
      }
      .mark-as-paid {
        padding: toRem(17, 18) toRem(28, 18) toRem(16, 18) toRem(27, 18);
      }
    }

    .cta--paid {
      padding: toRem(21, 18) toRem(24, 18) toRem(22, 18) toRem(24, 18);
      display: flex;
      justify-content: flex-end;
    }

    .cta--not-paid {
      padding: toRem(21, 18) toRem(24, 18) toRem(22, 18) toRem(24, 18);
      display: flex;
      justify-content: space-evenly;
    }
  }
}

.--light-mode {
  .link {
    a {
      color: $black-2;
    }
  }

  .link:hover {
    a {
      color: $blue-violet;
    }
  }

  .status-container {
    > .wrapper {
      p {
        color: $light-violet;
      }

      .cta {
        .edit {
          color: $blue-violet;
          background-color: $light-bg-2;

          &:hover {
            color: $blue-violet;
            background-color: $blue-gray-light;
          }
        }
        .delete {
          color: #fff;
          background-color: $red;
          &:hover {
            background-color: $red-blurred;
          }
        }
        .mark-as-paid {
          color: #fff;
          background-color: $violet-1;
          &:hover {
            background-color: $violet-2;
          }
        }
      }
    }
  }

  .detail-container {
    .detail {
      .top .description {
        color: $light-violet;
      }

      .from {
        color: $light-violet;
      }

      .detail-grid-container {
        .label {
          color: $blue-violet;
        }

        .date {
          color: $black-2;
        }

        .bill-to {
          color: $blue-violet;

          > .name {
            color: $black-2;
          }
        }

        .sent-to {
          .email {
            color: $black-2;
          }
        }
      }
    }

    .resume-container {
      .body {
        background-color: $light-bg-2;

        .head {
          color: $blue-violet;
        }

        .item {
          .name {
            color: $black-2;
          }

          .qty {
            color: $light-violet;
          }

          .total {
            color: $black-2;
          }

          .price {
            color: $light-violet;
          }
        }
      }

      .footer {
        background-color: $black-4;
        color: #fff;
        align-items: center;
      }
    }
  }

  .mobile-cta-container {
    .cta {
      .edit {
        color: $blue-violet;
        background-color: $light-bg-2;

        &:hover {
          color: $blue-violet;
          background-color: $blue-gray-light;
        }
      }
      .delete {
        color: #fff;
        background-color: $red;
        &:hover {
          background-color: $red-blurred;
        }
      }
      .mark-as-paid {
        color: #fff;
        background-color: $violet-1;
        &:hover {
          background-color: $violet-2;
        }
      }
    }
  }
}

.--dark-mode {
  .link {
    a {
      color: #fff;
    }
  }

  .link:hover {
    a {
      color: $violet-gray;
    }
  }

  .status-container {
    background-color: $black-1;
    > .wrapper {
      p {
        color: $blue-gray-light;
      }

      .cta {
        .edit {
          color: $blue-gray-light;
          background-color: $dark-blue;
          &:hover {
            color: $blue-gray-light;
            background-color: $blue-violet;
          }
        }
        .delete {
          color: #fff;
          background-color: $red;
          &:hover {
            background-color: $red-blurred;
          }
        }
        .mark-as-paid {
          color: #fff;
          background-color: $violet-1;
          &:hover {
            background-color: $violet-2;
          }
        }
      }
    }
  }

  .detail-container {
    background-color: $black-1;
    .detail {
      .top .invoice-code {
        color: #fff;
      }

      .top .description {
        color: $blue-gray-light;
      }

      .from {
        color: $blue-gray-light;
      }

      .detail-grid-container {
        .label {
          color: $blue-gray-light;
        }

        .date {
          color: #fff;
        }

        .bill-to {
          color: $blue-gray-light;

          > .name {
            color: #fff;
          }
        }

        .sent-to {
          .email {
            color: #fff;
          }
        }
      }
    }

    .resume-container {
      .body {
        background-color: $dark-blue;
        .head {
          color: $blue-gray-light;
        }

        .item {
          .name {
            color: #fff;
          }

          .qty {
            color: $violet-gray;
          }

          .price {
            color: $violet-gray;
          }

          .total {
            color: #fff;
          }
        }
      }

      .footer {
        background-color: $black-2;
      }
    }
  }

  .mobile-cta-container {
    background-color: $black-1;
    .cta {
      .edit {
        color: $blue-gray-light;
        background-color: $dark-blue;
        &:hover {
          color: $blue-gray-light;
          background-color: $blue-violet;
        }
      }
      .delete {
        color: #fff;
        background-color: $red;
        &:hover {
          background-color: $red-blurred;
        }
      }
      .mark-as-paid {
        color: #fff;
        background-color: $violet-1;
        &:hover {
          background-color: $violet-2;
        }
      }
    }
  }
}

@include breakpoint-up(medium) {
  .root {
    padding: toRem(48, 18) toRem(40, 18); // 48px 40px

    .status-container {
      padding: toRem(20, 18) toRem(32, 18) toRem(20, 18) toRem(32, 18);
      margin: 0 0 toRem(24, 18) 0;
      > .wrapper {
        display: grid;
        grid-template-columns: toRem(55, 18) toRem(105, 18) 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: "label statusInd cta";
        justify-content: unset;
      }

      .cta {
        grid-area: cta;
        justify-self: flex-end;

        > button {
          border-radius: toRem(24, 18);
          border: none;
          font-style: normal;
          font-weight: bold;
          font-size: toRem(12, 18);
          line-height: toRem(15, 18);
          letter-spacing: -0.25px;
        }

        > button:not(:last-child) {
          margin-right: toRem(8, 18);
        }

        .edit {
          padding: toRem(17, 18) toRem(23, 18) toRem(16, 18) toRem(24, 18);
        }
        .delete {
          padding: toRem(17, 18) toRem(24, 18) toRem(16, 18) toRem(24, 18);
        }
        .mark-as-paid {
          padding: toRem(17, 18) toRem(28, 18) toRem(16, 18) toRem(27, 18);
        }
      }

      .statusInd {
        grid-area: statusInd;
        justify-self: flex-start;
      }

      > p {
        grid-area: label;
      }
    }

    .detail-container {
      padding: toRem(32, 18) 0; // 32px
      margin: unset;
      .detail {
        .top-from-container {
          display: flex;
          justify-content: space-between;
          padding: 0 toRem(32, 18);
          margin-bottom: toRem(21, 18);

          .top {
            padding: unset;
          }

          .top .description {
            margin-bottom: unset;
          }

          .top .invoice-code {
            font-size: toRem(16, 18);
            line-height: 1rem;
            letter-spacing: -0.8px;
            margin-bottom: toRem(8, 18);
          }

          .from {
            text-align: right;
            padding: unset;
            margin-bottom: unset;
          }
        }

        .detail-grid-container {
          padding: 0 toRem(32, 18);
          margin-bottom: toRem(48, 18); // 48px
          display: grid;
          grid-template-columns: toRem(196, 18) toRem(203, 18) 1fr;
          grid-template-rows: toRem(47, 18) auto;
          grid-template-areas:
            "invoiceDate  billTo  sentTo"
            "due          billTo  sentTo";

          .invoice-date {
            grid-area: invoiceDate;
          }

          .bill-to {
            grid-area: billTo;
          }

          .due {
            grid-area: due;
          }
          .sent-to {
            grid-area: sentTo;
            padding-top: unset;
          }
        }
      }

      .resume-container {
        padding: 0 toRem(24, 18) 0 toRem(24, 18);
        .body {
          padding: toRem(32, 18);

          .head {
            display: grid;
            grid-template-columns: toRem(276, 18) toRem(29, 18) toRem(147, 18) 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "head-name head-qty head-price head-total";
            margin-bottom: toRem(32, 18);

            .head-name,
            .head-price,
            .head-qty,
            .head-total {
              font-style: normal;
              font-weight: 500;
              font-size: toRem(12, 18);
              line-height: toRem(15, 18);
              letter-spacing: -0.25px;
            }

            .head-name {
              grid-area: head-name;
            }
            .head-qty {
              grid-area: head-qty;
            }
            .head-price {
              grid-area: head-price;
              text-align: end;
            }
            .head-total {
              grid-area: head-total;
              text-align: end;
            }
          }

          .item {
            display: grid;
            grid-template-columns: toRem(276, 18) toRem(29, 18) toRem(147, 18) 1fr;
            grid-template-rows: auto;
            grid-template-areas: "name qty price total";

            .name {
              grid-area: name;
              margin-bottom: unset;
            }

            .qty {
              grid-area: qty;
              text-align: center;
            }

            .price {
              font-style: normal;
              font-weight: bold;
              font-size: toRem(12, 18);
              line-height: toRem(15, 18);
              letter-spacing: -0.25px;
              text-align: end;
            }

            .total {
              grid-area: total;
              text-align: end;
              display: unset;
              padding-top: unset;
            }
          }

          .item:not(:last-child) {
            margin-bottom: toRem(24, 18);
          }
        }

        .footer {
          padding: toRem(24, 18);
          border-radius: 0 0 toRem(8, 18) toRem(8, 18);
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .amount-due {
            font-style: normal;
            font-weight: 500;
            font-size: toRem(11, 18); // 11px
            line-height: 1rem;
            letter-spacing: -0.229167px;
          }

          .big-total {
            font-style: normal;
            font-weight: 700;
            font-size: toRem(20, 18);
            line-height: toRem(32, 18);
            letter-spacing: -0.416667px;
          }
        }
      }
    }
  }
}

@include breakpoint-up(large) {
  .root {
    padding: toRem(64, 18) 0 3rem 0; // 64px
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: toRem(730, 18);
    margin: 0 auto;
    .status-container {
      > .wrapper {
        display: grid;
        grid-template-columns: toRem(55, 18) toRem(105, 18) 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: "label statusInd cta";
        justify-content: unset;
      }

      .cta {
        grid-area: cta;
      }

      .statusInd {
        grid-area: statusInd;
        justify-self: flex-start;
      }

      > p {
        grid-area: label;
      }
    }

    .detail-container {
      padding: toRem(48, 18); // 48px

      .detail {
        .top-from-container {
          display: flex;
          justify-content: space-between;
          padding: 0;
          margin-bottom: toRem(21, 18);

          .top {
            padding: unset;
          }

          .top .description {
            margin-bottom: unset;
          }

          .top .invoice-code {
            font-size: toRem(16, 18);
            line-height: 1rem;
            letter-spacing: -0.8px;
            margin-bottom: toRem(8, 18);
          }

          .from {
            text-align: right;
            padding: unset;
            margin-bottom: unset;
          }
        }

        .detail-grid-container {
          padding: 0;
          margin-bottom: toRem(48, 18); // 48px
          display: grid;
          grid-template-columns: toRem(196, 18) toRem(203, 18) 1fr;
          grid-template-rows: toRem(47, 18) auto;
          grid-template-areas:
            "invoiceDate  billTo  sentTo"
            "due          billTo  sentTo";

          .invoice-date {
            grid-area: invoiceDate;
          }

          .bill-to {
            grid-area: billTo;
          }

          .due {
            grid-area: due;
          }
          .sent-to {
            grid-area: sentTo;
            padding-top: unset;
          }
        }
      }

      .resume-container {
        padding: 0;
        .body {
          padding: toRem(32, 18);

          .head {
            display: grid;
            grid-template-columns: toRem(286, 18) toRem(29, 18) toRem(118, 18) 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "head-name head-qty head-price head-total";
            margin-bottom: toRem(32, 18);

            .head-name {
              grid-area: head-name;
            }
            .head-qty {
              grid-area: head-qty;
            }
            .head-price {
              grid-area: head-price;
              text-align: end;
            }
            .head-total {
              grid-area: head-total;
              text-align: end;
            }
          }

          .item {
            display: grid;
            grid-template-columns: toRem(286, 18) toRem(29, 18) toRem(118, 18) 1fr;
            grid-template-rows: auto;
            grid-template-areas: "name qty price total";

            .name {
              grid-area: name;
              margin-bottom: unset;
            }

            .qty {
              grid-area: qty;
              text-align: center;
            }

            .price {
              grid-area: price;
            }

            .total {
              grid-area: total;
              text-align: end;
              display: unset;
              padding-top: unset;
            }
          }

          .item:not(:last-child) {
            margin-bottom: toRem(24, 18);
          }
        }

        .footer {
          padding: toRem(24, 18);
          border-radius: 0 0 toRem(8, 18) toRem(8, 18);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .amount-due {
            font-style: normal;
            font-weight: 500;
            font-size: toRem(11, 18); // 11px
            line-height: 1rem;
            letter-spacing: -0.229167px;
          }

          .big-total {
            font-style: normal;
            font-weight: 700;
            font-size: toRem(20, 18);
            line-height: toRem(32, 18);
            letter-spacing: -0.416667px;
          }
        }
      }
    }
  }
}
</style>
