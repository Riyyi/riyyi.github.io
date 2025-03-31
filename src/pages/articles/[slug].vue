<template>
	<div>
		<template v-if="article">
			<h1>{{ article.title }}</h1>
			<p>{{ article.description }}</p>
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

/* Select any <a> inside a <h> */
:deep(:is(h1, h2, h3, h4, h5, h6) > a) {
	color: inherit;
	text-decoration: none;
}

/* Select <pre class="shiki"> */
:deep(pre.shiki) {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 1rem;
	background-color: var(--w-pre-background-color);
}

/* Select <code> and <code class="shiki"> */
:deep(code:not(pre code)) {
	padding: .2em .4em;
	margin: 0;
	font-size: 85%;
	white-space: break-spaces;
	background-color: var(--w-code-background-color);
	border-radius: 6px;
}

/* Select <code> */
:deep(code:not(.shiki):not(pre code)) {
	/* reset font to black */
	color: inherit;
}
</style>

<script setup lang="ts">
const { params } = useRoute();

console.log(params);

const { data: article } = await useAsyncData(
	`article-${params.slug}`,
	() => queryCollection("content").path("/articles/" + params.slug).first()
);

useSeoMeta({
	title: article.value?.title,
	description: article.value?.description
})

console.log(article);
</script>
