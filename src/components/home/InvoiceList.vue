<template>
  <div class="invoice-list">
    <div class="empty-list" v-if="isInvoicesEmpty">
      <img
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

    <div v-else>NO</div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import illustrationEmptyImage from "../../assets/illustration-empty.svg";

const invoices = ref([]);

const isInvoicesEmpty = computed(() => invoices.value.length === 0);
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
  }
}
</style>
