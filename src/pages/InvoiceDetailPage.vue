<template>
  <div class="root">
    <div class="link">
      <router-link to="../">Go Back</router-link>
    </div>
    <div class="title">
      <v-container class="status-container">
        <div class="wrapper">
          <p>Status</p>
          <VStatusIndicator class="statusInd" :status="'Paid'" />
          <div class="cta hide-for-mobile">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="mark-as-paid">Mark as Paid</button>
          </div>
        </div>
      </v-container>
    </div>

    <v-container class="detail-container">
      <div class="detail">
        <div class="top-from-container">
          <div class="top">
            <p class="invoice-code"><span class="hash">#</span> XM9141</p>
            <p class="description">Graphic Design</p>
          </div>
          <div class="from">
            <p class="street">19 Union Terrace</p>
            <p class="city">London</p>
            <p class="post-code">E1 3EZ</p>
            <p class="country">United Kingdom</p>
          </div>
        </div>
        <div class="detail-grid-container">
          <div class="invoice-date">
            <p class="label">Invoice Date</p>
            <p class="date">21 Aug 2021</p>
          </div>
          <div class="bill-to">
            <p class="label">Bill To</p>
            <p class="name">Alex Grim</p>
            <p class="street">84 Church Way</p>
            <p class="city">Bradford</p>
            <p class="post-code">BD1 9PB</p>
            <p class="country">United Kingdom</p>
          </div>
          <div class="due">
            <p class="label">Payment Due</p>
            <p class="date">20 Sep 2021</p>
          </div>
          <div class="sent-to">
            <p class="label">Sent to</p>
            <p class="email">alexgrim@mail.com</p>
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
              <div class="item">
                <p class="name">Banner Design</p>
                <p class="qty">
                  1<span class="hide-for-tablet-and-desktop">x</span>
                  <span class="price hide-for-tablet-and-desktop"
                    >£ 156.00</span
                  >
                </p>
                <p class="price hide-for-mobile">£ 156.00</p>
                <p class="total">£ 156.00</p>
              </div>
              <div class="item">
                <p class="name">Email Design</p>
                <p class="qty">
                  2<span class="hide-for-tablet-and-desktop">x</span>
                  <span class="price hide-for-tablet-and-desktop"
                    >£ 200.00</span
                  >
                </p>
                <p class="price hide-for-mobile">£ 200.00</p>
                <p class="total">£ 400.00</p>
              </div>
            </div>
            <div class="footer">
              <p class="amount-due">Amount Due</p>
              <p class="big-total">£ 556.00</p>
            </div>
          </div>
        </div>
      </div>
    </v-container>

    <v-container class="mobile-cta-container hide-for-tablet-and-desktop">
      <div class="cta">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="mark-as-paid">Mark as Paid</button>
      </div>
    </v-container>
  </div>
</template>

<script setup>
/* const invoice = computed(() => store.getters.currentInvoice); */
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/colors";

