import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Lookup resolved from path: rootDir/content
// see: https://github.com/nuxt/content/issues/3161

export default defineContentConfig({
	collections: {
		content: defineCollection({
			type: "page",
			source: "**/*.md",
			schema: z.object({
				date: z.date(),
				img: z.string(),
				sub: z.string(),
				tags: z.array(z.string()),
			})
		})
	}
});
