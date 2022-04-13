import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";
import { createStore, Store } from "vuex";
import InvoiceListHeader from "../../components/home/InvoiceListHeader.vue";
import appState from '../../store/index'

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

/* 

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
*/
const filter = '[data-test=filter]';
const filterDropdown = '[data-test=filter-dropdown]';

let wrapper: VueWrapper<any>;
let store: Store<any>;

test('mount InvoiceListHeader', async () => {
    expect(InvoiceListHeader).toBeTruthy();
});

/* 

    Values by default
*/

describe('InvoiceListHeader default values', async () => {

    beforeEach(() => {
        store = appState

        wrapper = mount(InvoiceListHeader, {
            global: {
                plugins: [store]
            }
        });
    });

    test('filter dropdown do not exists by default', async () => {
        expect(wrapper.find(filterDropdown).exists()).toBeFalsy();
    });

    test('dropdown checkboxes are not checked by default', async () => {
        await wrapper.get(filter).trigger("click");
        wrapper.find(filterDropdown).findAll('.square').forEach(element => {
            expect(element.classes().includes('--checked')).toBe(false);
        });
    });
});


/* 

    Events
*/

describe('InvoiceListHeader events', async () => {

    describe('header list info', () => {

        beforeEach(() => {
            store = appState

            wrapper = mount(InvoiceListHeader, {
                global: {
                    plugins: [store]
                }
            });
        });

        test('if no invoices, "No invoices" should appear', async () => {
            expect(wrapper.find('.info').get('small').text()).toEqual('No invoices');
        })
    })

    describe('dropdown states', async () => {

        beforeEach(() => {
            store = appState

            wrapper = mount(InvoiceListHeader, {
                global: {
                    plugins: [store]
                }
            });
        });

        test('show dropdown', async () => {
            await wrapper.get(filter).trigger("click");
            expect(wrapper.find(filterDropdown).exists()).toBeTruthy();

        });

        test('show and hide dropdown', async () => {

            await wrapper.get(filter).trigger("click");

            await wrapper.get(filter).trigger("click");

            expect(wrapper.find(filterDropdown).exists()).toBeFalsy();
        });
    });

    describe('dropdown checkboxes states', async () => {

        beforeEach(async () => {
            store = appState

            wrapper = mount(InvoiceListHeader, {
                global: {
                    plugins: [store]
                }
            });
            const filterButton = wrapper.get(filter);
            await filterButton.trigger("click");
        });

        describe('dropdown checkboxes checking', async () => {


            test('draft checkbox checking state', async () => {

                const draftButton = wrapper.find(filterDropdown).find('.draft');

                await draftButton.trigger("click");

                expect(wrapper.find(filterDropdown).find('.draft-checkbox').classes().includes('--checked')).toBe(true);
            });

            test('pending checkbox checking state', async () => {
                const pendingButton = wrapper.find(filterDropdown).find('.pending');
                await pendingButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.pending-checkbox').classes().includes('--checked')).toBe(true)
            });

            test('paid checkbox checking state', async () => {
                const paidButton = wrapper.find(filterDropdown).find('.paid');
                await paidButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.paid-checkbox').classes().includes('--checked')).toBe(true)
            });
        });

        describe('dropdown checkboxes unchecking', async () => {


            test('draft checkbox unchecking state', async () => {

                store = createStore({
                    state() {
                        return {
                            invoices: [],
                            filters: ['draft']
                        }
                    },
                    getters: {
                        invoices(state) {
                            return state.invoices;
                        },
                        filters(state) {
                            return state.filters;
                        }
                    },
                    mutations: {
                        UPDATE_FILTERS(state, payload) {
                            state.filters = payload.filters
                        }
                    },
                    actions: {
                        handleFilters(context, payload) {
                            /* add a new filter or remove it if it was already added */
                            const filters = [...context.getters.filters].includes(payload.filter)
                                ? [...context.getters.filters].filter((f) => f !== payload.filter)
                                : [...context.getters.filters, payload.filter];

                            context.commit('UPDATE_FILTERS', { filters: filters });
                        }
                    }
                })

                wrapper = mount(InvoiceListHeader, {
                    global: {
                        plugins: [store]
                    }
                });

                /* Display dropdown */
                const filterButton = wrapper.get(filter);
                await filterButton.trigger("click");

                /* Uncheck the draft filter */
                const draftButton = wrapper.find(filterDropdown).find('.draft');
                await draftButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.draft-checkbox').classes().includes('--checked')).toBe(false)
            });

            test('pending checkbox checking state', async () => {

                store = createStore({
                    state() {
                        return {
                            invoices: [],
                            filters: ['pending']
                        }
                    },
                    getters: {
                        invoices(state) {
                            return state.invoices;
                        },
                        filters(state) {
                            return state.filters;
                        }
                    },
                    mutations: {
                        UPDATE_FILTERS(state, payload) {
                            state.filters = payload.filters
                        }
                    },
                    actions: {
                        handleFilters(context, payload) {
                            /* add a new filter or remove it if it was already added */
                            const filters = [...context.getters.filters].includes(payload.filter)
                                ? [...context.getters.filters].filter((f) => f !== payload.filter)
                                : [...context.getters.filters, payload.filter];

                            context.commit('UPDATE_FILTERS', { filters: filters });
                        }
                    }
                })

                wrapper = mount(InvoiceListHeader, {
                    global: {
                        plugins: [store]
                    }
                });

                /* Display dropdown */
                const filterButton = wrapper.get(filter);
                await filterButton.trigger("click");

                /* Uncheck the pending filter */
                const pendingButton = wrapper.find(filterDropdown).find('.pending');
                await pendingButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.pending-checkbox').classes().includes('--checked')).toBe(false)
            });

            test('paid checkbox checking state', async () => {

                store = createStore({
                    state() {
                        return {
                            invoices: [],
                            filters: ['paid']
                        }
                    },
                    getters: {
                        invoices(state) {
                            return state.invoices;
                        },
                        filters(state) {
                            return state.filters;
                        }
                    },
                    mutations: {
                        UPDATE_FILTERS(state, payload) {
                            state.filters = payload.filters
                        }
                    },
                    actions: {
                        handleFilters(context, payload) {
                            /* add a new filter or remove it if it was already added */
                            const filters = [...context.getters.filters].includes(payload.filter)
                                ? [...context.getters.filters].filter((f) => f !== payload.filter)
                                : [...context.getters.filters, payload.filter];

                            context.commit('UPDATE_FILTERS', { filters: filters });
                        }
                    }
                })

                wrapper = mount(InvoiceListHeader, {
                    global: {
                        plugins: [store]
                    }
                });

                /* Display dropdown */
                const filterButton = wrapper.get(filter);
                await filterButton.trigger("click");

                /* Uncheck the pending filter */
                const paidButton = wrapper.find(filterDropdown).find('.paid');
                await paidButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.paid-checkbox').classes().includes('--checked')).toBe(false)
            });
        });

    });
})