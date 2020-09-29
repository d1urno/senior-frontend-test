<template>
	<div class="bg-gray-100">
		<section class="container flex flex-col items-center px-6 pt-16 mx-auto">
			<h1 class="mb-6 text-6xl font-light tracking-wide text-teal-500">
				Offices
			</h1>

			<button class="block w-full max-w-md px-8 py-5 my-6
				flex justify-between items-center
				text-left text-white bg-red-500 rounded-lg shadow-lg
				focus:outline-none">
				<span>Add New location</span>
				<icon type="add"/>
			</button>

			<ul class="w-full mb-8 space-y-6">
				<li v-for="location in _locations" :key="location.id" class="w-full max-w-md mx-auto">
					<office-card :location="location"/>
				</li>
			</ul>
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

export default {
	components: {Icon, OfficeCard},
	computed: {
		_locations() {
			return this.$store.getters.locations
		}
	}
}
</script>
