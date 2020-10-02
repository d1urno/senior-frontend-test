import {shallowMount} from '@vue/test-utils'
import OfficeFormInput from '@/components/OfficeFormInput.vue'

describe('OfficeFormInput', () => {
	test('emits "input" (with with text) and "reset-error" events, when _value is set', () => {
		const wrapper = shallowMount(OfficeFormInput, {
			propsData: {error: '', value: '', reference: 'ref'}
		})

		wrapper.setData({_value: 'anything'})
		expect(wrapper.emitted()['input']).toEqual([['anything']])
		expect(wrapper.emitted()['reset-error'])
	})
})
