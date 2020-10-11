import { shallowMount, createLocalVue } from '@vue/test-utils'
import OfficeForm from '@/components/OfficeForm.vue'
import data from '@/assets/data.json'
import Vuex from 'vuex'

// Prepare mock store
const localVue = createLocalVue()
localVue.use(Vuex)

const state = () => ({
	locations: [...data]
})

const actions = {
	addLocation: jest.fn(),
	editLocation: jest.fn(),
	deleteLocation: jest.fn()
}

const getters = {
	locations: (state) => state.locations
}

const store = new Vuex.Store({
	state,
	actions,
	getters
})

const location = {
	title: 'Headquarters',
	address: '3763 W. Dallas St.',
	color: 'orange',
	contact: {
		name: 'Hellena John',
		job: 'Software Tester',
		email: 'georgia.young@example.com',
		phone: '(808) 555-0111'
	}
}

const emptyLocation = {
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

window.scrollTo = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('OfficeForm', () => {
	test('loads in "add" mode when no id is passed as prop', () => {
		const wrapper = shallowMount(OfficeForm, {
			store,
			localVue
		})
		expect(wrapper.vm.getInitialData()).toStrictEqual(emptyLocation)
	})

	test('loads in "edit" mode when an id other than 0 is passed as prop', () => {
		const wrapper = shallowMount(OfficeForm, {
			store,
			localVue,
			propsData: { edit: 1 }
		})
		const editItem = store.getters.locations.find((val) => val.id === 1)
		expect(wrapper.vm.getInitialData()).toStrictEqual(editItem)
	})

	test('fails form validation when some input has less than 3 characters excluding white spaces', () => {
		const wrapper = shallowMount(OfficeForm)

		// Title validation
		wrapper.setData({ location: { ...location, title: ''.repeat(3) } })
		expect(wrapper.vm.validateForm()).toBeFalsy()

		// Address validation
		wrapper.setData({ location: { ...location, address: ''.repeat(3) } })
		expect(wrapper.vm.validateForm()).toBeFalsy()

		// Contact name validation
		wrapper.setData({ location: { ...location, contact: { ...location.contact, name: ''.repeat(3) } } })
		expect(wrapper.vm.validateForm()).toBeFalsy()

		// Contact job validation
		wrapper.setData({ location: { ...location, contact: { ...location.contact, job: ''.repeat(3) } } })
		expect(wrapper.vm.validateForm()).toBeFalsy()

		// Contact email validation
		wrapper.setData({ location: { ...location, contact: { ...location.contact, email: ''.repeat(3) } } })
		expect(wrapper.vm.validateForm()).toBeFalsy()

		// Contact phone validation
		wrapper.setData({ location: { ...location, contact: { ...location.contact, phone: ''.repeat(3) } } })
		expect(wrapper.vm.validateForm()).toBeFalsy()
	})

	test('fails phone validation when input has letters', () => {
		const wrapper = shallowMount(OfficeForm)

		// Contact phone validation
		wrapper.setData({ location: { ...location, contact: { ...location.contact, phone: 'a'.repeat(3) } } })
		expect(wrapper.vm.validateForm()).toBeFalsy()
	})

	test('passes form validation when all its inputs have 3 or more valid characters', () => {
		const wrapper = shallowMount(OfficeForm)

		// Contact phone validation
		wrapper.setData({ location: { ...location } })
		expect(wrapper.vm.validateForm()).toBeTruthy()
	})

	test('on add mode, dispatches "addLocation" action after 150ms when submit method is called and validation passed', async () => {
		Element.prototype.scrollTo = () => {}
		const wrapper = shallowMount(OfficeForm, {
			store,
			localVue
		})
		wrapper.setData({ location: { ...location } })
		wrapper.vm.submit()

		await new Promise((res) =>
			setTimeout(() => {
				expect(actions.addLocation).toHaveBeenCalled()
				res()
			}, 155)
		)
	})

	test('on edit mode, dispatches "editLocation" action after 100ms when submit method is called and validation passed', async () => {
		const wrapper = shallowMount(OfficeForm, {
			store,
			localVue,
			propsData: { edit: 1 }
		})
		wrapper.vm.submit()

		await new Promise((res) =>
			setTimeout(() => {
				expect(actions.editLocation).toHaveBeenCalled()
				res()
			}, 105)
		)
	})
})
