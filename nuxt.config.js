export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "polimi-hyp-project-2022",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["@/assets/styles/variables.css"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	// Server: https://nuxtjs.org/docs/configuration-glossary/configuration-server
	// Binding server to all interfaces, so you can test the website on your smartphone, etc.
	server: {
		port: 8000, // default: 3000
		host: "0.0.0.0", // default: localhost
		timing: true,
	},

	// Server Middleware: https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
	// Register api
	serverMiddleware: [
		{
			path: "/api",
			handler: "~/server/api/index.js",
		},
	],
}
