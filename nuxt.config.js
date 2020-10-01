
export default {
	target: 'static',

	/*
	 * Headers of the page
	 */
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: process.env.npm_package_name || 'Dog and Pony Studios - Senior Frontend Developer Test',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	/*
	 * Plugins to load before mounting the App
	 */
	plugins: ['plugins/vue-smooth-reflow'],

	/*
	 * Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss'
	],

	/*
	 * Nuxt.js modules
	 */
	modules: [],

	/*
	 * Build configuration
	 */
	build: {
		/*
		 * You can extend webpack config here
		 */
		extend (config, ctx) {
		}
	}
}
