<template>
  <div
    class="root"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
    ref="invoiceForm"
  >
    <div class="back hide-for-tablet-and-desktop">
      <a @click="closeForm">Go back</a>
    </div>
    <h1>New Invoice</h1>
    <form>
      <div class="group from">
        <p class="group__title">Bill From</p>
        <div class="from__fields">
          <div class="field from__street">
            <label class="label" for="f-str">Street Address</label>
            <input type="text" ref="streetInput" />
          </div>
          <div class="field from__city">
            <label class="label" for="f-city">City</label>
            <input type="text" />
          </div>
          <div class="field from__psc">
            <label class="label" for="f-psc">Post Code</label>
            <input type="text" />
          </div>
          <div class="field from__ctry">
            <label class="label" for="f-ctry">Country</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="group to">
        <p class="group__title">Bill To</p>
        <div class="to__fields">
          <div class="field to__clt-name">
            <label class="label" for="t-clt-name">Client’s Name</label>
            <input type="text" />
          </div>
          <div class="field to__email">
            <label class="label" for="t-email">Client’s Email</label>
            <input type="text" />
          </div>
          <div class="field to__str">
            <label class="label" for="t-str">Street Address</label>
            <input type="text" />
          </div>
          <div class="field to__city">
            <label class="label" for="t-city">City</label>
            <input type="text" />
          </div>
          <div class="field to__psc">
            <label class="label" for="t-psc">Post Code</label>
            <input type="text" />
          </div>
          <div class="field to__ctry">
            <label class="label" for="t-ctry">Country</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="group invoice">
        <div class="invoice__fields">
          <div class="field date">
            <label class="label" for="inv-date">Invoice Date</label>
            <div class="inv-date-wrapper">
              {{ invoiceDateValue }}
              <input
                type="date"
                ref="invoiceDateInput"
                @change="setInvoiceDate"
              />
            </div>
          </div>
          <div class="field terms">
            <label class="label" for="inv-term">Payment Terms</label>
            <div class="select-wrapper" @click="toggleTerms">
              {{ invoiceTermsValue }}
              <ul v-if="isTermsDisplayed" class="options">
                <li class="day 1-day" @click="setInvoiceTerms('1-day')">
                  Net 1 Day
                </li>
                <li class="day 7-day" @click="setInvoiceTerms('7-day')">
                  Net 7 Days
                </li>
                <li class="day 14-day" @click="setInvoiceTerms('14-day')">
                  Net 14 Days
                </li>
                <li class="day 30-day" @click="setInvoiceTerms('30-day')">
                  Net 30 Days
                </li>
              </ul>
            </div>
          </div>
          <div class="field desc">
            <label class="label" for="inv-desc">Project Description</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="group item-list">
        <h2>Item List</h2>
        <div class="item item__fields">
          <div class="field item__name">
            <label class="label" for="item-name">Item Name</label>
            <input type="text" value="Banner Design" />
          </div>
          <div class="field item__qty">
            <label class="label" for="item-qty">Qty.</label>
            <input type="text" value="1" />
          </div>
          <div class="field item__price">
            <label class="label" for="item-price">Price</label>
            <input type="text" value="156.00" />
          </div>
          <div class="field item__total">
            <label class="label" for="item-total">Total</label>
            <input type="text" value="156.00" />
          </div>
          <div class="field item__remove">
            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                fill="#888EB0"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>
        <div class="item item__fields">
          <div class="field item__name">
            <label class="label" for="item-name">Item Name</label>
            <input type="text" value="Banner Design" />
          </div>
          <div class="field item__qty">
            <label class="label" for="item-qty">Qty.</label>
            <input type="text" value="1" />
          </div>
          <div class="field item__price">
            <label class="label" for="item-price">Price</label>
            <input type="text" value="156.00" />
          </div>
          <div class="field item__total">
            <label class="label" for="item-total">Total</label>
            <input type="text" value="156.00" />
          </div>
          <div class="field item__remove">
            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                fill="#888EB0"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>
        <div class="item-cta">
          <button type="button">+ Add New Item</button>
        </div>
      </div>
      <div class="from-cta">
        <div class="cell cancel-cell">
          <button class="cancel" @click="closeForm">Discard</button>
        </div>
        <div class="cell draft-cell">
          <button class="draft">Save as Draft</button>
        </div>
        <div class="cell save-cell">
          <button class="save">Save & Send</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed, watch, watchEffect, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const invoiceForm = ref(null);
