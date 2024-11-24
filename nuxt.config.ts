import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	css: [
		"primeicons/primeicons.css"
	],
	devtools: { enabled: true },
	modules: [
		"@nuxt/eslint",
		"@primevue/nuxt-module"
	],
	primevue: {
		options: {
			theme: {
				preset: Aura
			}
		}
	},
	dir: {
		public: "../public"
	},
	srcDir: "src/",
	ssr: false
})
