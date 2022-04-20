import { VueWrapper } from "@vue/test-utils";
import { beforeEach, expect, test } from "vitest";
import { createStore, Store } from "vuex";
import { Invoice } from "../../models/invoice.model";
import getters from '../../store/getters';
import mutations from '../../store/mutations';
import actions from '../../store/actions';

let wrapper: VueWrapper<any>;
let store: Store<any>;

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
        getters: getters,
        mutations: mutations,
        actions: actions
    });
});

test('Invoice deletion', async () => {

    await store.dispatch('removeInvoice', { invoiceCode: 'RG0314' });

    store.state.invoices.forEach((i: Invoice) => {
        expect(i.invoiceCode).not.toBe('RG0314')
    });
});

test('Mark invoice as Paid', async () => {

    await store.dispatch('markAsPaid', { invoiceCode: 'XM9141' });

    store.state.invoices.forEach((i: Invoice) => {
        if (i.invoiceCode === 'XM9141') {
            expect(i.status).toBe('Paid');
        }
    });
});

test('Set the current invoice for detail', async () => {

    const currentInvoiceCode = store.state.invoice.invoiceCode; // invoiceCode: #RG0314

    await store.dispatch('setCurrentInvoice', { invoiceCode: 'XM9141' });

    expect(store.state.invoice.invoiceCode).not.toBe(currentInvoiceCode); // invoiceCode !== RG0314

    expect(store.state.invoice.invoiceCode).toBe('XM9141'); // invoiceCode === XM9141
});