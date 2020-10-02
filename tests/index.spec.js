import {shallowMount, createLocalVue} from '@vue/test-utils'
import index from '@/pages/index.vue'
import data from '@/assets/data.json'
import Vuex from 'vuex'

// Prepare mock store
const localVue = createLocalVue()
localVue.use(Vuex)

const state = () => ({
	locations: [...data]
})

const getters = {
	locations: (state) => state.locations
}

const store = new Vuex.Store({
	state,
	getters
})

describe('index', () => {
	test('shows message argument during 4000ms when showMessage method is called', async () => {
		const message = 'check'
		const wrapper = shallowMount(index, {
			store, localVue
		})

		wrapper.vm.showMessage(message)
		expect(wrapper.vm.$data.message).toStrictEqual(message)

		await new Promise((res) => setTimeout(() => {
			expect(wrapper.vm.$data.message).toStrictEqual('')
			res()
		}, 4001))
	})
})
