import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

/* Modules */
import layoutModule from './modules/layout';


// Create a new store instance.
export default createStore({
    modules: {
        layout: layoutModule,
    },
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
                {
                    invoiceCode: 'RT2080',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Alysa Werner',
                    email: 'alexgrim@mail.com',
                    toStreet: '84 Church Way',
                    toCity: 'Bradford',
                    toPostCode: 'BD1 9PB',
                    toCountry: 'United Kingdom',
                    invoiceDate: '21 Aug 2021',
                    status: 'Pending',
                    due: 'Due 12 Oct 2021',
                    desc: 'Graphic Design',
                    items: [],
                    totalAmount: '£ 102.04',
                },
                {
                    invoiceCode: 'FV2353',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Anita Wainwright',
                    email: 'alexgrim@mail.com',
                    toStreet: '84 Church Way',
                    toCity: 'Bradford',
                    toPostCode: 'BD1 9PB',
                    toCountry: 'United Kingdom',
                    invoiceDate: '21 Aug 2021',
                    status: 'Draft',
                    due: 'Due 12 Nov 2021',
                    desc: 'Graphic Design',
                    items: [],
                    totalAmount: '£ 3,102.04',
                }
            ]
        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters
})