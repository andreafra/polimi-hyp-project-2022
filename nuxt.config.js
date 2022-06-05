export default {
	ssr: true,
	target: "server",
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: (titleChunk) =>
			titleChunk ? `${titleChunk} | Minturno` : "Minturno",
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
	css: ["normalize.css", "@/assets/styles/main.css"],

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
		// https://google-fonts.nuxtjs.org
		"@nuxtjs/google-fonts",
		// https://github.com/juliomrqz/nuxt-optimized-images
		"@aceforth/nuxt-optimized-images",
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	// Server: https://nuxtjs.org/docs/configuration-glossary/configuration-server
	// Binding server to all interfaces, so you can test the website on your smartphone, etc.
	server: {
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

	axios: {
		proxy: true,
	},

	proxy: {
		"/api/": {
			target: `${process.env.HEROKU_HOSTNAME ?? "localhost:8000"}/api/`,
			pathRewrite: { "^/api/": "" },
		},
	},

	// Google Fonts: https://google-fonts.nuxtjs.org/options
	googleFonts: {
		families: {
			"Playfair+Display": {
				wght: [400, 800],
			},
			"Work+Sans": {
				wght: [400],
				ital: [400],
			},
		},
		display: "swap",
		prefetch: true,
		preconnect: true,
		preload: true,
	},
	// Disable loading bar between pages
	loading: false,
	optimizedImages: {
		optimizeImagesInDev: false,
	},
}
