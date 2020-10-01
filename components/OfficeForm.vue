<template>
	<form @submit.prevent="submit"
		  class="w-full px-8 py-6 text-gray-800 bg-white rounded-lg shadow-lg c-scroll-container">
		<header class="flex items-center justify-between mb-10">
			<h2 v-if="!edit" class="font-bold select-none">New Location</h2>
			<h2 v-else class="font-bold select-none">Edit Location</h2>
			<button type="button" class="focus:outline-none" @click.prevent="$emit('exit')">
				<icon class="text-gray-500" type="close"/>
			</button>
		</header>

		<!-- Color picker row -->
		<office-form-color class="mb-6" v-model="location.color"/>

		<section>
			<!-- Title row -->
			<office-form-input ref="title" :reference="'title'" title="Title"
							   v-model="location.title"
							   :error="errors.title"
							   @reset-error="errors.title = ''"/>

			<!-- Address row -->
			<office-form-input ref="address" :reference="'address'" title="Enter the address"
							   v-model="location.address"
							   :error="errors.address"
							   @reset-error="errors.address = ''"/>
		</section>

		<span class="inline-block mb-3 text-xs font-semibold tracking-wide text-teal-500">CONTACT INFORMATION</span>
		<span class="block w-full h-1 mb-4 border-t border-gray-300"/>

		<section>
			<!-- Contact name row -->
			<office-form-input ref="contactName" :reference="'contactName'" title="Full name"
							   v-model="location.contact.name"
							   :error="errors.contactName"
							   @reset-error="errors.contactName = ''"/>

			<!-- Contact job row -->
			<office-form-input ref="contactJob" :reference="'contactJob'" title="Job Position"
							   v-model="location.contact.job"
							   :error="errors.contactJob"
							   @reset-error="errors.contactJob = ''"/>

			<!-- Contact email row -->
			<office-form-input ref="contactEmail" :reference="'contactEmail'" title="Email address"
							   type="email"
							   input-mode="email"
							   placeholder="name@example.com"
							   v-model="location.contact.email"
							   :error="errors.contactEmail"
							   @reset-error="errors.contactEmail = ''"/>

			<!-- Contact phone row -->
			<office-form-input ref="contactPhone" :reference="'contactPhone'" title="Phone"
							   placeholder="(xxx) xxx-xxxx"
							   v-model="location.contact.phone"
							   :error="errors.contactPhone"
							   @reset-error="errors.contactPhone = ''"/>
		</section>

		<footer>
			<button type="submit"
					class="relative p-2 px-6 flex items-center
					rounded-md text-white transition duration-300
					focus:outline-none focus:shadow-outline select-none"
					:class="{ 'bg-teal-500': _validated, 'bg-gray-400': !_validated }">
				Save
			</button>
		</footer>
	</form>
</template>

<script>
import Icon from '@/components/Icon'
import OfficeFormColor from '@/components/OfficeFormColor'
import OfficeFormInput from '@/components/OfficeFormInput'

export default {
	name: 'OfficeForm',
	components: {OfficeFormInput, OfficeFormColor, Icon},
	props: {
		edit: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			location: this.getInitialData(),
			errors: {
				title: '',
				address: '',
				contactName: '',
				contactJob: '',
				contactEmail: '',
				contactPhone: ''
			}
		}
	},
	computed: {
		_validated() {
			return this.validateForm()
		}
	},
	methods: {
		addLocation(location) {
			return this.$store.dispatch('addLocation', location)
		},

		editLocation(location) {
			return this.$store.dispatch('editLocation', location)
		},

		getInitialData() {
			if (this.edit) {
				// Create a copy of stored location
				const location = this.$store.getters.locations.find(value => value.id === this.edit)
				return {...location, contact: {...location.contact}}
			}
			// Return an empty location
			return {
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
		},

		submit() {
			if (!this.validateForm(true)) return

			// Close and show success message
			if (!this.edit) {
				scrollTo({top: 0, behavior: 'smooth'})
				setTimeout(() => {
					this.$emit('exit')
					this.$emit('message', 'THE LOCATION HAS BEEN CREATED.')
					this.addLocation(this.location)
				}, 150)
			} else {
				this.$el.scrollIntoView({behavior: 'smooth'})
				setTimeout(() => {
					this.$emit('exit')
					this.$emit('message', 'THE LOCATION HAS BEEN UPDATED.')
				}, 100)
				this.editLocation(this.location)
			}
		},

		validateForm(pointErrors) {
			// Create a deep copy of input so we can trim and evaluate it
			const location = {...this.location, contact: {...this.location.contact}}

			// Trim white spaces
			location.title = location.title.trim()
			location.address = location.address.trim()
			location.contact.name = location.contact.name.trim()
			location.contact.job = location.contact.job.trim()
			location.contact.email = location.contact.email.trim()
			location.contact.phone = location.contact.phone.trim()

			const req = 'This field cannot be empty'
			const min = 'Minimum 3 characters'
			const max = 'Maximum 60 characters'
			const invalid = 'Invalid phone number'

			// Create an errors object
			const errors = {}

			// Title input validation
			if (!location.title.length) {
				errors.title = req
			} else if (location.title.length < 3) {
				errors.title = min
			} else if (location.title.length > 60) {
				errors.title = max
			}

			// Address input validation
			if (!location.address.length) {
				errors.address = req
			} else if (location.address.length < 3) {
				errors.address = min
			} else if (location.address.length > 60) {
				errors.address = max
			}

			// Contact name input validation
			if (!location.contact.name.length) {
				errors.contactName = req
			} else if (location.contact.name.length < 3) {
				errors.contactName = min
			} else if (location.contact.name.length > 60) {
				errors.contactName = max
			}

			// Contact job input validation
			if (!location.contact.job.length) {
				errors.contactJob = req
			} else if (location.contact.job.length < 3) {
				errors.contactJob = min
			} else if (location.contact.job.length > 60) {
				errors.contactJob = max
			}

			// Contact email input validation
			if (!location.contact.email.length) {
				errors.contactEmail = req
			} else if (location.contact.email.length < 3) {
				errors.contactEmail = min
			} else if (location.contact.email.length > 60) {
				errors.contactEmail = max
			}

			// Contact phone input validation
			if (!location.contact.phone.length) {
				errors.contactPhone = req
			} else if (location.contact.phone.length < 10) {
				errors.contactPhone = invalid
			} else if (location.contact.phone.length > 20) {
				errors.contactPhone = invalid
			} else if (location.contact.phone.match(/[A-z]/)) {
				errors.contactPhone = invalid
			}

			// Check for errors, and scroll + focus on input
			// if errors are present and pointErrors is true
			if (Object.values(errors).find((value) => value.length > 0)) {
				if (pointErrors) {
					const elementId = Object.keys(errors)[
						Object.values(errors).findIndex((value) => value.length > 0)
						]
					const element = this.$refs[elementId].$refs[elementId]
					element.focus({preventScroll: true})
					element.scrollIntoView({behavior: 'smooth'})

					// Fill errors
					this.errors = errors

					// Trim inputs
					this.location = location
				}
				return false
			}
			return true
		}
	}
}
</script>

<style scoped>
.c-scroll-container {
	scroll-margin: 9rem;
	scroll-padding: 9rem
}
</style>
