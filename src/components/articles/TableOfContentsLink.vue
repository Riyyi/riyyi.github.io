<template>
	<ul>
		<template v-for="link in links" :key="link.id">
			<li>
				<a :href="'#' + link.id">{{ link.text }}</a>
			</li>
			<template v-if="link.children && link.children?.length > 0">
				<ArticlesTableOfContentsLink :links="link.children" :first="false" />
			</template>
		</template>
	</ul>
</template>

<script setup lang="ts">
import type { TocLink } from "@nuxtjs/mdc";

defineProps<{ links: TocLink[] }>();
</script>
