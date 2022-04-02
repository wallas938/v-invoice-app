<script setup>
</script>

<template>
    <div class="root v-invoice-app">
        <TheHeader />
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
@import "sass/variables";
@media screen and (min-width: $desktop-min) {
    .root {
        display: flex;
        height: 100%;
    }
}
</style>
