import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";
import { createStore, Store } from "vuex";
import TheHeaderVue from "../../components/layout/TheHeader.vue";
import appStore from '../../store/index';

let store: Store<any>;
let wrapper: VueWrapper<any>;

beforeEach(() => {
    store = appStore
});



describe('TheHeaderVue default values', async () => {
    beforeEach(() => {
        wrapper = mount(TheHeaderVue, {
            global: {
                plugins: [store]
            },
        });
    })

    test('mount TheHeaderVue', async () => {
        expect(TheHeaderVue).toBeTruthy();
    });

    test('dark icon is displayed by default', async () => {

        expect(wrapper.find('.dark-icon').exists()).toBe(true);

        expect(wrapper.find('.light-icon').exists()).toBe(false);


    });


})

describe('TheHeaderVue events', async () => {
    beforeEach(() => {
        wrapper = mount(TheHeaderVue, {
            global: {
                plugins: [store]
            },
        });
    })

    test('light mode', async () => {

        expect(wrapper.find('.dark-icon').exists()).toBe(true);

        expect(wrapper.classes()).toContain('--light-mode');
    });

    test('dark mode', async () => {
        await wrapper.find('.modeBtn').trigger('click');

        expect(wrapper.find('.light-icon').exists()).toBe(true);

        expect(wrapper.classes()).toContain('--dark-mode');
    });

    /*  test('dark icon is displayed by default', async () => {
 
         expect(wrapper.find('.dark-icon').exists()).toBe(true);
 
         expect(wrapper.find('.light-icon').exists()).toBe(false);
 
 
     }); */


})



/* test('light icon enter the DOM when the dark icon is clicked', async () => {
    console.log(wrapper.find(darkIcon));

    await wrapper.find(darkIcon).trigger("click");

    expect(wrapper.find(lightIcon).exists()).toBeTruthy();

    expect(wrapper.find(darkIcon).exists()).toBeFalsy();
}); */