const invoiceDateInput = ref(null);
const streetInput = ref(null);
const invoiceDateValue = ref(formatDate(Date.now()));
const invoiceTermsValue = ref("Net 30 Days");
const isTermsDisplayed = ref(false);

// Computed
const currentMode = computed(() => store.getters["layout/currentMode"]);

// Lifecycle Hooks

onMounted(() => {
  streetInput.value.focus();
  const currentViewHeight = invoiceForm.value.offsetHeight + "px";
  store.dispatch("layout/setCurrentViewHeight", {
    currentViewHeight: currentViewHeight,
  });
}),
  // Function
  function setInvoiceDate() {
    if (invoiceDateInput.value) {
      invoiceDateValue.value = formatDate(invoiceDateInput.value.value);
    }
  };

function closeForm() {
  document.querySelector("body").classList.remove("remove-scroll");
  store.dispatch("layout/showModals", { currentView: "" });
}

function toggleTerms() {
  isTermsDisplayed.value = !isTermsDisplayed.value;
}

function setInvoiceTerms(terms) {
  switch (terms) {
    case "1-day":
      invoiceTermsValue.value = "Net 1 Day";
      return;
    case "7-day":
      invoiceTermsValue.value = "Net 7 Days";
      return;
    case "14-day":
      invoiceTermsValue.value = "Net 14 Days";
      return;
    case "30-day":
      invoiceTermsValue.value = "Net 30 Days";
      return;

    default:
      invoiceTermsValue.value = "Net 30 Days";
      return;
  }
}

