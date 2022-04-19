import { flushPromises, mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { createRouter, createWebHashHistory, Router, useRouter, useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { createStore, Store } from 'vuex'
import { Invoice } from "../../models/invoice.model";
import InvoiceDetailPageVue from "../../pages/InvoiceDetailPage.vue";
import { routes } from '../../router/index';




let wrapper: VueWrapper<any>;
let store: Store<any>;

test('mount Invoice Detail Vue', async () => {
    expect(InvoiceDetailPageVue).toBeTruthy();
});

describe('Invoice Event', async () => {
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
                            clientName: 'Jensen Huang',
                            email: 'alexgrim@mail.com',
                            toStreet: '84 Church Way',
                            toCity: 'Bradford',
                            toPostCode: 'BD1 9PB',
                            toCountry: 'United Kingdom',
                            invoiceDate: '21 Aug 2021',
                            status: 'Paid',
                            due: 'Due 20 Sep 2021',
                            desc: 'Graphic Design',
                            items: [],
                            totalAmount: '£ 1,800.90',
                        },
                        {
                            invoiceCode: 'XM9141',
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
                            status: 'Pending',
                            due: 'Due 20 Sep 2021',
                            desc: 'Graphic Design',
                            items: [],
                            totalAmount: '£ 556.00',
                        },
                        {
                            invoiceCode: 'RG0314',
                            fromStreet: '19 Union Terrace',
                            fromCity: 'London',
                            fromPostCode: 'E1 3EZ',
                            fromCountry: 'United Kingdom',
                            clientName: 'John Morrison',
                            email: 'alexgrim@mail.com',
                            toStreet: '84 Church Way',
                            toCity: 'Bradford',
                            toPostCode: 'BD1 9PB',
                            toCountry: 'United Kingdom',
                            invoiceDate: '21 Aug 2021',
                            status: 'Paid',
                            due: 'Due 01 Oct 2021',
                            desc: 'Graphic Design',
                            items: [],
                            totalAmount: '£ 14,002.33',
                        },
                    ],
                    invoice: {
                        invoiceCode: 'RG0314',
                        fromStreet: '19 Union Terrace',
                        fromCity: 'London',
                        fromPostCode: 'E1 3EZ',
                        fromCountry: 'United Kingdom',
                        clientName: 'John Morrison',
                        email: 'alexgrim@mail.com',
                        toStreet: '84 Church Way',
                        toCity: 'Bradford',
                        toPostCode: 'BD1 9PB',
                        toCountry: 'United Kingdom',
                        invoiceDate: '21 Aug 2021',
                        status: 'Paid',
                        due: 'Due 01 Oct 2021',
                        desc: 'Graphic Design',
                        items: [],
                        totalAmount: '£ 14,002.33',
                    } as Invoice,
                    filters: []
                }
            },
            getters: {
                invoices(state) {
                    if (state.filters.length <= 0) {
                        return state.invoices;
                    }
                    return state.invoices.filter(invoice => state.filters.includes(invoice.status.toLowerCase()));
                },
                invoice(state) {
                    return state.invoice;
                },
                filters(state) {
                    return state.filters;
                }
            },
            mutations: {
                REMOVE_INVOICE(state, payload) {
                    state.invoices = payload.invoices;
                },
            },
            actions: {
                removeInvoice(context, payload) {
                    /* add a new filter or remove it if it was already added */
                    const invoices = [...context.getters.invoices]
                        .filter(invoice => {
                            return invoice.invoiceCode !== payload.invoiceCode;
                        });

                    context.commit('REMOVE_INVOICE', { invoices: invoices });
                },
            }
        });

        wrapper = mount(InvoiceDetailPageVue, {
            global: {
                plugins: [store]
            }
        });
    })
    test('Invoice deletion', async () => {

        await store.dispatch('removeInvoice', { invoiceCode: 'RG0314' });

        store.state.invoices.forEach((i: Invoice) => {
            expect(i.invoiceCode).not.toBe('RG0314')
        });
    })
})

