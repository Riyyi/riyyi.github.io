<template>
	<div>
		<h1>Articles</h1>
		<ul>
			<li v-for="article in articles" :key="article.path">
				<NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
			</li>
		</ul>

		<div v-for="article in articles" :key="article.path">
			<pre>{{ article }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
const { data: articles } = await useAsyncData("articles", () => queryCollection("content").all())
</script>