function formatDate(toFormat) {
  return (
    new Date(toFormat).getUTCDate() +
    " " +
    new Date(toFormat).toLocaleDateString("en-US", {
      weekday: "short",
    }) +
    " " +
    new Date(toFormat).getUTCFullYear()
  );
}
</script>
<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";
.root {
  position: relative;
  z-index: 2;
  padding-top: 1.777777rem;
  .back {
    padding: 0 1.333333rem;
    position: relative;
    margin-bottom: 1.333333rem;
    a {
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      margin-left: 1.314444rem;
    }

    &::before {
      content: url("../../assets/icon-arrow-left.svg");
      position: absolute;
      left: 1.333333rem;
    }
  }

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 1.333333rem;
    line-height: 1.777777rem;
    letter-spacing: -0.5px;
    padding-left: 1.333333rem;
    margin-bottom: 1.333333rem;
  }

  .group {
    padding: 0 1.333333rem;

    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      margin-bottom: 1.333333rem;
    }

    .label {
      font-style: normal;
      font-weight: 500;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      margin-bottom: 0.555555rem;
    }

    input,
    .inv-date-wrapper,
    .select-wrapper {
      padding: 0.944444rem 0 0.888888rem 1.111111rem;
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      border-radius: 0.222222rem;
      width: 100%;
    }

    .field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .from,
  .to,
  .invoice,
  .item-list {
    margin-bottom: 2.222222rem;

    .field:not(:last-child) {
      margin-bottom: 1.333333rem;
    }
  }

  .from {
    .from__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      column-gap: 1.277777rem;
      grid-template-areas:
        "f-str f-str"
        "f-city f-psc"
        "f-ctry f-ctry";

      .from__street {
        grid-area: f-str;
      }

      .from__city {
        grid-area: f-city;
      }

      .from__psc {
        grid-area: f-psc;
      }

      .from__ctry {
        grid-area: f-ctry;
      }
    }
  }

  .to {
    .to__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, 1fr);
      column-gap: 1.277777rem;
      grid-template-areas:
        "t-clt-name t-clt-name"
        "t-email t-email"
        "t-str t-str"
        "t-city t-psc"
        "t-ctry t-ctry";

      .to__clt-name {
        grid-area: t-clt-name;
      }
      .to__email {
        grid-area: t-email;
      }
      .to__str {
        grid-area: t-str;
      }

      .to__city {
        grid-area: t-city;
      }

      .to__psc {
        grid-area: t-psc;
      }

      .to__ctry {
        grid-area: t-ctry;
      }
    }
  }

  .invoice {
    margin-bottom: 3.666666rem;
    .date {
      .inv-date-wrapper {
        height: 2.666666rem;
        position: relative;
      }

      .inv-date-wrapper > input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }

      .inv-date-wrapper:after {
        content: url("../../assets/icon-calendar.svg");
        position: absolute;
        right: 0.888888rem;
      }
    }

    .terms {
      .select-wrapper {
        height: 2.666666rem;
        position: relative;
        cursor: pointer;
      }

      .select-wrapper > .options {
        position: absolute;
        top: 2.666666rem + 0.444444rem;
        left: 0;
        background: #ffffff;
        box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
        border-radius: 0.444444rem;
        width: 100%;
      }

      .select-wrapper > .options > .day {
        font-style: normal;
        font-weight: bold;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        padding: 0.833333rem 0 0.888888rem 1.333333rem;
      }
    }
  }

  .item-list {
    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.777777rem;
      letter-spacing: -0.375px;
      margin-bottom: 1.333333rem;
    }

    .item__fields {
      display: grid;
      margin-bottom: 2.666666rem;
      grid-template-columns: auto auto auto 1fr;
      grid-template-rows: repeat(2, auto);
      column-gap: 1.277777rem;
      grid-template-areas:
        "name  name  name  name"
        "qty   price total cta";

      .item__name {
        grid-area: name;
      }
      .item__qty {
        grid-area: qty;
        min-width: 64px;
      }
      .item__price {
        grid-area: price;
        min-width: 100px;
      }
      .item__total {
        grid-area: total;
        min-width: 56px;
        & > input {
          border: none;
          padding-left: 0;
          pointer-events: none;
        }
      }
      .item__remove {
        grid-area: cta;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }

      .item__remove > svg {
        cursor: pointer;
      }

      .item__remove > svg:hover {
        > path {
          fill: $red;
        }
      }
    }
  }

  .item-cta {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 4.888888rem; // 88px
    & > button {
      border: none;
      border-radius: 1.333333rem;
      width: 100%;
      padding: 0.944444rem 0 0.888888rem 0;
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
    }
  }

  .from-cta {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: 1fr;
    grid-template-areas: "cancel draft save";
    padding: 1.166666rem 1.333333rem 1.222222rem 1.333333rem;
    column-gap: 0.388888rem;
    justify-content: flex-end;
    .cell {
      > button {
        border-radius: 1.333333rem;
        font-style: normal;
        font-weight: bold;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        border: none;
      }
    }

    .cancel-cell {
      grid-area: cancel;

      > button {
        padding: 0.944444rem 1rem 0.888888rem 0.944444rem;
      }
    }
    .draft-cell {
      grid-area: draft;
      > button {
        padding: 0.944444rem 0.882777rem 0.888888rem 0.895rem;
      }
    }
    .save-cell {
      grid-area: save;
      > button {
        padding: 0.944444rem 0.888888rem 0.888888rem 0.888888rem;
      }
    }
  }
}

