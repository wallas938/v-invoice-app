<!-- TEMPLATE -->
<template>
  <div class="cmp-container">
    <header
      class="invoice-header"
      :class="{
        '--light-mode': currentMode === 'light',
        '--dark-mode': currentMode === 'dark',
      }"
    >
      <div class="info">
        <p>Invoices</p>
        <small v-if="invoicesCount">
          <span class="hide-for-mobile">There are </span>
          <span>{{ invoicesCount }}</span>
          <span class="hide-for-mobile"> total</span> invoices
        </small>
        <small v-else>No invoices</small>
      </div>
      <div class="filter">
        <span data-test="filter" @click="toggleFilter"
          >Filter
          <span class="hide-for-mobile">by status</span>
        </span>
        <svg
          @click="toggleFilter"
          width="11"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
        <div data-test="filter-dropdown" v-if="showFilter" class="dropdown">
          <div class="check draft" @click="onCheck('draft')">
            <span
              class="square draft-checkbox"
              :class="{ '--checked': isChecked('draft') }"
            >
              <svg
                v-if="isChecked('draft')"
                width="10"
                height="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  stroke-width="2"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
            <span class="value">Draft</span>
          </div>
          <div class="check pending" @click="onCheck('pending')">
            <span
              class="square pending-checkbox"
              :class="{ '--checked': isChecked('pending') }"
            >
              <svg
                v-if="isChecked('pending')"
                width="10"
                height="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  stroke-width="2"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
            <span class="value">Pending</span>
          </div>
          <div class="check paid" @click="onCheck('paid')">
            <span
              class="square paid-checkbox"
              :class="{ '--checked': isChecked('paid') }"
            >
              <svg
                v-if="isChecked('paid')"
                width="10"
                height="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4.5l2.124 2.124L8.97 1.28"
                  stroke="#FFF"
                  stroke-width="2"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
            <span class="value">Paid</span>
          </div>
        </div>
      </div>
      <div class="link-to-form" @click="showForm">
        <div class="wrapper">
          <span class="circle">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                fill="#7C5DFA"
                fill-rule="nonzero"
              />
            </svg>
          </span>
          <span class="new">
            New
            <span class="hide-for-mobile">Invoice</span>
          </span>
        </div>
      </div>
    </header>
  </div>
</template>

<!-- LOGIC -->
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const showFilter = ref(false);

function toggleFilter() {
  showFilter.value = !showFilter.value;
}

function onCheck(filter) {
  store.dispatch("handleFilters", { filter: filter });
}

// COMPUTED

const invoicesCount = computed(() => store.getters.invoices.length);

const currentMode = computed(() => store.getters["layout/currentMode"]);

const filters = computed(() => store.getters["filters"]);

// Functions

function isChecked(filter) {
  return filters.value.includes(filter);
}

function showForm() {
  document.querySelector("body").setAttribute("class", "remove-scroll");
  store.dispatch("layout/showModals", { currentView: "invoice-form" });
}
</script>

<!-- STYLES -->
<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";
.invoice-header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 5rem;
  grid-template-rows: 1fr;
  grid-template-areas: "info filter link";
  .info {
    grid-area: info;
    p {
      font-style: normal;
      font-weight: bold;
      font-size: 1.111111rem;
      line-height: 1.222222rem;
      letter-spacing: -0.625px;
    }

    small {
      font-style: normal;
      font-weight: 500;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
    }
  }

  .filter {
    grid-area: filter;
    cursor: pointer;
    padding-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    span {
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
    }

    > svg {
      margin-left: 0.666666rem;
    }

    .dropdown {
      position: absolute;
      bottom: -135px; // a changer
      right: -2.222222rem;
      background-color: #fff;
      box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
      border-radius: 8px;
      width: 10.666666rem;
      height: 7.111111rem;
      padding: 1.333333rem;
      z-index: 99;
      .check {
        display: flex;
        .square {
          width: 0.888888rem;
          height: 0.888888rem;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          padding-top: 3px;
        }

        .value {
          margin-left: 0.722222rem;
        }

        .--checked {
          background-color: $violet-1 !important;
        }
      }

      .check:not(:last-child) {
        margin-bottom: 0.888888rem;
      }
    }
  }

  .link-to-form {
    grid-area: link;
    cursor: pointer;
    .wrapper {
      background-color: $violet-1;
      border-radius: 1.333333rem;
      padding: 0.333333rem;
      display: flex;
      align-items: center;
      &:hover {
        background-color: $violet-2;
      }
      .circle {
        width: 1.777777rem;
        height: 1.777777rem;
        border-radius: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .new {
        color: #fff;
        font-weight: bold;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        margin-left: 0.444444rem;
      }
    }
  }
}

.--light-mode {
  .info {
    p {
      color: $black-2;
    }

    small {
      color: $violet-gray;
    }
  }

  .filter {
    span {
      color: $black-2;
    }

    .dropdown {
      background-color: #fff;
      box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);

      .check {
        .square {
          background-color: $blue-gray-light;
        }

        &:hover {
          .square {
            border: 1px solid $violet-1;
          }
        }

        .--checked {
          background-color: $violet-1 !important;
        }
      }
    }
  }
}

.--dark-mode {
  .info {
    p {
      color: #fff;
    }

    small {
      color: $blue-gray-light;
    }
  }

  .filter {
    span {
      color: #fff;
    }

    .dropdown {
      background-color: $dark-blue;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);

      .check {
        .square {
          background-color: $black-1;
        }

        &:hover {
          .square {
            border: 1px solid $violet-1;
          }
        }

        .--checked {
          background-color: $violet-1 !important;
        }
      }
    }
  }
}

@media screen and (min-width: $tablet-min) {
  .invoice-header {
    display: grid;
    grid-template-columns: 1fr 1fr 8.333333rem; // ici
    grid-template-rows: 1fr;
    grid-template-areas: "info filter link";

    .info {
      grid-area: info;
      p {
        font-size: 1.777777rem;
        line-height: 1.944444rem;
        letter-spacing: -1px;
      }
    }

    .filter {
      grid-area: filter;
      padding-right: 2.222222rem;

      > svg {
        margin-left: 0.888888rem;
      }

      .dropdown {
        right: 0;
      }
    }

    .link-to-form {
      grid-area: link;

      .wrapper {
        padding: 0.444444rem;

        .new {
          margin-left: 0.888888rem;
        }
      }
    }
  }
}

@media screen and (min-width: $desktop-min) {
  .invoice-header {
    width: 40.555555rem; // 730px
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 8.333333rem; // ici
    grid-template-rows: 1fr;
    grid-template-areas: "info filter link";

    .info {
      grid-area: info;
    }

    .filter {
      grid-area: filter;
      padding-right: 2.252222rem;

      .dropdown {
        bottom: -7.5rem;
        right: 0;
      }
    }

    .link-to-form {
      grid-area: link;
    }
  }
}
</style>
