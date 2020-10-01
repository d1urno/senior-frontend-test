<template>
	<label class="block w-full mb-6">
		{{ title }}
		<span class="text-gray-500">*</span>
		<span class="relative block">
			<!-- Error icon -->
			<transition name="zoom-fade">
				<icon v-show="error"
					  type="error"
					  class="absolute top-0 right-0 m-2 mt-3 text-red-500"/>
			</transition>
			<!-- End: Error icon -->

			<!-- User input -->
			<input :ref="reference"
				   v-model="_value"
				   :type="type"
				   :inputmode="inputMode"
				   :placeholder="placeholder"
				   class="w-full px-4 py-2 mt-1
				   border border-gray-500 rounded-md shadow
				   focus:outline-none focus:border-teal-500 c-scroll-container"
				   :class="{ 'border-red-500': error, 'border-gray-800': _value }"/>
			<!-- End: User input -->
		</span>

		<!-- Error message -->
		<smooth-reflow :options="$options.options">
			<transition name="zoom-fade">
				<p v-if="error" class="inline-block mt-1 text-xs text-red-600">
					{{ error }}
				</p>
			</transition>
		</smooth-reflow>
		<!-- End: Error message -->
	</label>
</template>

<script>
import Icon from '@/components/Icon'

export default {
	name: 'OfficeFormInput',
	components: {Icon},
	props: {
		error: {
			type: String | undefined,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ''
		},
		reference: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: 'text'
		},
		inputMode: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		}
	},
	computed: {
		_value: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit('input', val)
				this.$emit('reset-error')
			}
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
	scroll-padding: 9rem
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
