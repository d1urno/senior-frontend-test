<template>
	<div class="relative overflow-y-hidden bg-white rounded-lg shadow-lg">
		<header class="relative z-10">
			<button @click="isOpen = !isOpen" :class="_colorClass" class="h-48 p-8 w-full
				flex flex-col justify-center text-white rounded-lg shadow-lg
				focus:outline-none">
				<span class="block text-3xl font-semibold">{{ location.name }}</span>
				<span>{{ location.address }}</span>
			</button>
		</header>

		<smooth-reflow>
			<transition name="fade">
				<div v-if="isOpen" class="px-12">
					<section class="pt-8 pb-4 -mt-2 space-y-3">
						<h3 class="block text-3xl font-semibold text-gray-800">
							{{ location.contact.name }}
						</h3>
						<p>{{ location.contact.title }}</p>
						<a :href="`mailto:${location.contact.email}`"
						   class="inline-block text-teal-500 focus:outline-none focus:underline">
							{{ location.contact.email }}
						</a>
						<p>{{ location.contact.phone }}</p>
					</section>

					<span class="block w-full h-1 border-t border-gray-300"/>

					<footer class="flex justify-between px-1 pt-4 pb-6">
						<button class="px-2 py-1 -mx-3 -my-1 text-xs tracking-wider
							flex items-center select-none
							text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
							<icon type="edit" class="mr-2"/>
							EDIT
						</button>
						<button class="px-2 py-1 -mx-3 -my-1 text-xs tracking-wider
							flex items-center select-none
							text-red-500 rounded-lg hover:bg-red-100 focus:outline-none focus:bg-red-100">
							<icon type="delete" class="mr-2"/>
							DELETE
						</button>
					</footer>
				</div>
			</transition>
		</smooth-reflow>
	</div>
</template>

<script>
import Icon from '@/components/Icon'

const Colors = {
	teal: 'bg-teal-500',
	orange: 'bg-orange-500',
	red: 'bg-red-500',
	gray: 'bg-gray-500',
	dark: 'bg-gray-900'
}

export default {
	name: 'OfficeCard',
	components: {Icon},
	props: {
		location: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isOpen: false
		}
	},
	computed: {
		_colorClass() {
			return Colors[this.location.color]
		}
	}
}
</script>

<style>
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
