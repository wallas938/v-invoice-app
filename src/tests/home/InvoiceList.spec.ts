import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { createStore, Store } from 'vuex'
import InvoiceListVue from "../../components/home/InvoiceList.vue";

let wrapper: VueWrapper<any>;
let store: Store<any>;

test('mount InvoiceListVue', async () => {
    expect(InvoiceListVue).toBeTruthy();
});


describe('InvoiceListVue', async () => {

    describe('with no invoices', async () => {

        beforeEach(() => {

            store = createStore({
                state() {
                    return {
                        invoices: []
                    }
                },
                getters: {
                    invoices(state) {
                        return state.invoices;
                    }
                }
            })
            wrapper = mount(InvoiceListVue, {
                global: {
                    plugins: [store]
                }
            });
        })

        test('empty list div is displayed', async () => {
            expect(wrapper.find('[data-test="empty-list"]')).toBeTruthy();
        });

        test('empty list illustration image is displayed', async () => {
            expect(wrapper.find('[data-test="illustration-empty-image"]').attributes('src')).toBeTruthy();
        });


        afterEach(() => {
            wrapper.unmount()
        })
    });
})

