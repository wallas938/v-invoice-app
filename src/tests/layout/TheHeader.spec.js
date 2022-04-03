import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import TheHeaderVue from "../../components/layout/TheHeader.vue";

const lightIcon = '[data-test=light-icon]';
const darkIcon = '[data-test=dark-icon]';

const wrapper = mount(TheHeaderVue);

test('mount TheHeaderVue', async () => {
    expect(TheHeaderVue).toBeTruthy();
});

test('dark icon is displayed by default', async () => {
    expect(wrapper.find(lightIcon).exists()).toBeFalsy();
    expect(wrapper.find(darkIcon).exists()).toBeTruthy();
});

test('light icon enter the DOM when the dark icon is clicked', async () => {
    await wrapper.get(darkIcon).trigger("click");

    expect(wrapper.find(lightIcon).exists()).toBeTruthy();

    expect(wrapper.find(darkIcon).exists()).toBeFalsy();
});

/* test('dark mode is set when clicked', async () => {
    await wrapper.get(currentMode).trigger("click")
    expect(wrapper.find(currentMode).attributes().src).toContain('sun')
}); */