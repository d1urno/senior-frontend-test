import {shallowMount, createLocalVue} from '@vue/test-utils'
import OfficeCard from '@/components/OfficeCard.vue'
import Vuex from 'vuex'

// Prepare mock store
const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
	addLocation: jest.fn(),
	deleteLocation: jest.fn()
}

const store = new Vuex.Store({
	actions
})

const location = {
	id: 1,
	title: '',
	address: '',
	color: 'orange',
	contact: {
		name: '',
		job: '',
		email: '',
		phone: ''
	}
}

describe('OfficeCard', () => {
	test('dispatches "deleteLocation" action when deleteLocation method is called', () => {
		const wrapper = shallowMount(OfficeCard, {
			store, localVue,
			propsData: {location}
		})
		wrapper.vm.deleteLocation(location)

		expect(actions.deleteLocation).toHaveBeenCalled()
	})

	test('emits "message" after delete operation finishes', () => {
		const wrapper = shallowMount(OfficeCard, {
			store, localVue,
			propsData: {location}
		})
		wrapper.vm.deleteLocation(location)

		expect(wrapper.emitted('message'))
	})
})
