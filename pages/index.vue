<template>
	<div class="relative min-h-screen overflow-y-hidden bg-gray-200">
		<!-- Message modal -->
		<transition name="slide-bottom">
			<!-- prettier-ignore -->
			<span
				v-if="message"
				class="fixed inset-0 z-50 flex items-center justify-center h-20
				text-sm text-gray-900 bg-white border-t-4 border-teal-500 shadow-lg"
			>
				<icon type="check" class="mr-3 text-teal-500" />
				{{ message }}
			</span>
		</transition>
		<!-- End: Message modal -->

		<section class="container flex flex-col items-center px-6 pt-24 mx-auto">
			<h1 class="mb-6 text-6xl font-light text-teal-500">Offices</h1>

			<smooth-reflow class="relative w-full max-w-xs">
				<!-- Add location button -->
				<transition name="fade">
					<!-- prettier-ignore -->
					<button
						v-if="!isAddFormOpen"
						class="flex items-center justify-between w-full px-6 py-4 my-6
						text-left text-white bg-red-500 rounded-lg shadow-lg
						focus:outline-none"
						@click="isAddFormOpen = true"
					>
						<span>Add New Location</span>
						<icon class="w-4 h-4" type="add" />
					</button>
				</transition>
				<!-- End: Add location button -->

				<!-- Add location form -->
				<transition name="slide-top">
					<office-form
						v-if="isAddFormOpen"
						class="my-6"
						@exit="isAddFormOpen = false"
						@message="showMessage"
					/>
				</transition>
				<!-- End: Add location form -->
			</smooth-reflow>

			<!-- Location list -->
			<transition-group name="zoom-fade" tag="ul" class="w-full">
				<li v-for="location in _locations" :key="location.id" class="relative w-full max-w-xs mx-auto mb-6">
					<office-card :location="location" @message="showMessage" />
				</li>
			</transition-group>
			<!-- End: Location list -->
		</section>

		<footer class="container px-6 pb-16 mx-auto text-center">
			<p class="text-gray-500 mb-px">This project is for test purpose only.</p>
			<a
				class="text-xs text-teal-500 tracking-wide focus:outline-none focus:underline"
				href="https://dogandponystudios.com"
				rel="nofollow"
			>
				WWW.DOGANDPONYSTUDIOS.COM
			</a>
		</footer>
	</div>
</template>

<script>
import OfficeCard from '@/components/OfficeCard'
import Icon from '@/components/Icon'
import OfficeForm from '@/components/OfficeForm'

export default {
	components: { OfficeForm, Icon, OfficeCard },
	data() {
		return {
			isAddFormOpen: false,
			message: ''
		}
	},
	computed: {
		_locations() {
			return this.$store.getters.locations
		}
	},
	methods: {
		showMessage(message) {
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
	@apply transform scale-90 opacity-0;
}

.zoom-fade-leave-active,
.fade-leave-active {
	@apply absolute inset-x-0 transition duration-500;
}

.zoom-fade-enter-active {
	@apply transition duration-700 delay-500;
	transition-timing-function: cubic-bezier(0.35, 0.46, 0.17, 1.3);
}

.slide-top-enter,
.slide-top-leave-to {
	@apply transform translate-y-12 opacity-0;
}

.slide-top-leave-active {
	@apply absolute inset-0 transition duration-500;
}

.slide-top-enter-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active,
.fade-enter-active,
.zoom-fade-move {
	@apply transition duration-500;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
	@apply transform -translate-y-12 opacity-0;
}

.fade-enter,
.fade-leave-to {
	@apply transform opacity-0;
}
</style>
