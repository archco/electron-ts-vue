import { mount } from '@vue/test-utils';
import Version from '../../src/renderer/script/components/version.vue';

describe('#Version', () => {
  it('mounted', () => {
    const wrapper = mount(Version);

    expect(wrapper.exists()).toBeTruthy();
    expect(typeof wrapper.vm.$data.versions).toBe('object');
  });
});
