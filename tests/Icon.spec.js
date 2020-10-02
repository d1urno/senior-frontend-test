import {shallowMount} from '@vue/test-utils'
import Icon from '@/components/Icon.vue'

describe('Icon', () => {
	test('load specific icon component when type prop is passed',async () => {
		const type = 'check'

		const wrapper = shallowMount(Icon, {
			propsData: {type}
		})
		const icon = () => import(`@/assets/icons/${type}.vue`)
		expect(await wrapper.vm.$data.icon()).toStrictEqual(await icon())
	})
})
