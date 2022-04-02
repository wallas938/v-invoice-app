<template>
    <aside class="root">
        <div class="logo">
            <img :src="logo" alt="invoice app logo" />
        </div>
        <div class="modeBtn">
            <img :src="moonIcon" alt />
        </div>
        <!-- changer le contenu de l'attr alt dynamiquement -->
        <div class="picture">
            <img :src="picture" alt="user image" />
        </div>
    </aside>
</template>

<script setup>
/* Images */
import logo from '../../assets/logo.svg';
import moonIcon from '../../assets/icon-moon.svg';
import sunIcon from '../../assets/icon-sun.svg';
import picture from '../../assets/image-avatar.jpg';
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/colors";
.root {
    background-color: $black-4;
    display: grid;
    grid-template-columns: 4.333333rem 1fr 4.444444rem;
    grid-template-rows: 4rem;
    grid-template-areas: "logo modeBtn picture";

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
            z-index: 1;
            content: "";
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
        border-left: 1px solid #494E6E;
        img {
            width: 1.777777rem;
            height: 1.777777rem;
            border-radius: 100%;
        }
    }
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
            border-top: 1px solid #494E6E;
        }
    }
}
</style>