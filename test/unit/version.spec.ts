import { mount } from '@vue/test-utils';
import Version from '../../src/renderer/script/components/version.vue';

describe('#Version', () => {
  it('mounted', () => {
    const wrapper = mount(Version);
    // FIXME: It doesn't working!! Vue.extend is undefined.
    expect(wrapper).toBeTruthy();
  });
});