.--light-mode {
  background-color: #fff;

  h1 {
    color: $black-2;
  }

  .group {
    &__title {
      color: $violet-1;
    }

    .label {
      color: $blue-violet;
    }

    input,
    .inv-date-wrapper,
    .select-wrapper {
      border: 1px solid $blue-gray-light;
      color: $black-2;
    }

    .inv-date-wrapper:hover,
    .select-wrapper:hover {
      border: 1px solid $violet-2;
    }

    input:focus {
      border: 1px solid $violet-2;
    }

    .field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .invoice {
    .terms {
      .select-wrapper > .options {
        background-color: #ffffff;
      }

      .select-wrapper > .options > .day {
        color: $black-2;
      }

      .select-wrapper > .options > .day:hover {
        color: $violet-1;
      }
      .select-wrapper > .options > .day:not(:last-child) {
        border-bottom: 1px solid $blue-gray-light;
      }
    }
  }

  .item-list {
    h2 {
      color: #777f98;
    }
  }

  .item-cta {
    & > button {
      color: $blue-violet;
      background-color: $light-bg-2;
    }

    & > button:hover {
      background-color: $blue-gray-light;
    }
  }

  .from-cta {
    .cancel-cell {
      > button {
        background-color: $light-bg-2;
        color: $blue-violet;
      }
      > button:hover {
        background-color: $blue-gray-light;
        color: $blue-violet;
      }
    }
    .draft-cell {
      > button {
        background-color: $black-4;
        color: $violet-gray;
      }
      > button:hover {
        background-color: $black-2;
      }
    }
    .save-cell {
      > button {
        background-color: $violet-1;
        color: #fff;
      }
      button:hover {
        background-color: $violet-2;
      }
    }
  }
}

.--dark-mode {
  background-color: $black-3;
  .back {
    a {
      color: #fff;
    }
  }

  h1 {
    color: #fff;
  }

  .group {
    &__title {
      color: $violet-1;
    }

    .label {
      color: $violet-gray;
    }

    input,
    .inv-date-wrapper,
    .select-wrapper {
      border: 1px solid $dark-blue;
      color: #fff;
      background-color: $black-1;
    }

    .inv-date-wrapper:hover,
    .select-wrapper:hover {
      border: 1px solid $violet-1;
    }

    input:focus {
      border: 1px solid $violet-1;
    }
  }

  .invoice {
    .terms {
      .select-wrapper > .options {
        background-color: $dark-blue;
      }

      .select-wrapper > .options > .day {
        color: $blue-gray-light;
      }

      .select-wrapper > .options > .day:hover {
        color: $violet-2;
      }

      .select-wrapper > .options > .day:not(:last-child) {
        border-bottom: 1px solid $black-1;
      }
    }
  }

  .item-list {
    h2 {
      color: #777f98;
    }

    .item__fields {
      .item__total > input {
        background-color: transparent;
      }
    }
  }

  .item-cta {
    & > button {
      color: $blue-gray-light;
      background-color: $dark-blue;
    }

    & > button:hover {
      background-color: $black-1;
    }
  }

  .from-cta {
    .cell {
      > button {
      }
    }

    .cancel-cell {
      > button {
        background-color: $dark-blue;
        color: $blue-gray-light;
      }
      > button:hover {
        background-color: #fff;
      }
    }
    .draft-cell {
      > button {
        background-color: $black-4;
        color: $blue-gray-light;
      }
      > button:hover {
        background-color: $black-1;
      }
    }
    .save-cell {
      > button {
        background-color: $violet-1;
        color: #fff;
      }
      button:hover {
        background-color: $violet-2;
      }
    }
  }
}

@media screen and (min-width: $tablet-min) {
  .root {
    padding-top: 3.111111rem; // 56 px
    width: 34.222222rem; // 616px
    border-radius: 0 1.111111rem 1.111111rem 0;
    h1 {
      padding-left: 3.111111rem;
      margin-bottom: 2.666666rem;
    }

    .group {
      padding: 0 3.111111rem;
    }

    .from,
    .to {
      margin-bottom: 2.666666rem;
    }

    .from {
      .from__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "f-str f-str f-str"
          "f-city f-psc f-ctry";

        .from__street {
          grid-area: f-str;
        }

        .from__city {
          grid-area: f-city;
        }

        .from__psc {
          grid-area: f-psc;
        }

        .from__ctry {
          grid-area: f-ctry;
        }
      }
    }

    .to {
      .to__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "t-clt-name t-clt-name  t-clt-name"
          "t-email    t-email     t-email"
          "t-str      t-str       t-str"
          "t-city     t-psc       t-ctry";

        .to__clt-name {
          grid-area: t-clt-name;
        }
        .to__email {
          grid-area: t-email;
        }
        .to__str {
          grid-area: t-str;
        }

        .to__city {
          grid-area: t-city;
        }

        .to__psc {
          grid-area: t-psc;
        }

        .to__ctry {
          grid-area: t-ctry;
        }
      }
    }

    .invoice {
      margin-bottom: 1.333333rem;
      > .invoice__fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "inv-date inv-terms"
          "desc     desc";

        .date {
          grid-area: inv-date;
        }

        .terms {
          grid-area: inv-terms;
        }

        .desc {
          grid-area: desc;
        }
      }
    }

    .item-list {
      margin-bottom: 2.611111rem;

      .item__fields {
        display: grid;
        margin-bottom: 1rem;
        grid-template-columns: auto auto auto auto 1fr;
        grid-template-rows: 1fr;
        column-gap: 0.888888rem;
        grid-template-areas: "name  qty  price  total cta";

        .field {
          margin-bottom: unset;
        }

        .item__name {
          grid-area: name;
          min-width: 11.888888rem;
        }
        .item__qty {
          grid-area: qty;
          min-width: 2.555555rem;
        }
        .item__price {
          grid-area: price;
          min-width: 5.555555rem;
        }
        .item__total {
          grid-area: total;
          margin-bottom: unset;
        }
        .item__remove {
          grid-area: cta;
          padding-top: 1.111111rem;
        }
      }
    }

    .item-cta {
      margin-bottom: 2.611111rem; // 47px
    }

    .from-cta {
      display: grid;
      grid-template-columns: 1fr 7.388888rem 7.111111rem;
      grid-template-rows: 1fr;
      grid-template-areas: "cancel draft save";
      padding: 0 3.111111rem 1.777777rem 3.111111rem;
      column-gap: 0.444444rem;
      justify-content: flex-end;

      .cancel-cell {
        grid-area: cancel;
      }
      .draft-cell {
        grid-area: draft;
      }
      .save-cell {
        grid-area: save;
      }
    }
  }
}

