<template>
  <main>
    <InvoiceListHeader />
    <InvoiceList />
  </main>
</template>

<script setup>
import InvoiceListHeader from "../components/home/InvoiceListHeader.vue";
import InvoiceList from "../components/home/InvoiceList.vue";
</script>

<style lang="scss" scoped>
@import "../sass/breakpoints";
@import "../sass/colors";
@import "../sass/mixins";
@import "../sass/functions";
main {
  padding: toRem(32, 18) toRem(24, 18) 0 toRem(24, 18);
}

@include breakpoint-up(medium) {
  main {
    padding: toRem(56, 18) toRem(48, 18) 0 toRem(48, 18);
  }
}

@include breakpoint-up(large) {
  main {
    flex: 1;
    padding: toRem(72, 18) 0 0 0;
  }
}

/* @media screen and (min-width: $tablet-min) {
  main {
    padding: toRem(56, 18) toRem(48, 18) 0 toRem(48, 18);
  }
} */

/* @media screen and (min-width: $desktop-min) {
  main {
    flex: 1;
    padding: 4rem 0 0 0;
  }
} */
</style>
