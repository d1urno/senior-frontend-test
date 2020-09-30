<template>
	<form @submit.prevent="submit" class="w-full px-8 py-6 text-gray-800 bg-white rounded-lg shadow-lg">
		<header class="flex items-center justify-between mb-10">
			<h2 class="font-bold select-none">New Location</h2>
			<button type="button" class="focus:outline-none" @click.prevent="$emit('exit')">
				<icon class="text-gray-500" type="close"/>
			</button>
		</header>

		<office-form-color class="mb-6" v-model="location.color"/>

		<section>
			<!-- Title row -->
			<label class="block w-full mb-6">
				Title
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.title"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="title"
						   v-model="location.title"
						   type="text"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.title }"
						   @input="errors.title = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.title" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.title }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
			<!-- End: Title row -->

			<!-- Address row -->
			<label class="block w-full mb-6">
				Enter the address
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.address"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="address"
						   v-model="location.address"
						   type="text"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.address }"
						   @input="errors.address = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.address" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.address }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
			<!-- End: Address row -->
		</section>

		<span class="inline-block mb-3 text-xs font-semibold tracking-wide text-teal-500">CONTACT INFORMATION</span>
		<span class="block w-full h-1 mb-4 border-t border-gray-300"/>

		<!-- Contact name row -->
		<section>
			<label class="block w-full mb-6">
				Full name
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.contactName"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="contactName"
						   v-model="location.contact.name"
						   type="text"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.contactName }"
						   @input="errors.contactName = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.contactName" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.contactName }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
			<!-- End: Contact name row -->

			<!-- Contact job row -->
			<label class="block w-full mb-6">
				Job Position
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.contactJob"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="contactJob"
						   v-model="location.contact.job"
						   type="text"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.contactJob }"
						   @input="errors.contactJob = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.contactJob" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.contactJob }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
			<!-- End: Contact job row -->

			<!-- Contact email row -->
			<label class="block w-full mb-6">
				Email address
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.contactEmail"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="contactEmail"
						   v-model="location.contact.email"
						   type="email"
						   inputmode="email"
						   placeholder="name@example.com"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.contactEmail }"
						   @input="errors.contactEmail = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.contactEmail" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.contactEmail }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
			<!-- End: Contact email row -->

			<!-- Contact phone row -->
			<label class="block w-full mb-6">
				Phone
				<span class="text-gray-500">*</span>
				<span class="relative block">
					<transition name="zoom-fade">
						<icon v-show="errors.contactPhone"
							  type="error"
							  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
					</transition>
					<input ref="contactPhone"
						   v-model="location.contact.phone"
						   type="text"
						   placeholder="(xxx) xxx-xxxx"
						   class="w-full px-4 py-2 mt-1
						   border border-gray-500 rounded-md shadow
						   focus:outline-none focus:border-teal-500 c-scroll-container"
						   :class="{ 'border-red-500': errors.contactPhone }"
						   @input="errors.contactPhone = ''"/>
				</span>
				<smooth-reflow :options="$options.options">
					<transition name="zoom-fade">
						<p v-show="errors.contactPhone" class="inline-block mt-1 text-xs text-red-600">
							{{ errors.contactPhone }}
						</p>
					</transition>
				</smooth-reflow>
			</label>
		</section>
		<!-- End: Contact phone row -->

		<footer>
			<button type="submit"
					class="relative p-2 px-6 flex items-center rounded-md text-white
					transition transform duration-300 ease-out active:scale-100
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

export default {
	name: 'OfficeFormAdd',
	components: {OfficeFormColor, Icon},
	data() {
		return {
			location: {
				title: '',
				address: '',
				color: 'orange',
				contact: {
					name: '',
					job: '',
					email: '',
					phone: ''
				}
			},
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

		submit() {
			if (!this.validateForm(true)) return

			// Close and show success message
			scrollTo({top: 0, behavior: 'smooth'})
			setTimeout(() => {
				this.addLocation(this.location)
				this.$emit('exit')
			}, 150)
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
					const element = this.$refs[elementId]
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
		},

		handleColorSelect(color) {
			this.location.color = color
		}
	},
	// Height transition feature
	options: {
		hideOverflow: false,
		transition: 'height .25s ease-out'
	}
}
</script>

<style scoped>
.c-scroll-container {
	scroll-margin: 9rem;
	scroll-padding: 9rem;
}

.zoom-fade-enter,
.zoom-fade-leave-to {
	@apply transform scale-90 opacity-0
}

.zoom-fade-leave-active {
	@apply absolute transition duration-500;
	transition-timing-function: cubic-bezier(0.35, 0.46, 0.17, 1.3)
}

.zoom-fade-enter-active {
	@apply transition duration-500;
	transition-timing-function: cubic-bezier(0.35, 0.46, 0.17, 1.3)
}
</style>
