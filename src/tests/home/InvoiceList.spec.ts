import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { createStore, Store } from 'vuex'
import InvoiceListVue from "../../components/home/InvoiceList.vue";


export interface Invoice {
    invoiceCode: string;
    fromStreet: string;
    fromCity: string;
    fromPostCode: string;
    fromCountry: string;
    clientName: string;
    email: string;
    toStreet: string;
    toCity: string;
    toPostCode: string;
    toCountry: string;
    invoiceDate: string;
    due: string;
    desc: string;
    items: Item[];
    status: string;
    totalAmount: string;
};

export interface Item {
    itemName: string;
    quantity: number;
    price: string;
    total: string;
}

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
            expect(wrapper.find('[data-test="empty-list"]').exists()).toBe(true);
        });

        test('empty list illustration image is displayed', async () => {
            expect(wrapper.find('[data-test="illustration-empty-image"]').attributes('src')).toBeTruthy();
        });


        afterEach(() => {
            wrapper.unmount()
        })
    });

    describe('with invoices', async () => {

        beforeEach(() => {

            store = createStore({
                state() {
                    return {
                        invoices: [
                            {
                                invoiceCode: 'RT3080',
                                fromStreet: '19 Union Terrace',
                                fromCity: 'London',
                                fromPostCode: 'E1 3EZ',
                                fromCountry: 'United Kingdom',
                                clientName: 'Alex Grim',
                                email: 'alexgrim@mail.com',
                                toStreet: '84 Church Way',
                                toCity: 'Bradford',
                                toPostCode: 'BD1 9PB',
                                toCountry: 'United Kingdom',
                                invoiceDate: '21 Aug 2021',
                                due: '20 Sep 2021',
                                status: 'Paid',
                                desc: 'Graphic Design',
                                items: [] as Item[],
                                totalAmount: '£ 556.00',
                            } as Invoice
                        ],
                        filters: []
                    }
                },
                getters: {
                    invoices(state) {
                        if (state.filters.length <= 0) {
                            return state.invoices;
                        }
                        return state.invoices.filter((invoice: Invoice) => state.filters.includes(invoice.status.toLowerCase()));
                    },
                    filters(state) {
                        return state.filters;
                    }
                }
            })
            wrapper = mount(InvoiceListVue, {
                global: {
                    plugins: [store]
                }
            });
        })

        test('empty list div is not displayed', async () => {
            expect(wrapper.find('[data-test="empty-list"]').exists()).toBe(false);
        });

        /* test('an none empty list of at least one invoice should be displayed', async () => {
            expect(wrapper.find('.no-empty-list').exists()).toBe(true);
        }); */


        afterEach(() => {
            wrapper.unmount()
        })
    });
})

