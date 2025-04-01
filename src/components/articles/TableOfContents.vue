<template>
	<aside v-if="toc" class="position-fixed toc shadow">
		<h5 class="text-center">{{ toc.title }}</h5>
		<ul class="font-smaller mb-0">
			<li>
				<a href="#">Overview</a>
			</li>
		</ul>
		<ArticlesTableOfContentsLink :links="toc.links" :first="true" class="font-smaller" />
	</aside>
</template>

<style scoped>
.toc {
	display: none;
}

@media (min-width: 1450px) {
	.toc {
		display: block;
		width: calc((100vw - 960px) / 2 - 35px);
		max-width: 300px;
		top: 56px;
		left: calc(100vw - (100vw - 960px) / 2 + 12px);
		padding: 20px 5px 20px 0;
		border-radius: 6px;
		background-color: #fff;
	}
}

.font-smaller {
	font-size: .8125rem;
}
</style>

<script setup lang="ts">
import type { Toc } from "@nuxtjs/mdc";

defineProps<{ toc?: Toc }>();
</script>