.root {
  padding-top: 1.777777rem;

  .link {
    margin-bottom: 1.777777rem;
    padding: 0 1.333333rem;
    position: relative;
    a {
      font-style: normal;
      font-weight: bold;
      font-size: 0.666666rem;
      line-height: 0.833333rem;
      letter-spacing: -0.25px;
      color: $black-2;
      margin-left: 1.314444rem;
    }

    &::before {
      content: url("../assets/icon-arrow-left.svg");
      position: absolute;
      left: 1.333333rem;
    }
  }

  .status-container {
    padding: 1.333333rem; // 24px
    margin: 0 1.333333rem 0.888888rem 1.333333rem;
    > .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-style: normal;
        font-weight: 500;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        color: $ligth-violet;
      }
    }
  }

  .detail-container {
    padding: 1.333333rem 0; // 24px
    margin: 0 1.333333rem 3.111111rem 1.333333rem;
    .detail {
      .top {
        padding: 0 1.333333rem;
      }

      .top .invoice-code {
        font-weight: bold;
        font-style: normal;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        margin-bottom: 0.222222rem;
        .hash {
          color: $blue-violet; // used for dark and light mode !!!
        }
      }

      .top .description {
        font-weight: 500;
        font-style: normal;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
        margin-bottom: 1.666666rem; // 30px
        color: $ligth-violet;
        .hash {
          color: $blue-violet; // used for dark and light mode !!!
        }
      }

      .from {
        padding: 0 1.333333rem;
        font-weight: 500;
        font-style: normal;
        font-size: 0.611111rem;
        line-height: 1rem;
        letter-spacing: -0.23px;
        margin-bottom: 1.722222rem; // 31px
        color: $ligth-violet;
      }

      .detail-grid-container {
        padding: 0 1.333333rem;
        margin-bottom: 2.222222rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 2.611111rem 4.166666rem auto;
        grid-template-areas:
          "invoiceDate  billTo"
          "due          billTo"
          "sentTo       sentTo";

        .label {
          font-style: normal;
          font-weight: 500;
          font-size: 0.666666rem; //12px
          line-height: 0.833333rem; // 15px
          letter-spacing: -0.25px;
          color: $blue-violet;
        }

        .date {
          font-style: normal;
          font-weight: bold;
          font-size: 0.833333rem;
          line-height: 1.111111rem;
          letter-spacing: -0.3125px;
          color: $black-2;
        }

        .invoice-date {
          grid-area: invoiceDate;
          > .label {
            margin-bottom: 0.666666rem;
          }
        }
        .bill-to {
          font-style: normal;
          font-weight: 500;
          font-size: 0.611111rem; // 11px
          line-height: 1rem;
          letter-spacing: -0.229167px;
          color: $blue-violet;

          > .label {
            margin-bottom: 0.666666rem;
          }

          > .name {
            font-style: normal;
            font-weight: bold;
            font-size: 0.833333rem;
            line-height: 1.111111rem;
            letter-spacing: -0.3125px;
            color: $black-2;
            margin-bottom: 0.444444rem;
          }
        }
        .due {
          grid-area: due;
          padding-top: 1.777777rem; // 32px

          > .label {
            margin-bottom: 0.666666rem;
          }
        }
        .sent-to {
          grid-area: sentTo;
          padding-top: 2rem;

          > .label {
            margin-bottom: 0.666666rem;
          }

          .email {
            font-style: normal;
            font-weight: bold;
            font-size: 0.833333rem;
            line-height: 1.111111rem;
            letter-spacing: -0.3125px;
            color: $black-2;
          }
        }
      }
    }

    .resume-container {
      padding: 0 1.333333rem 0 1.333333rem;
      .body {
        border-radius: 0.444444rem 0.444444rem 0 0;
        overflow: hidden;
        background-color: $light-bg-2; // $light-bg-2
        padding: 1.333333rem;

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
            font-size: 0.666666rem;
            line-height: 0.833333rem;
            letter-spacing: -0.25px;
            color: $black-2;
            margin-bottom: 0.444444rem;
          }

          .qty {
            grid-area: qty;
            font-style: normal;
            font-weight: bold;
            font-size: 0.666666rem;
            line-height: 0.833333rem;
            letter-spacing: -0.25px;
            color: $ligth-violet;
          }

          .total {
            grid-area: total;
            display: flex;
            padding-top: 0.666666rem;
            justify-content: flex-end;
            font-style: normal;
            font-weight: bold;
            font-size: 0.666666rem;
            line-height: 0.833333rem;
            letter-spacing: -0.25px;
            color: $black-2;
          }
        }

        .item:not(:last-child) {
          margin-bottom: 1.333333rem;
        }
      }

      .footer {
        padding: 1.333333rem;
        background-color: $black-4;
        border-radius: 0 0 0.444444rem 0.444444rem;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .amount-due {
          font-style: normal;
          font-weight: 500;
          font-size: 0.611111rem; // 11px
          line-height: 1rem;
          letter-spacing: -0.229167px;
        }

        .big-total {
          font-style: normal;
          font-weight: 700;
          font-size: 1.111111rem;
          line-height: 1.777777rem;
          letter-spacing: -0.416667px;
        }
      }
    }
  }

  .mobile-cta-container {
    .cta {
      grid-area: cta;
      justify-self: flex-end;
      padding: 1.166666rem 1.333333rem 1.222222rem 1.333333rem;
      display: flex;
      justify-content: space-evenly;
      > button {
        border-radius: 1.333333rem;
        border: none;
        font-style: normal;
        font-weight: bold;
        font-size: 0.666666rem;
        line-height: 0.833333rem;
        letter-spacing: -0.25px;
      }

      > button:not(:last-child) {
        margin-right: 0.444444rem;
      }
      .edit {
        padding: 0.944444rem 1.277777rem 0.888888rem 1.333333rem;
      }
      .delete {
        padding: 0.944444rem 1.333333rem 0.888888rem 1.333333rem;
      }
      .mark-as-paid {
        padding: 0.944444rem 1.555555rem 0.888888rem 1.5rem;
      }
    }
  }
}

