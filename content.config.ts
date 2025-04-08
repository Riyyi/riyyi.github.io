import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from "@nuxtjs/sitemap/content"

// Lookup resolved from path: rootDir/content
// see: https://github.com/nuxt/content/issues/3161

export default defineContentConfig({
	collections: {
		content: defineCollection(
			asSitemapCollection({
				type: "page",
				source: "**/*.md",
				schema: z.object({
					date: z.date(),
					img: z.string(),
					tags: z.array(z.string()),
				})
			})
		)
	}
});
