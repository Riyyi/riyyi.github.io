<template>
	<div>
		<h1>Articles</h1>

		<div class="row pt-5" v-for="article in articles" :key="article.path">
			<div class="col-5 col-lg-4 col-xl-3">
				<NuxtLink v-if="article.img" :to="article.path">
					<img class="img-fluid" :src="getPublicPath(article.img)" :alt="article.title" loading="lazy" :title="article.title">
				</NuxtLink>
			</div>
			<div class="col-7 col-lg-8 col-xl-9">
				<NuxtLink v-if="article.img" :to="article.path">
					<h4 class="mb-0"><strong>{{ article.title }}</strong></h4>
				</NuxtLink>
				<p><i><small>{{ prettyDate(article.date) }}</small></i></p>
				<p>{{ article.description }}</p>
				<template v-if="article.tags">
					<p>Tags: <code>{{ article.tags.join(", ") }}</code></p>
				</template>
			</div>
		</div>

		<template v-if="isDev">
			<br>
			<div v-for="article in articles" :key="article.path">
				<pre>{{ article }}</pre>
			</div>
		</template>
	</div>
</template>

<style scoped>
a {
	text-decoration: none !important;
}

a h4 {
	color: var(--bs-body-color);
}

a h4:hover {
	color: var(--bs-link-hover-color);
}

 code {
	 color: var(--bs-link-color);
 }
</style>

<script setup lang="ts">
import { useAsyncData, queryCollection } from "#imports"

const { data: articles } = await useAsyncData("articles", () => queryCollection("content").order("date", "DESC").all());
</script>
