<template>
  <div
    id="invoiceForm"
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
    <h1 v-if="currentInvoice">
      Edit<span
        :style="{
          color: '#888eb0',
        }"
        >#</span
      >{{ currentInvoice.invoiceCode }}
    </h1>
    <h1 v-else>New Invoice</h1>
    <form>
      <div class="group from">
        <p class="group__title">Bill From</p>
        <div class="from__fields">
          <div class="field from__street">
            <label
              class="label"
              for="f-str"
              :class="{
                '--label-error':
                  v$.from.street.$invalid && v$.from.street.$dirty,
              }"
              >Street Address</label
            >
            <input
              type="text"
              ref="streetInput"
              @blur="v$.from.street.$touch"
              :class="{
                '--input-error':
                  v$.from.street.$invalid && v$.from.street.$dirty,
              }"
              v-model.trim="formData.from.street"
            />
            <small
              class="error-msg"
              v-if="v$.from.street.$invalid && v$.from.street.$dirty"
              >Can't be empty</small
            >
          </div>
          <div class="field from__city">
            <label
              class="label"
              for="f-city"
              :class="{
                '--label-error': v$.from.city.$invalid && v$.from.city.$dirty,
              }"
              >City</label
            >
            <input
              type="text"
              @blur="v$.from.city.$touch"
              :class="{
                '--input-error': v$.from.city.$invalid && v$.from.city.$dirty,
              }"
              v-model.trim="formData.from.city"
            />
            <small
              class="error-msg"
              v-if="v$.from.city.$invalid && v$.from.city.$dirty"
              >Can't be empty</small
            >
          </div>
          <div class="field from__psc">
            <label
              class="label"
              for="f-psc"
              :class="{
                '--label-error':
                  v$.from.postCode.$invalid && v$.from.postCode.$dirty,
              }"
              >Post Code</label
            >
            <input
              type="text"
              @blur="v$.from.postCode.$touch"
              :class="{
                '--input-error':
                  v$.from.postCode.$invalid && v$.from.postCode.$dirty,
              }"
              v-model.trim="formData.from.postCode"
            />
            <small
              class="error-msg"
              v-if="v$.from.postCode.$invalid && v$.from.postCode.$dirty"
              >Can't be empty</small
            >
          </div>
          <div class="field from__ctry">
            <label
              class="label"
              for="f-ctry"
              :class="{
                '--label-error':
                  v$.from.country.$invalid && v$.from.country.$dirty,
              }"
              >Country</label
            >
            <input
              type="text"
              v-model.trim="formData.from.country"
              @blur="v$.from.country.$touch"
              :class="{
                '--input-error':
                  v$.from.country.$invalid && v$.from.country.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.from.country.$invalid && v$.from.country.$dirty"
              >Can't be empty</small
            >
          </div>
        </div>
      </div>
      <div class="group to">
        <p class="group__title">Bill To</p>
        <div class="to__fields">
          <div class="field to__clt-name">
            <label
              class="label"
              for="t-clt-name"
              :class="{
                '--label-error':
                  v$.to.clientName.$invalid && v$.to.clientName.$dirty,
              }"
              >Client’s Name</label
            >
            <input
              type="text"
              v-model.trim="formData.to.clientName"
              @blur="v$.to.clientName.$touch"
              :class="{
                '--input-error':
                  v$.to.clientName.$invalid && v$.to.clientName.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.clientName.$invalid && v$.to.clientName.$dirty"
              >Can't be empty</small
            >
          </div>
          <div class="field to__email">
            <label
              class="label"
              for="t-email"
              :class="{
                '--label-error':
                  v$.to.clientEmail.$invalid && v$.to.clientEmail.$dirty,
              }"
              >Client’s Email</label
            >
            <input
              type="text"
              v-model.trim="formData.to.clientEmail"
              @blur="v$.to.clientEmail.$touch"
              :class="{
                '--input-error':
                  v$.to.clientEmail.$invalid && v$.to.clientEmail.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.clientEmail.$invalid && v$.to.clientEmail.$dirty"
              >Wrong Input</small
            >
          </div>
          <div class="field to__str">
            <label
              class="label"
              for="t-str"
              :class="{
                '--label-error': v$.to.street.$invalid && v$.to.street.$dirty,
              }"
              >Street Address</label
            >
            <input
              type="text"
              v-model.trim="formData.to.street"
              @blur="v$.to.street.$touch"
              :class="{
                '--input-error': v$.to.street.$invalid && v$.to.street.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.street.$invalid && v$.to.street.$dirty"
              >Wrong Input</small
            >
          </div>
          <div class="field to__city">
            <label
              class="label"
              for="t-city"
              :class="{
                '--label-error': v$.to.city.$invalid && v$.to.city.$dirty,
              }"
              >City</label
            >
            <input
              type="text"
              v-model.trim="formData.to.city"
              @blur="v$.to.city.$touch"
              :class="{
                '--input-error': v$.to.city.$invalid && v$.to.city.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.city.$invalid && v$.to.city.$dirty"
              >Wrong Input</small
            >
          </div>
          <div class="field to__psc">
            <label
              class="label"
              for="t-psc"
              :class="{
                '--label-error':
                  v$.to.postCode.$invalid && v$.to.postCode.$dirty,
              }"
              >Post Code</label
            >
            <input
              type="text"
              v-model.trim="formData.to.postCode"
              @blur="v$.to.postCode.$touch"
              :class="{
                '--input-error':
                  v$.to.postCode.$invalid && v$.to.postCode.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.postCode.$invalid && v$.to.postCode.$dirty"
              >Wrong Input</small
            >
          </div>
          <div class="field to__ctry">
            <label
              class="label"
              for="t-ctry"
              :class="{
                '--label-error': v$.to.country.$invalid && v$.to.country.$dirty,
              }"
              >Country</label
            >
            <input
              type="text"
              v-model.trim="formData.to.country"
              @blur="v$.to.country.$touch"
              :class="{
                '--input-error': v$.to.country.$invalid && v$.to.country.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="v$.to.country.$invalid && v$.to.country.$dirty"
              >Wrong Input</small
            >
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
              Net
              {{
                formData.invoice.terms > 1
                  ? formData.invoice.terms + " Days"
                  : formData.invoice.terms + " Day"
              }}
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
            <label
              class="label"
              for="inv-desc"
              :class="{
                '--label-error':
                  v$.invoice.description.$invalid &&
                  v$.invoice.description.$dirty,
              }"
              >Project Description</label
            >
            <input
              type="text"
              v-model.trim="formData.invoice.description"
              @blur="v$.invoice.description.$touch"
              :class="{
                '--input-error':
                  v$.invoice.description.$invalid &&
                  v$.invoice.description.$dirty,
              }"
            />
            <small
              class="error-msg"
              v-if="
                v$.invoice.description.$invalid && v$.invoice.description.$dirty
              "
              >Wrong Input</small
            >
          </div>
        </div>
      </div>
      <div class="group item-list">
        <h2>Item List</h2>
        <div class="col-names hide-for-mobile">
          <label class="col-name">Item Name</label>
          <label class="col-qty">Qty.</label>
          <label class="col-price">Price</label>
          <label class="col-total">Total</label>
        </div>
        <transition-group name="item">
          <div
            v-for="(item, index) in itemFields"
            :key="index"
            class="item item__fields"
          >
            <div class="field item__name">
              <label class="label hide-for-tablet-and-desktop" for="item-name"
                >Item Name</label
              >
              <input
                type="text"
                :class="{
                  '--input-error': item.itemName.status === 'invalid',
                }"
                :value="item.itemName.value"
                @input="itemInputHandler($event, index, 'itemName')"
              />
            </div>
            <div class="field item__qty">
              <label class="label hide-for-tablet-and-desktop" for="item-qty"
                >Qty.</label
              >
              <input
                type="text"
                :value="item.quantity.value"
                :class="{
                  '--input-error': item.quantity.status === 'invalid',
                }"
                @input="itemInputHandler($event, index, 'quantity')"
              />
            </div>
            <div class="field item__price">
              <label class="label hide-for-tablet-and-desktop" for="item-price"
                >Price</label
              >
              <!-- @blur="formatNumber(item.price.value, index)" -->
              <input
                type="text"
                :value="item.price.value"
                :class="{
                  '--input-error': item.price.status === 'invalid',
                }"
                @input="itemInputHandler($event, index, 'price')"
              />
            </div>
            <div class="field item__total">
              <label class="label hide-for-tablet-and-desktop" for="item-total"
                >Total</label
              >
              <input
                type="text"
                tabindex="-1"
                :value="computeTotal(item.price.value, item.quantity.value)"
              />
            </div>
            <div class="field item__remove" @click="removeItem(index)">
              <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                  fill="#888EB0"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
          </div>
        </transition-group>
        <div class="item-cta">
          <button type="button" @click="addItem">+ Add New Item</button>
        </div>
      </div>
      <div class="form-error-alert">
        <small v-if="v$.$invalid">- All fields must be added</small>
        <small v-if="isFormItemPartIsInvalid">- An item must be added</small>
      </div>
      <div
        class="form-cta"
        :class="{
          'form-cta--new': !form_mode_is_edit,
          'form-cta--edit': form_mode_is_edit,
        }"
      >
        <div
          class="cell"
          :class="{
            'cancel-cell--edit': form_mode_is_edit,
            'cancel-cell': !form_mode_is_edit,
          }"
        >
          <button type="button" class="cancel" @click="closeForm">
            {{ !form_mode_is_edit ? "Discard" : "Cancel" }}
          </button>
        </div>
        <div
          v-if="!form_mode_is_edit"
          class="cell"
          :class="{
            'draft-cell--edit': form_mode_is_edit,
            'draft-cell': !form_mode_is_edit,
          }"
        >
          <button type="button" class="draft" @click="saveAsDraft">
            Save as Draft
          </button>
        </div>
        <div
          class="cell"
          :class="{
            'save-cell--edit': form_mode_is_edit,
            'save-cell': !form_mode_is_edit,
          }"
        >
          <!-- :disabled="!isFormIsValid" -->
          <button
            type="button"
            class="save"
            :disabled="!isFormIsValid"
            @click="submitForm"
          >
            {{ !form_mode_is_edit ? "Save & Send" : "Save Changes" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toNumber } from "@vue/shared";
const store = useStore();
const router = useRouter();

// Form Datas
const formData = ref({
  from: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  to: {
    clientName: "",
    clientEmail: "",
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  invoice: {
    date: formatDate(Date.now()),
    terms: 30,
    description: "",
  },
});

const rules = {
  from: {
    street: { required },
    city: { required },
    postCode: { required },
    country: { required },
  },
  to: {
    clientName: { required },
    clientEmail: { required, email },
    street: { required },
    city: { required },
    postCode: { required },
    country: { required },
  },
  invoice: {
    date: { required },
    terms: { required },
    description: { required },
  },
};

let itemFields = ref([
  {
    itemName: {
      value: "",
      status: "pending",
      dirty: false,
    },
    quantity: {
      value: "",
      status: "pending",
      dirty: false,
    },
    price: {
      value: (0).toFixed(2),
      status: "pending",
      dirty: false,
    },
  },
]);

// Datas

const v$ = useVuelidate(rules, formData);
const invoiceForm = ref(null);

const invoiceDateInput = ref(null);
const streetInput = ref(null);
const invoiceDateValue = ref(formatDate(Date.now()));
const isTermsDisplayed = ref(false);

// Computed

const currentMode = computed(() => store.getters["layout/currentMode"]);

const isFormItemPartIsInvalid = computed(() => {
  return itemFields.value.some((field) => {
    for (let prop in field) {
      if (
        field[prop].status === "invalid" ||
        field[prop].status === "pending"
      ) {
        return true;
      }
    }
  });
});

const isFormIsValid = computed(() => {
  if (isFormItemPartIsInvalid.value || v$.value.$invalid) return false;
  return true;
});

const currentInvoice = computed(() => store.getters.invoice);

const form_mode_is_edit = computed(
  () => store.getters["layout/form_mode_is_edit"]
);

// Lifecycle Hooks
onMounted(() => {
  streetInput.value.focus();
  if (currentInvoice.value) {
    initFormValue();
  }
});

// Functions

function saveAsDraft() {
  const data = {
    invoiceCode: form_mode_is_edit.value
      ? currentInvoice.value.invoiceCode
      : generateInvoiceIndentifier(),
    fromStreet: v$.value.from.street.$invalid
      ? "---"
      : formData.value.from.street,
    fromCity: v$.value.from.city.$invalid ? "---" : formData.value.from.city,
    fromPostCode: v$.value.from.postCode.$invalid
      ? "---"
      : formData.value.from.postCode,
    fromCountry: v$.value.from.country.$invalid
      ? "---"
      : formData.value.from.country,
    clientName: v$.value.to.clientName.$invalid
      ? "---"
      : formData.value.to.clientName,
    email: v$.value.to.clientEmail.$invalid
      ? "---"
      : formData.value.to.clientEmail,
    toStreet: v$.value.to.street.$invalid ? "---" : formData.value.to.street,
    toCity: v$.value.to.city.$invalid ? "---" : formData.value.to.city,
    toPostCode: v$.value.to.postCode.$invalid
      ? "---"
      : formData.value.to.postCode,
    toCountry: v$.value.from.street.$invalid
      ? "---"
      : formData.value.to.country,
    invoiceDate: formData.value.invoice.date,
    status: "Draft",
    due: formData.value.invoice.terms,
    desc: v$.value.invoice.description.$invalid
      ? ""
      : formData.value.invoice.description,
    items: itemFields.value.map((item, index) => {
      return {
        itemName:
          itemFields.value[index].itemName.status === "pending" ||
          itemFields.value[index].itemName.status === "invalid"
            ? "A name is missing"
            : item.itemName.value,
        quantity:
          itemFields.value[index].quantity.status === "pending" ||
          itemFields.value[index].quantity.status === "invalid"
            ? 0
            : item.quantity.value,
        price:
          itemFields.value[index].price.status === "pending" ||
          itemFields.value[index].price.status === "invalid"
            ? 0
            : toNumber(item.price.value).toFixed(2),
        total: +item.price.value * +item.quantity.value,
      };
    }),
    totalAmount: `£ ${toDollarsCurrency(computeBigTotal(itemFields.value))}`,
  };

  store.dispatch("addInvoice", { invoice: data }).then(() => {
    store.dispatch("setCurrentInvoice", { invoiceCode: data.invoiceCode });
    document.querySelector("body").setAttribute("class", "");
    router.push("/invoices/" + data.invoiceCode);
    store.dispatch("layout/showModals", { currentView: "" });
  });
}

function submitForm() {
  if (isFormItemPartIsInvalid.value || v$.value.$invalid) return;

  const data = {
    invoiceCode: form_mode_is_edit.value
      ? currentInvoice.value.invoiceCode
      : generateInvoiceIndentifier(),
    fromStreet: formData.value.from.street,
    fromCity: formData.value.from.city,
    fromPostCode: formData.value.from.postCode,
    fromCountry: formData.value.from.country,
    clientName: formData.value.to.clientName,
    email: formData.value.to.clientEmail,
    toStreet: formData.value.to.street,
    toCity: formData.value.to.city,
    toPostCode: formData.value.to.postCode,
    toCountry: formData.value.to.country,
    invoiceDate: formData.value.invoice.date,
    status: "Pending",
    due: formData.value.invoice.terms,
    desc: formData.value.invoice.description,
    items: itemFields.value.map((item) => {
      return {
        itemName: item.itemName.value,
        quantity: item.quantity.value,
        price: toNumber(item.price.value).toFixed(2),
        total: (+item.price.value * +item.quantity.value).toFixed(2),
      };
    }),
    totalAmount: `£ ${toDollarsCurrency(computeBigTotal(itemFields.value))}`,
  };

  store.dispatch("addInvoice", { invoice: data }).then(() => {
    store.dispatch("setCurrentInvoice", { invoiceCode: data.invoiceCode });
    document.querySelector("body").setAttribute("class", "");
    router.push("/invoices/" + data.invoiceCode);
    store.dispatch("layout/showModals", { currentView: "" });
  });
}

function initFormValue() {
  formData.value = {
    from: {
      street: currentInvoice.value.fromStreet,
      city: currentInvoice.value.fromCity,
      postCode: currentInvoice.value.fromPostCode,
      country: currentInvoice.value.fromCountry,
    },
    to: {
      clientName: currentInvoice.value.clientName,
      clientEmail: currentInvoice.value.email,
      street: currentInvoice.value.toStreet,
      city: currentInvoice.value.toCity,
      postCode: currentInvoice.value.toPostCode,
      country: currentInvoice.value.toCountry,
    },
    invoice: {
      date: currentInvoice.value.invoiceDate,
      terms: currentInvoice.value.due,
      description: currentInvoice.value.desc,
    },
  };

  itemFields.value = currentInvoice.value.items.map((item) => {
    return {
      itemName: {
        value: item.itemName,
        status: "valid",
        dirty: false,
      },
      quantity: {
        value: item.quantity,
        status: "valid",
        dirty: false,
      },
      price: {
        value: item.price,
        status: "valid",
        dirty: false,
      },
    };
  });
}

function checkItemInput(value, index, fieldName) {
  itemFields.value = itemFields.value.map((item, i) => {
    if (i !== index) return item;

    switch (fieldName) {
      case "itemName":
        value.trim() === ""
          ? (item["itemName"].status = "invalid")
          : (item["itemName"].status = "valid");

        /* item["itemName"].dirty = true; */

        return item;

      default:
        value.trim() === "" || isNaN(value) || value <= 0
          ? (item[fieldName].status = "invalid")
          : (item[fieldName].status = "valid");

        /* item[fieldName].dirty = true; */
        return item;
    }
  });
}

// GERER LES INPUTS
function itemInputHandler(event, index, fieldName) {
  checkItemInput(event.target.value, index, fieldName);

  itemFields.value = itemFields.value.map((item, i) => {
    if (i === index) {
      item[fieldName].value = event.target.value;
      return item;
    }
    return item;
  });
}

// AJOUTER UN ITEM AU FORMULAIRE
function addItem() {
  itemFields.value.push({
    itemName: {
      value: "",
      status: "pending",
      dirty: false,
    },
    quantity: {
      value: "",
      status: "pending",
      dirty: false,
    },
    price: {
      value: "",
      status: "pending",
      dirty: false,
    },
  });
}

// RETIRER UN ITEM AU FORMULAIRE
function removeItem(index) {
  if (itemFields.value.length === 1) return; // Toujours laisser au moins un item
  itemFields.value = itemFields.value.filter((item, i) => {
    return i !== index;
  });
}

function setInvoiceDate() {
  if (invoiceDateInput.value) {
    invoiceDateValue.value = formatDate(invoiceDateInput.value.value);
    formData.value.invoice.date = formatDate(invoiceDateInput.value.value);
  }
}

function computeTotal(price, quantity) {
  if (!price || !quantity) return (0).toFixed(2);

  return isNaN(+price * +quantity)
    ? (0).toFixed(2)
    : (+price * +quantity).toFixed(2);
}

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
      formData.value.invoice.terms = 1;
      return;
    case "7-day":
      formData.value.invoice.terms = 7;
      return;
    case "14-day":
      formData.value.invoice.terms = 14;
      return;
    case "30-day":
      formData.value.invoice.terms = 30;
      return;

    default:
      formData.value.invoice.terms = 30;
      return;
  }
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

function generateInvoiceIndentifier() {
  const letter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const letter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${letter1}${letter2}${Math.floor(Math.random() * 9)}${Math.floor(
    Math.random() * 9
  )}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
}

function computeBigTotal(items) {
  let bigTotal = 0;
  items.forEach((item) => {
    bigTotal += +item.price.value * +item.quantity.value;
  });

  return isNaN(bigTotal) ? 0 : bigTotal;
}

function toDollarsCurrency(value) {
  if (isNaN(+value)) return;
  const num = value.toFixed(2);
  if (num.includes(".")) {
    let dotIndex = num.indexOf(".");
    const entiers = num.substring(0, dotIndex);
    let arr = entiers.split("");
    if (entiers.length >= 10) {
      arr.splice(-3, 0, ",");
      arr.splice(-7, 0, ",");
      arr.splice(-10, 0, ",");
      return arr.join("") + num.substring(dotIndex);
    } else if (entiers.length >= 7) {
      arr.splice(-3, 0, ",");
      arr.splice(-7, 0, ",");
      return arr.join("") + num.substring(dotIndex);
    } else if (entiers.length >= 4) {
      arr.splice(-3, 0, ",");
      return arr.join("") + num.substring(dotIndex);
    } else {
      return arr.join("") + num.substring(dotIndex);
    }
  }

  return num;
}
</script>
<style lang="scss" scoped>
@import "../../sass/breakpoints";
@import "../../sass/colors";
@import "../../sass/mixins";
@import "../../sass/functions";
.root {
  position: relative;
  z-index: 2;
  padding-top: toRem(32, 18);

  .back {
    padding: 0 toRem(24, 18);
    position: relative;
    margin-bottom: toRem(24, 18);
    a {
      font-style: normal;
      font-weight: bold;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      margin-left: toRem(23.66, 18);
    }

    &::before {
      content: url("../../assets/icon-arrow-left.svg");
      position: absolute;
      left: toRem(24, 18);
    }
  }

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: toRem(24, 18);
    line-height: toRem(32, 18);
    letter-spacing: -0.5px;
    padding-left: toRem(24, 18);
    margin-bottom: toRem(24, 18);
  }

  .group {
    padding: 0 toRem(24, 18);

    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      margin-bottom: toRem(24, 18);
    }

    label {
      font-style: normal;
      font-weight: 500;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      margin-bottom: toRem(10, 18);
    }

    .--label-error {
      color: $red;
    }

    input,
    .inv-date-wrapper,
    .select-wrapper {
      padding: toRem(17, 18) 0 toRem(16, 18) toRem(20, 18);
      font-style: normal;
      font-weight: bold;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
      border-radius: toRem(4, 18);
      width: 100%;
    }

    .--input-error {
      border: 1px solid $red !important;
    }

    .field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
    }

    .error-msg {
      position: absolute;
      top: 0;
      right: 0;
      color: $red;
      font-style: normal;
      font-weight: 600;
      font-size: toRem(10, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.208333px;
    }
  }

  .from,
  .to,
  .invoice {
    .field:not(:last-child) {
      margin-bottom: toRem(24, 18);
    }
  }

  .from {
    margin-bottom: toRem(40, 18);
    .from__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, auto);
      column-gap: toRem(23, 18);
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
    margin-bottom: toRem(40, 18);
    .to__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, auto);
      column-gap: toRem(23, 18);
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
    margin-bottom: toRem(66, 18);
    .date {
      .inv-date-wrapper {
        height: toRem(48, 18);
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
        right: toRem(16, 18);
      }
    }

    .terms {
      .select-wrapper {
        height: toRem(48, 18);
        position: relative;
        cursor: pointer;
      }

      .select-wrapper::after {
        content: url("../../assets/icon-arrow-down.svg");
        position: absolute;
        right: toRem(15.64, 18); // 15.64px
      }

      .select-wrapper > .options {
        position: absolute;
        top: toRem(48, 18) + toRem(8, 18);
        left: 0;
        background: #ffffff;
        box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
        border-radius: toRem(8, 18);
        width: 100%;
        z-index: 5;
      }

      .select-wrapper > .options > .day {
        font-style: normal;
        font-weight: bold;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
        padding: toRem(15, 18) 0 toRem(16, 18) toRem(24, 18);
      }
    }
  }

  .item-list {
    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: toRem(32, 18);
      letter-spacing: -0.375px;
      margin-bottom: toRem(24, 18);
    }

    .item__fields {
      display: grid;
      margin-bottom: toRem(48, 18);
      grid-template-columns: toRem(64, 18) auto auto 1fr;
      grid-template-rows: repeat(2, auto);
      column-gap: toRem(23, 18);
      grid-template-areas:
        "name  name  name  name"
        "qty   price total cta";

      .item__name {
        grid-area: name;
        margin-bottom: toRem(24, 18);
      }

      .item__name > label {
        margin-bottom: toRem(16, 18);
      }
      .item__qty {
        grid-area: qty;
      }
      .item__price {
        grid-area: price;
        min-width: toRem(100, 18); //100px
      }
      .item__total {
        grid-area: total;
        min-width: 56px;
        & > input {
          border: none;
          padding-left: 0;
          pointer-events: none;
          background-color: transparent;
        }
      }
      .item__remove {
        grid-area: cta;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-top: toRem(39, 18); // 39px
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
    margin-bottom: toRem(24, 18);
    & > button {
      border: none;
      border-radius: toRem(24, 18);
      width: 100%;
      padding: toRem(17, 18) 0 toRem(16, 18) 0;
      font-style: normal;
      font-weight: bold;
      font-size: toRem(12, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.25px;
    }
  }

  .form-error-alert {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: toRem(24, 18);
    padding: 0 toRem(24, 18);
    small {
      font-style: normal;
      font-weight: 600;
      font-size: toRem(10, 18);
      line-height: toRem(15, 18);
      letter-spacing: -0.208333px;
      color: $red;
    }
  }

  .form-cta {
    bottom: 0;
    padding: toRem(21, 18) toRem(24, 18) toRem(22, 18) 0;
    .cell {
      > button {
        border-radius: toRem(24, 18);
        font-style: normal;
        font-weight: bold;
        font-size: toRem(12, 18);
        line-height: toRem(15, 18);
        letter-spacing: -0.25px;
        border: none;
      }
    }

    .cancel-cell {
      grid-area: cancel;

      > button {
        padding: toRem(17, 18) toRem(26.5, 18) toRem(16, 18) toRem(25.5, 18);
      }
    }
    .draft-cell {
      grid-area: draft;
      > button {
        padding: toRem(17, 18) toRem(15.9, 18) toRem(16, 18) toRem(16.11, 18);
      }
    }
    .save-cell {
      grid-area: save;
      > button {
        padding: toRem(17, 18) toRem(16, 18) toRem(16, 18) toRem(16, 18);
      }
    }

    .cancel-cell--edit {
      grid-area: cancel;

      > button {
        padding: toRem(17, 18) toRem(26.5, 18) toRem(16, 18) toRem(25.5, 18);
      }
    }
    .draft-cell--edit {
      grid-area: draft;
      > button {
        padding: toRem(17, 18) toRem(15.9, 18) toRem(16, 18) toRem(16.11, 18);
      }
    }
    .save-cell--edit {
      grid-area: save;
      > button {
        padding: toRem(17, 18) toRem(24, 18) toRem(16, 18) toRem(24, 18);
      }
    }
  }
  .form-cta--new {
    display: grid;
    column-gap: toRem(7, 18);
    grid-template-rows: 1fr;
    justify-content: flex-end;
    grid-template-columns: repeat(3, auto);
    grid-template-areas: "cancel draft save";
  }

  .form-cta--edit {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .cancel-cell--edit {
      padding-right: toRem(8, 18);
    }
  }
}

.--light-mode {
  background-image: linear-gradient(
    180deg,
    rgba(#fff, 1) 75%,
    rgba(#ccc, 1) 100%
  );

  h1 {
    color: $black-2;
  }

  .group {
    &__title {
      color: $violet-1;
    }

    label {
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

    .item__fields {
      .item__total > input {
        color: $violet-gray;
      }
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

  .form-cta {
    background-color: #fff;

    .cancel-cell,
    .cancel-cell--edit {
      > button {
        background-color: $light-bg-2;
        color: $blue-violet;
      }
      > button:hover {
        background-color: $blue-gray-light;
        color: $blue-violet;
      }
    }
    .draft-cell,
    .draft-cell--edit {
      > button {
        background-color: $black-4;
        color: $violet-gray;
      }
      > button:hover {
        background-color: $black-2;
      }
    }
    .save-cell,
    .save-cell--edit {
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
  background-image: linear-gradient(
    180deg,
    rgba($black-3, 1) 80%,
    rgba(0, 0, 0, 1) 100%
  );

  /*   background-image: linear-gradient(180deg, $black-3 75%, rgba(#000, 1) 100%);
 */
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

    label {
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
        background-color: $black-3;
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

  .form-cta {
    background-color: $black-3;
    .cancel-cell,
    .cancel-cell--edit {
      > button {
        background-color: $dark-blue;
        color: $blue-gray-light;
      }
      > button:hover {
        background-color: #fff;
      }
    }
    .draft-cell,
    .draft-cell--edit {
      > button {
        background-color: $black-4;
        color: $blue-gray-light;
      }
      > button:hover {
        background-color: $black-1;
      }
    }
    .save-cell,
    .save-cell--edit {
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

.item-enter-active,
.item-leave-active {
  transition: all 0.5s ease-in-out;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
}

@include breakpoint-up(medium) {
  .root {
    padding-top: toRem(56, 18); // 56 px
    width: toRem(616, 18); // 616px
    border-radius: 0 toRem(20, 18) toRem(20, 18) 0;

    form {
      position: relative;
      overflow-y: auto;
      height: 80vh;
    }
    h1 {
      padding-left: toRem(56, 18);
      margin-bottom: toRem(48, 18);
    }

    .group {
      padding: 0 toRem(56, 18);
    }

    .from,
    .to {
      margin-bottom: toRem(48, 18);
    }

    .from {
      .from__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
        column-gap: toRem(24, 18);
        grid-template-areas:
          "f-str f-str f-str"
          "f-city f-psc f-ctry";

        .from__street {
          grid-area: f-str;
        }

        .from__city {
          grid-area: f-city;
          margin-bottom: 0;
        }

        .from__psc {
          grid-area: f-psc;
          margin-bottom: 0;
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
        grid-template-rows: repeat(4, auto);
        column-gap: toRem(24, 18);
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
          margin-bottom: 0;
        }

        .to__psc {
          grid-area: t-psc;
          margin-bottom: 0;
        }

        .to__ctry {
          grid-area: t-ctry;
        }
      }
    }

    .invoice {
      margin-bottom: toRem(24, 18);
      > .invoice__fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
        column-gap: toRem(24, 18);
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
      .col-names {
        display: grid;
        margin-bottom: toRem(16, 18);
        grid-template-columns: toRem(214, 18) auto auto 1fr;
        grid-template-rows: 1fr;
        column-gap: toRem(16, 18);
        justify-content: flex-start;
        grid-template-areas: "col-name  col-qty  col-price  col-total";

        .col-name {
          grid-area: col-name;
        }
        .col-qty {
          grid-area: col-qty;
          min-width: 64px;
        }
        .col-price {
          grid-area: col-price;
          min-width: 100px;
        }
        .col-total {
          grid-area: col-total;
          min-width: 56px;
        }
      }

      .col-names > label {
        margin-bottom: 0;
      }
      .item__fields {
        display: grid;
        margin-bottom: 1rem;
        grid-template-columns: auto auto auto auto 1fr;
        grid-template-rows: 1fr;
        column-gap: toRem(16, 18);
        grid-template-areas: "name  qty  price  total cta";

        .field {
          margin-bottom: unset;
        }

        .item__name {
          grid-area: name;
          min-width: toRem(214, 18);
        }
        .item__qty {
          grid-area: qty;
          min-width: toRem(46, 18);
        }
        .item__price {
          grid-area: price;
          min-width: toRem(100, 18);
        }
        .item__total {
          grid-area: total;
          margin-bottom: unset;
        }
        .item__remove {
          grid-area: cta;
          align-items: center;
          padding-top: 0;
        }
      }
    }

    .item-cta {
      margin-bottom: toRem(47, 18); // 47px
    }

    .form-error-alert {
      padding: 0 toRem(56, 18);
      margin-bottom: calc(toRem(124, 18) + toRem(24, 18)); // 124px + 24px
    }

    .form-cta {
      position: fixed;
      width: toRem(616, 18);
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      padding: toRem(32, 18) toRem(56, 18) toRem(32, 18) toRem(56, 18);

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

    .form-cta--new {
      display: grid;
      column-gap: toRem(8, 18);
      grid-template-rows: 1fr;
      grid-template-areas: "cancel draft save";
      grid-template-columns: 1fr toRem(133, 18) toRem(128, 18);
    }
  }
}

@include breakpoint-up(large) {
  .root {
    padding-top: toRem(56, 18); // 56 px
    width: toRem(719, 18); // 719px
    h1 {
      padding-left: toRem(159, 18);
    }

    .group {
      padding: 0 toRem(56, 18) 0 toRem(159, 18);
    }

    .from,
    .to {
      margin-bottom: toRem(48, 18);
    }

    .from {
      .from__fields {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: toRem(24, 18);
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
        column-gap: toRem(24, 18);
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
      margin-bottom: toRem(24, 18);
      > .invoice__fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: toRem(24, 18);
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
      margin-bottom: 0;

      .item__fields {
        display: grid;
        margin-bottom: 1rem;
        grid-template-columns: auto auto auto auto 1fr;
        grid-template-rows: 1fr;
        column-gap: toRem(16, 18);
        grid-template-areas: "name  qty  price  total cta";

        .field {
          margin-bottom: unset;
        }

        .item__name {
          grid-area: name;
          min-width: toRem(214, 18);
        }
        .item__qty {
          grid-area: qty;
          min-width: toRem(46, 18);
        }
        .item__price {
          grid-area: price;
          min-width: toRem(100, 18);
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
      margin-bottom: toRem(47, 18); // 47px
    }

    .form-error-alert {
      padding: 0 0 0 toRem(159, 18);
    }

    .form-cta {
      width: toRem(719, 18); // 719px

      padding-left: toRem(159, 18);

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

    .form-cta--new {
      display: grid;
      grid-template-columns: 1fr toRem(133, 18) toRem(128, 18);
      grid-template-rows: 1fr;
      grid-template-areas: "cancel draft save";
      column-gap: toRem(8, 18);
      justify-content: flex-end;
    }
  }
}
</style>
