import data from '@/assets/data.json'

export const state = () => ({
	locations: [...data]
})

export const mutations = {
	ADD_LOCATION(state, location) {
		state.locations.unshift(location)
	},
	EDIT_LOCATION(state, location) {
		state.locations = state.locations.map((value) => {
			if (value.id === location.id) return location
			return value;
		});
	},
	DELETE_LOCATION(state, locationId) {
		state.locations.splice(locationId, 1)
	}
}

export const actions = {
	addLocation({commit}, location) {
		commit('ADD_LOCATION', location)
		return location
	},
	editLocation({commit}, location) {
		commit('EDIT_LOCATION', location)
		return location
	},
	deleteLocation({state, commit}, location) {
		const index = state.locations
			.map((value) => {
				return location.id === value.id
			})
			.indexOf(true)

		if (index !== -1) {
			commit('DELETE_LOCATION', index)
			return location
		} else {
			return false
		}
	}
}

export const getters = {
	locations: (state) => state.locations
}
