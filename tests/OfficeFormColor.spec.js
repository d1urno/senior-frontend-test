import { shallowMount } from '@vue/test-utils'
import OfficeFormColor from '@/components/OfficeFormColor.vue'

describe('OfficeFormColor', () => {
	test('emits "input" event with color and then closes itself, when handleSelection method is called', () => {
		const wrapper = shallowMount(OfficeFormColor, { propsData: { value: 'bg-orange-500' } })

		wrapper.vm.handleSelection('bg-teal-500')
		expect(wrapper.emitted().input).toEqual([['bg-teal-500']])
		expect(wrapper.vm.$data.isOpen).toBeFalsy()
	})
})
