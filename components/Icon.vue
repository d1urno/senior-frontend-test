<template>
	<i class="inline-flex items-center justify-center" role="img">
		<svg
			class="w-6 h-6"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<component :is="icon" v-if="icon"/>
		</svg>
	</i>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		type: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			icon: () => import(`@/assets/icons/${this.type}.vue`)
		}
	}
}
</script>
