<template>
	<div class="min-h-screen overflow-y-hidden bg-gray-200">
		<!-- Message modal -->
		<transition name="slide-bottom">
			<span v-if="message" class="fixed z-50 inset-0 h-20 flex items-center justify-center text-sm
								 bg-white border-t-4 border-teal-500 shadow-lg text-gray-800">
				<icon type="check" class="mr-3 text-teal-500"/>
				{{ message }}
			</span>
		</transition>

		<section class="container flex flex-col items-center px-6 pt-24 mx-auto">
			<h1 class="mb-6 text-6xl font-light tracking-wide text-teal-500">
				Offices
			</h1>

			<smooth-reflow class="relative w-full max-w-md">
				<transition name="fade">
					<button v-if="!isFormAddOpen"
							class="w-full px-8 py-5 my-6
									flex justify-between items-center
									text-left text-white bg-red-500 rounded-lg shadow-lg
									focus:outline-none"
							@click="isFormAddOpen = true">
						<span>Add New Location</span>
						<icon type="add"/>
					</button>
				</transition>

				<transition name="slide-top">
					<office-form-add v-if="isFormAddOpen"
									 class="my-6"
									 @exit="handleFormExit"/>
				</transition>
			</smooth-reflow>

			<transition-group name="zoom-fade" tag="ul" class="relative w-full">
				<li v-for="location in _locations" :key="location.id" class="w-full max-w-md mx-auto mb-6">
					<office-card :location="location"/>
				</li>
			</transition-group>
		</section>

		<footer class="container px-6 pb-16 mx-auto text-center">
			<p class="mb-1 text-gray-500">
				This project is for test purpose only.
			</p>
			<a class="text-xs tracking-wider text-teal-500 focus:outline-none focus:underline"
			   href="https://dogandponystudios.com"
			   rel="nofollow">
				WWW.DOGANDPONYSTUDIOS.COM
			</a>
		</footer>
	</div>
</template>

<script>
import OfficeCard from '@/components/OfficeCard'
import Icon from '@/components/Icon'
import OfficeFormAdd from '@/components/OfficeFormAdd'

export default {
	components: {OfficeFormAdd, Icon, OfficeCard},
	data() {
		return {
			isFormAddOpen: false,
			message: ''
		}
	},
	computed: {
		_locations() {
			return this.$store.getters.locations
		}
	},
	methods: {
		handleFormExit(message) {
			this.isFormAddOpen = false
			if (!message) return

			this.message = message
			setTimeout(() => {
				this.message = ''
			}, 4000)
		}
	}
}
</script>

<style scoped>
.zoom-fade-enter,
.zoom-fade-leave-to {
	@apply transform scale-90 opacity-0
}

.zoom-fade-leave-active {
	@apply absolute inset-x-0 transition duration-500;
}

.zoom-fade-enter-active {
	@apply transition duration-700 delay-500;
	transition-timing-function: cubic-bezier(0.35, 0.46, 0.17, 1.3)
}

.zoom-fade-move {
	@apply transition duration-500;
}

.slide-top-enter,
.slide-top-leave-to {
	@apply transform translate-y-12 opacity-0
}

.slide-top-leave-active {
	@apply absolute inset-0 transition duration-500;
}

.slide-top-enter-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active {
	@apply transition duration-500;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
	@apply transform -translate-y-12 opacity-0
}

.fade-enter,
.fade-leave-to {
	@apply transform opacity-0
}

.fade-leave-active {
	@apply transition duration-500 absolute inset-x-0
}

.fade-enter-active {
	@apply transition duration-500
}
</style>