@media screen and (min-width: $tablet-min) {
  .root {
    padding: 2.666666rem 2.222222rem; // 48px 40px

    .status-container {
      padding: 1.111111rem 1.777777rem 1.111111rem 1.777777rem;
      margin: 0 0 1.333333rem 0;
      > .wrapper {
        display: grid;
        grid-template-columns: 3.0555555rem 5.833333rem 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: "label statusInd cta";
        justify-content: unset;
      }

      .cta {
        grid-area: cta;
        justify-self: flex-end;
        > button {
          border-radius: 1.333333rem;
          border: none;
          font-style: normal;
          font-weight: bold;
          font-size: 0.666666rem;
          line-height: 0.833333rem;
          letter-spacing: -0.25px;
        }

        > button:not(:last-child) {
          margin-right: 0.444444rem;
        }

        .edit {
          padding: 0.944444rem 1.277777rem 0.888888rem 1.333333rem;
        }
        .delete {
          padding: 0.944444rem 1.333333rem 0.888888rem 1.333333rem;
        }
        .mark-as-paid {
          padding: 0.944444rem 1.555555rem 0.888888rem 1.5rem;
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
      padding: 1.777777rem 0; // 32px
      margin: unset;
      .detail {
        .top-from-container {
          display: flex;
          justify-content: space-between;
          padding: 0 1.777777rem;
          margin-bottom: 1.166666rem;

          .top {
            padding: unset;
          }

          .top .description {
            margin-bottom: unset;
          }

          .top .invoice-code {
            font-size: 0.888888rem;
            line-height: 1rem;
            letter-spacing: -0.8px;
            margin-bottom: 0.444444rem;
          }

          .from {
            text-align: right;
            padding: unset;
            margin-bottom: unset;
          }
        }

        .detail-grid-container {
          padding: 0 1.777777rem;
          margin-bottom: 2.666666rem; // 48px
          display: grid;
          grid-template-columns: 10.888888rem 11.277777rem 1fr;
          grid-template-rows: 2.611111rem auto;
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
        padding: 0 1.333333rem 0 1.333333rem;
        .body {
          background-color: $light-bg-2; // $light-bg-2
          padding: 1.777777rem;

          .head {
            display: grid;
            grid-template-columns: 15.333333rem 1.611111rem 8.166666rem 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "head-name head-qty head-price head-total";
            margin-bottom: 1.777777rem;

            .head-name,
            .head-price,
            .head-qty,
            .head-total {
              font-style: normal;
              font-weight: 500;
              font-size: 0.666666rem;
              line-height: 0.8333333rem;
              letter-spacing: -0.25px;
              color: $blue-violet;
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
            grid-template-columns: 15.333333rem 1.611111rem 8.166666rem 1fr;
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
              font-size: 0.666666rem;
              line-height: 0.833333rem;
              letter-spacing: -0.25px;
              color: $black-2;
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
            margin-bottom: 1.333333rem;
          }
        }

        .footer {
          padding: 1.333333rem;
          background-color: $black-4;
          border-radius: 0 0 0.444444rem 0.444444rem;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .amount-due {
            font-style: normal;
            font-weight: 500;
            font-size: 0.611111rem; // 11px
            line-height: 1rem;
            letter-spacing: -0.229167px;
          }

          .big-total {
            font-style: normal;
            font-weight: 700;
            font-size: 1.111111rem;
            line-height: 1.777777rem;
            letter-spacing: -0.416667px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: $desktop-min) {
  .root {
    padding: 3.555555rem 0 3rem 0; // 64px
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 40.555555rem;
    margin: 0 auto;
    .status-container {
      > .wrapper {
        display: grid;
        grid-template-columns: 3.0555555rem 5.833333rem 1fr;
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
      padding: 2.666666rem; // 48px

      .detail {
        .top-from-container {
          display: flex;
          justify-content: space-between;
          padding: 0;
          margin-bottom: 1.166666rem;

          .top {
            padding: unset;
          }

          .top .description {
            margin-bottom: unset;
          }

          .top .invoice-code {
            font-size: 0.888888rem;
            line-height: 1rem;
            letter-spacing: -0.8px;
            margin-bottom: 0.444444rem;
          }

          .from {
            text-align: right;
            padding: unset;
            margin-bottom: unset;
          }
        }

        .detail-grid-container {
          padding: 0;
          margin-bottom: 2.666666rem; // 48px
          display: grid;
          grid-template-columns: 10.888888rem 11.277777rem 1fr;
          grid-template-rows: 2.611111rem auto;
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
          background-color: $light-bg-2; // $light-bg-2
          padding: 1.777777rem;

          .head {
            display: grid;
            grid-template-columns: 15.888888rem 1.611111rem 6.555555rem 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "head-name head-qty head-price head-total";
            margin-bottom: 1.777777rem;

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
            grid-template-columns: 15.888888rem 1.611111rem 6.555555rem 1fr;
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
            margin-bottom: 1.333333rem;
          }
        }

        .footer {
          padding: 1.333333rem;
          background-color: $black-4;
          border-radius: 0 0 0.444444rem 0.444444rem;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .amount-due {
            font-style: normal;
            font-weight: 500;
            font-size: 0.611111rem; // 11px
            line-height: 1rem;
            letter-spacing: -0.229167px;
          }

          .big-total {
            font-style: normal;
            font-weight: 700;
            font-size: 1.111111rem;
            line-height: 1.777777rem;
            letter-spacing: -0.416667px;
          }
        }
      }
    }
  }
}
</style>
