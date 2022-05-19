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
                    email: 'jensenh@mail.com',
                    toStreet: '106 Kendell Street',
                    toCity: 'Sharrington',
                    toPostCode: 'NR24 5WQ',
                    toCountry: 'United Kingdom',
                    invoiceDate: '18 Aug 2021',
                    status: 'Paid',
                    due: 30,
                    desc: 'Re-branding',
                    items: [
                        {
                            itemName: 'Brand Guidelines',
                            quantity: 1,
                            price: "1,800.90",
                            total: "1,800.90"
                        },
                    ],
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
                    due: 30,
                    desc: 'Graphic Design',
                    items: [
                        {
                            itemName: 'Banner Design',
                            quantity: 1,
                            price: "156.00",
                            total: "156.00"
                        },
                        {
                            itemName: 'Email Design',
                            quantity: 2,
                            price: "200.00",
                            total: "400.00"
                        },
                    ],
                    totalAmount: '£ 556.00',
                },
                {
                    invoiceCode: 'RG0314',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'John Morrison',
                    email: 'jm@myco.com',
                    toStreet: '79 Dover Road',
                    toCity: 'Westhall',
                    toPostCode: 'IP19 3PF',
                    toCountry: 'United Kingdom',
                    invoiceDate: '24 Sep 2021',
                    status: 'Paid',
                    due: 14,
                    desc: 'Website Redesign',
                    items: [
                        {
                            itemName: 'Banner Design',
                            quantity: 1,
                            price: "14,002.33",
                            total: "14,002.33"
                        },
                    ],
                    totalAmount: '£ 14,002.33',
                },
                {
                    invoiceCode: 'RT2080',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Alysa Werner',
                    email: 'alyssa@email.co.uk',
                    toStreet: '63 Warwick Road',
                    toCity: 'Carlisle',
                    toPostCode: 'CA20 2TG',
                    toCountry: 'United Kingdom',
                    invoiceDate: '211 Oct 2021',
                    status: 'Pending',
                    due: 1,
                    desc: 'Logo Concept',
                    items: [
                        {
                            itemName: 'Logo Sketches',
                            quantity: 1,
                            price: "102.04",
                            total: "102.04"
                        },
                    ],
                    totalAmount: '£ 102.04',
                },
                {
                    invoiceCode: 'AA1449',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Mellisa Clarke',
                    email: 'mellisa.clarke@example.com',
                    toStreet: '46 Abbey Row',
                    toCity: 'Cambridge',
                    toPostCode: 'CB5 6EG',
                    toCountry: 'United Kingdom',
                    invoiceDate: '07 Oct 2021',
                    status: 'Pending',
                    due: 7,
                    desc: 'Re-branding',
                    items: [
                        {
                            itemName: 'New Logo',
                            quantity: 1,
                            price: "1,532.33",
                            total: "1,532.33"
                        },
                        {
                            itemName: 'Brand Guidelines',
                            quantity: 1,
                            price: "2,500.00",
                            total: "2,500.00"
                        },
                    ],
                    totalAmount: '£ 4,032.33',
                },
                {
                    invoiceCode: 'TY9141',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Thomas Wayne',
                    email: 'thomas@dc.com',
                    toStreet: '3964 Queens Lane',
                    toCity: 'Gotham',
                    toPostCode: '60457',
                    toCountry: 'United States of America',
                    invoiceDate: '01 Oct 2021',
                    status: 'Pending',
                    due: 30,
                    desc: 'Landing Page Design',
                    items: [
                        {
                            itemName: 'Web Design',
                            quantity: 1,
                            price: "6,155.91",
                            total: "6,155.91"
                        },
                    ],
                    totalAmount: '£ 6,155.91',
                },
                {
                    invoiceCode: 'FV2353',
                    fromStreet: '19 Union Terrace',
                    fromCity: 'London',
                    fromPostCode: 'E1 3EZ',
                    fromCountry: 'United Kingdom',
                    clientName: 'Anita Wainwright',
                    email: 'anita.wainwright@mail.com',
                    toStreet: '---',
                    toCity: '---',
                    toPostCode: '---',
                    toCountry: '---',
                    invoiceDate: '05 Nov 2021',
                    status: 'Draft',
                    due: 30,
                    desc: 'Logo Re-design',
                    items: [
                        {
                            itemName: 'Logo Re-design',
                            quantity: 1,
                            price: "3,102.04",
                            total: "3,102.04"
                        },
                    ],
                    totalAmount: '£ 3,102.04',
                },
            ],
            invoice: null,
            filters: []
        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters
});