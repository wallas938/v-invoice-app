<template>
  <aside
    class="root"
    :class="{
      '--light-mode': currentMode === 'light',
      '--dark-mode': currentMode === 'dark',
    }"
  >
    <div class="logo">
      <img :src="logo" alt="invoice app logo" />
    </div>
    <div class="modeBtn" @click="toggleMode">
      <svg
        v-if="currentMode === 'light'"
        data-test="dark-icon"
        class="dark-icon"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z"
          fill="#7E88C3"
          fill-rule="nonzero"
        />
      </svg>
      <svg
        v-else
        data-test="light-icon"
        class="light-icon"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
          fill="#858BB2"
          fill-rule="nonzero"
        />
      </svg>
    </div>
    <div class="picture">
      <img :src="picture" alt="user image" />
    </div>
  </aside>
</template>

<script setup>
/* Images */
import logo from "../../assets/logo.svg";
import picture from "../../assets/image-avatar.jpg";
import { ref, computed } from "vue";
import { useStore } from "vuex";

// STORE
const store = useStore();

const currentMode = computed(() => store.getters["layout/currentMode"]);

// COMPUTED

// FUNCTIONS
function toggleMode() {
  if (currentMode.value === "light") {
    store.dispatch("layout/changeMode", { currentMode: "dark" });
    return;
  }
  store.dispatch("layout/changeMode", { currentMode: "light" });
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";

.root {
  display: grid;
  grid-template-columns: 4.333333rem 1fr 4.444444rem;
  grid-template-rows: 4rem;
  grid-template-areas: "logo modeBtn picture";
  transition: all 650ms ease-in-out;

  .logo {
    grid-area: logo;
    position: relative;
    height: 100%;
    width: 4rem;
    background-color: $violet-1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 20px 20px 0px;

    img {
      width: 1.555555rem;
      height: 1.532222rem;
      z-index: 5;
      position: absolute;
    }

    &::before {
      z-index: 1;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background-color: $violet-1;
      border-radius: 0px 20px 0px 0px;
    }

    &::after {
      content: "";
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50%;
      background-color: $violet-2;
      border-radius: 20px 0px 20px 0px;
    }
  }

  .modeBtn {
    grid-area: modeBtn;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1.333333rem;
    cursor: pointer;

    svg.dark-icon:hover {
      & > path {
        fill: #858bb2;
      }
    }

    svg.light-icon:hover {
      & > path {
        fill: $blue-violet;
      }
    }

    img {
      width: 1.111111rem;
      height: 1.111111rem;
    }
  }

  .picture {
    grid-area: picture;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #494e6e;
    img {
      width: 1.777777rem;
      height: 1.777777rem;
      border-radius: 100%;
    }
  }
}

.--light-mode {
  background-color: $black-4;
}

.--dark-mode {
  background-color: $black-1;
}

@media screen and (min-width: $tablet-min) {
  .root {
    display: grid;
    grid-template-columns: 4.444444rem 1fr 5.333333rem;
    grid-template-rows: 4.444444rem;
    grid-template-areas: "logo modeBtn picture";

    .logo {
      grid-area: logo;
      width: 4.444444rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0px 20px 20px 0px;

      img {
        width: 1.722222rem;
        height: 1.722222rem;
      }
    }

    .modeBtn {
      grid-area: modeBtn;
      padding-right: 1.777777rem;
    }

    .picture {
      grid-area: picture;
    }
  }
}

@media screen and (min-width: $desktop-min) {
  .root {
    display: grid;
    grid-template-columns: 5.722222rem;
    grid-template-rows: 5.722222rem 1fr 4.888888rem;
    grid-template-areas:
      "logo"
      "modeBtn"
      "picture";
    border-radius: 0px 20px 20px 0px;
    .logo {
      grid-area: logo;
      width: 100%;
      height: 5.722222rem;
      display: flex;
      flex-direction: column;

      img {
        width: 2.222222rem;
        height: 2.222222rem;
      }
    }

    .modeBtn {
      grid-area: modeBtn;
      flex-direction: column;
      padding-bottom: 1.777777rem;
      padding-right: unset;
    }

    .picture {
      grid-area: picture;
      width: 100%;
      height: 4.888888rem;
      border-left: unset;
      border-top: 1px solid #494e6e;
    }
  }
}
</style>
