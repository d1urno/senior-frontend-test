<template>
	<section>
		<!-- Selected color -->
		<button
			type="button"
			:class="_colorClass"
			class="w-full h-32 max-w-xs flex items-center justify-center
			transition-colors duration-500
			font-semibold text-white rounded-lg shadow-lg
			focus:outline-none"
			@click.prevent="isOpen = !isOpen">
			Select Color
			<icon type="chevron"
				  class="w-4 h-4 mt-1 ml-3 transition-transform duration-500 transform"
				  :class="{ 'rotate-180': isOpen }"/>
		</button>
		<!-- End: Selected color -->

		<!-- Available color list -->
		<smooth-reflow class="relative">
			<transition name="fade">
				<div v-if="isOpen" class="mt-4 space-y-2">
					<button v-for="(colorClass, colorCode) in $options.colors"
							:key="colorCode"
							:class="colorClass"
							class="w-full h-32 max-w-xs flex items-center justify-center
							text-white rounded-lg focus:outline-none"
							@click.prevent="handleSelection(colorCode)">
						<icon v-if="value === colorCode" type="check"/>
					</button>
				</div>
			</transition>
		</smooth-reflow>
		<!-- End: Available color list -->
	</section>
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
	name: 'OfficeFormColor',
	components: {Icon},
	props: {
		value: {
			type: String,
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
			return Colors[this.value]
		}
	},
	methods: {
		handleSelection(colorCode) {
			this.$emit('input', colorCode)
			this.isOpen = false
		}
	},
	colors: Colors
}
</script>

<style scoped>
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
