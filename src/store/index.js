import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';


// Create a new store instance.
export default createStore({
    state() {
        return {
            invoices: [
                {
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
                    term: '20 Sep 2021',
                    desc: 'Graphic Design',
                    items: [],
                    totalAmount: '£ 556.00',
                },
                {
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
                    term: '20 Sep 2021',
                    desc: 'Graphic Design',
                    items: [],
                    totalAmount: '£ 556.00',
                },
                {
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
                    term: '20 Sep 2021',
                    desc: 'Graphic Design',
                    items: [],
                    totalAmount: '£ 556.00',
                }
            ]
        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters
})