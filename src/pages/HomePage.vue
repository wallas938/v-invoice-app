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
@import "../sass/variables";
@import "../sass/colors";
main {
  padding: 1.777777rem 1.333333rem 0 1.333333rem;
}

@media screen and (min-width: $tablet-min) {
  main {
    padding: 3.111111rem 2.666666rem 0 2.666666rem;
  }
}

@media screen and (min-width: $desktop-min) {
  main {
    flex: 1;
    padding: 4rem 0 0 0;
  }
}
</style>