@media screen and (min-width: $desktop-min) {
  .root {
    padding-top: 3.111111rem; // 56 px
    width: 39.944444rem; // 719px
    h1 {
      padding-left: 8.833333rem;
    }

    .group {
      padding: 0 3.111111rem 0 8.833333rem;
    }

    .from,
    .to {
      margin-bottom: 2.666666rem;
    }

    .from {
      .from__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "f-str f-str f-str"
          "f-city f-psc f-ctry";

        .from__street {
          grid-area: f-str;
        }

        .from__city {
          grid-area: f-city;
        }

        .from__psc {
          grid-area: f-psc;
        }

        .from__ctry {
          grid-area: f-ctry;
        }
      }
    }

    .to {
      .to__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "t-clt-name t-clt-name  t-clt-name"
          "t-email    t-email     t-email"
          "t-str      t-str       t-str"
          "t-city     t-psc       t-ctry";

        .to__clt-name {
          grid-area: t-clt-name;
        }
        .to__email {
          grid-area: t-email;
        }
        .to__str {
          grid-area: t-str;
        }

        .to__city {
          grid-area: t-city;
        }

        .to__psc {
          grid-area: t-psc;
        }

        .to__ctry {
          grid-area: t-ctry;
        }
      }
    }

    .invoice {
      margin-bottom: 1.333333rem;
      > .invoice__fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: 1.333333rem;
        grid-template-areas:
          "inv-date inv-terms"
          "desc     desc";

        .date {
          grid-area: inv-date;
        }

        .terms {
          grid-area: inv-terms;
        }

        .desc {
          grid-area: desc;
        }
      }
    }

    .item-list {
      margin-bottom: 2.611111rem;

      .item__fields {
        display: grid;
        margin-bottom: 1rem;
        grid-template-columns: auto auto auto auto 1fr;
        grid-template-rows: 1fr;
        column-gap: 0.888888rem;
        grid-template-areas: "name  qty  price  total cta";

        .field {
          margin-bottom: unset;
        }

        .item__name {
          grid-area: name;
          min-width: 11.888888rem;
        }
        .item__qty {
          grid-area: qty;
          min-width: 2.555555rem;
        }
        .item__price {
          grid-area: price;
          min-width: 5.555555rem;
        }
        .item__total {
          grid-area: total;
          margin-bottom: unset;
        }
        .item__remove {
          grid-area: cta;
        }
      }
    }

    .item-cta {
      margin-bottom: 2.611111rem; // 47px
    }

    .from-cta {
      display: grid;
      grid-template-columns: 1fr 7.388888rem 7.111111rem;
      grid-template-rows: 1fr;
      grid-template-areas: "cancel draft save";
      padding: 0 3.111111rem 1.777777rem 8.833333rem;
      column-gap: 0.444444rem;
      justify-content: flex-end;

      .cancel-cell {
        grid-area: cancel;
      }
      .draft-cell {
        grid-area: draft;
      }
      .save-cell {
        grid-area: save;
      }
    }
  }
}
</style>
