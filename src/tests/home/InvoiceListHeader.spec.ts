import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";
import InvoiceListHeader from "../../components/home/InvoiceListHeader.vue";

const filter = '[data-test=filter]';
const filterDropdown = '[data-test=filter-dropdown]';

let wrapper: VueWrapper<any>;

test('mount InvoiceListHeader', async () => {
    expect(InvoiceListHeader).toBeTruthy();
});

beforeEach(() => {
    wrapper = mount(InvoiceListHeader);
})

/* 

    Values by default
*/

describe('InvoiceListHeader default values', async () => {
    test('filter dropdown do not exists by default', async () => {
        expect(wrapper.find(filterDropdown).exists()).toBeFalsy();
    });

    test('dropdown checkboxes are not checked by default', async () => {
        await wrapper.get(filter).trigger("click");
        wrapper.find(filterDropdown).findAll('.square').forEach(element => {
            expect(element.classes().includes('--checked')).toBe(false);
        });
    })
});


/* 

    Events
*/

describe('InvoiceListHeader events', async () => {

    describe('dropdown states', async () => {
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
            const filterButton = wrapper.get(filter);
            await filterButton.trigger("click");
        });

        describe('dropdown checkboxes checking', async () => {
            test('draft checkbox checking state', async () => {
                const draftButton = wrapper.find(filterDropdown).find('.draft');
                await draftButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.draft-checkbox').classes().includes('--checked')).toBe(true)
            });

            test('draft checkbox checking state', async () => {
                const pendingButton = wrapper.find(filterDropdown).find('.pending');
                await pendingButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.pending-checkbox').classes().includes('--checked')).toBe(true)
            });

            test('draft checkbox checking state', async () => {
                const paidButton = wrapper.find(filterDropdown).find('.paid');
                await paidButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.paid-checkbox').classes().includes('--checked')).toBe(true)
            });
        });

        describe('dropdown checkboxes unchecking', async () => {
            test('draft checkbox checking state', async () => {
                const draftButton = wrapper.find(filterDropdown).find('.draft');
                await draftButton.trigger("click");
                await draftButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.draft-checkbox').classes().includes('--checked')).toBe(false)
            });

            test('draft checkbox checking state', async () => {
                const pendingButton = wrapper.find(filterDropdown).find('.pending');
                await pendingButton.trigger("click");
                await pendingButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.pending-checkbox').classes().includes('--checked')).toBe(false)
            });

            test('draft checkbox checking state', async () => {
                const paidButton = wrapper.find(filterDropdown).find('.paid');
                await paidButton.trigger("click");
                await paidButton.trigger("click");
                expect(wrapper.find(filterDropdown).find('.paid-checkbox').classes().includes('--checked')).toBe(false)
            });
        });


    })
})