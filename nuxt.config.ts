import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import ViteComponents from "unplugin-vue-components/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	bootstrapVueNext: {
		css: false
	},
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
				},
				toc: {
					title: "Table of Contents",
					depth: 4, // include h4 headings
					searchDepth: 2
				}
			}
		}
	},
	css: [
		"bootstrap/dist/css/bootstrap.min.css",
		"bootstrap-vue-next/dist/bootstrap-vue-next.css",
		"~/assets/css/style.css"
	],
	devtools: { enabled: true },
	dir: {
		public: "../public"
	},
	modules: [
		"@bootstrap-vue-next/nuxt",
		"@nuxt/content",
		"@nuxt/eslint",
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"unplugin-icons/nuxt"
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
	srcDir: "src/",
	ssr: false,
	vite: {
		plugins: [
			ViteComponents({
				resolvers: [IconsResolver()],
				dts: true
			}),
			Icons({
				compiler: "vue3",
				autoInstall: true,
			}),
		],
	},
})
