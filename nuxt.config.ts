import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	content: {
		build: {
			markdown: {
				highlight: {
					theme: "github-light",
					langs: [
						// https://github.com/shikijs/shiki/blob/main/packages/langs/package.json
						"c", "cpp", "css", "html", "js", "json", "lua", "md", "mdc", "php", "shell", "ts", "vue", "yaml"
					]
				}
			}
		}
	},
	css: [
		"primeicons/primeicons.css",
		"~/assets/css/style.css"
	],
	devtools: { enabled: true },
	dir: {
		public: "../public"
	},
	modules: [
		"@nuxt/content",
		"@nuxt/eslint",
		"@pinia/nuxt",
		"@primevue/nuxt-module",
		"pinia-plugin-persistedstate/nuxt",
	],
	pinia: {
		storesDirs: ["src/stores/**"] // also auto-import nested directories
	},
	piniaPluginPersistedstate: {
		debug: process.env.NODE_ENV === "development", // log error to console
		storage: "cookies",
		cookieOptions: {
			sameSite: "lax", // prevent CSRF
			secure: process.env.NODE_ENV !== "development" // only send over HTTPS
		}
	},
	primevue: {
		options: {
			theme: {
				preset: Aura
			}
		}
	},
	srcDir: "src/",
	ssr: false
})
