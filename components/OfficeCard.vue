<template>
	<smooth-reflow>
		<!-- Location card -->
		<transition name="fade">
			<div v-if="!isEditFormOpen" class="relative overflow-y-hidden bg-white rounded-lg shadow-lg">
				<!-- Card header -->
				<header class="relative z-10">
					<!-- prettier-ignore -->
					<button
						class="flex items-center justify-between w-full h-40 p-6
						text-white rounded-lg shadow-lg focus:outline-none"
						:class="_colorClass"
						@click="isOpen = !isOpen"
					>
						<span class="text-left">
							<span class="block mb-1 text-2xl font-semibold">{{ location.title }}</span>
							<span class="">{{ location.address }}</span>
						</span>
						<icon
							type="chevron"
							class="transition-transform duration-500 transform"
							:class="{ 'rotate-180': isOpen }"
						/>
					</button>
				</header>
				<!-- End: Card header -->

				<!-- Card body -->
				<smooth-reflow>
					<transition name="fade">
						<div v-if="isOpen" class="px-8">
							<section class="pt-8 pb-4 -mt-2 space-y-2 text-gray-900">
								<h3 class="block text-xl font-bold">
									{{ location.contact.name }}
								</h3>
								<p>{{ location.contact.job }}</p>
								<a
									:href="`mailto:${location.contact.email}`"
									class="inline-block text-teal-500 focus:outline-none focus:underline"
								>
									{{ location.contact.email }}
								</a>
								<p>{{ location.contact.phone }}</p>
							</section>

							<span class="block w-full h-1 border-t border-gray-200" />

							<footer class="flex justify-between px-1 pt-4 pb-6">
								<!-- prettier-ignore -->
								<button
									class="flex items-center px-2 py-1 -mx-3 -my-1
									text-xs tracking-wider text-gray-500 rounded-lg select-none
									hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
									@click="isEditFormOpen = true"
								>
									<icon type="edit" class="mr-2" />
									EDIT
								</button>
								<!-- prettier-ignore -->
								<button
									class="flex items-center px-2 py-1 -mx-3 -my-1
									text-xs tracking-wider text-red-500 rounded-lg select-none
									hover:bg-red-100 focus:outline-none focus:bg-red-100"
									@click="deleteLocation(location)"
								>
									<icon type="delete" class="mr-2" />
									DELETE
								</button>
							</footer>
						</div>
					</transition>
				</smooth-reflow>
				<!-- End: Card body -->
			</div>
		</transition>
		<!-- End: Location card -->

		<!-- Edit form -->
		<transition name="slide-top">
			<office-form
				v-if="isEditFormOpen"
				:edit="location.id"
				@exit="isEditFormOpen = false"
				@message="(val) => $emit('message', val)"
			/>
		</transition>
		<!-- End: Edit form -->
	</smooth-reflow>
</template>

<script>
import Icon from '@/components/Icon'
import OfficeForm from '@/components/OfficeForm'

const Colors = {
	teal: 'bg-teal-500',
	orange: 'bg-orange-500',
	red: 'bg-red-500',
	gray: 'bg-gray-500',
	dark: 'bg-gray-900'
}

export default {
	name: 'OfficeCard',
	components: { OfficeForm, Icon },
	props: {
		location: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isOpen: false,
			isEditFormOpen: false
		}
	},
	computed: {
		_colorClass() {
			return Colors[this.location.color]
		}
	},
	methods: {
		deleteLocation(location) {
			this.$store.dispatch('deleteLocation', location)
			this.$emit('message', 'THE LOCATION HAS BEEN DELETED.')
		}
	}
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
	@apply transform opacity-0;
}

.fade-leave-active {
	@apply absolute inset-x-0 transition duration-500;
}

.slide-top-enter,
.slide-top-leave-to {
	@apply transform translate-y-12 opacity-0;
}

.slide-top-leave-active {
	@apply absolute inset-0 transition duration-500;
}

.fade-enter-active,
.slide-top-enter-active {
	@apply transition duration-500;
}
</style>
