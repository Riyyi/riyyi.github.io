<template>
	<div>
		<template v-if="article">
			<ArticlesTableOfContents v-if="article.navigation" :toc="article.body.toc" />

			<h1>{{ article.title }}</h1>
			<p><i><small>{{ prettyDate(article.date) }}</small></i></p>
			<ContentRenderer :value="article" />
		</template>
		<template v-else>
			<h1>Page Not Found</h1>
			<p>Oops! The content you're looking for doesn't exist.</p>
		</template>
	</div>
</template>

<style scoped>
/* Target element in child components with :deep */

/* Select any <h> */
:deep(:is(h1, h2, h3, h4, h5, h6):has(span)) {
	position: relative;
}

/* Select any <span> inside a <h> */
:deep(:is(h1, h2, h3, h4, h5, h6) span) {
	position: absolute;
	top: -65px;
}

/* Select any <a> inside a <h> */
:deep(:is(h1, h2, h3, h4, h5, h6) a) {
	color: var(--bs-body-color);
	text-decoration: none;
}

/* Select <pre class="language-"> */
:deep(pre[class^="language-"]) {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 1rem;
	background-color: var(--bs-secondary-bg);
}

/* Select <code> and <code class="shiki"> */
:deep(code:not(pre code)) {
	padding: .2em .4em;
	margin: 0;
	font-size: 85%;
	white-space: break-spaces;
	background-color: var(--bs-tertiary-bg);
	border-radius: 6px;
}

/* Select <code> */
:deep(code:not([class^="language-"]):not(pre code)) {
	color: var(--bs-body-color);
}
</style>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

const { params } = useRoute();

const { data: article } = await useAsyncData<ContentCollectionItem | null>(
	`article-${params.slug}`,
	() => queryCollection("content").path("/articles/" + params.slug).first()
);

useSeoMeta(article.value?.seo || {});
</script>
