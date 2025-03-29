import { defineContentConfig, defineCollection } from '@nuxt/content'

// Lookup resolved from path: rootDir/content
// see: https://github.com/nuxt/content/issues/3161

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md"
    })
  }
})
