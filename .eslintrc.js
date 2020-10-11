module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
	plugins: ['prettier', 'only-warn'],
	// add your custom rules here
	rules: {
		'max-len': ['warn', { code: 120 }]
	}
}
