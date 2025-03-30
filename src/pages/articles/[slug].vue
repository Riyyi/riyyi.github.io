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
