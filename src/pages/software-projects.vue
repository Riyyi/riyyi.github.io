<template>
	<ArticlesOverview title="Software Projects" :articles="articles" />
</template>

<script setup lang="ts">
import { useAsyncData, queryCollection } from "#imports"
import type { ContentCollectionItem } from "@nuxt/content"

const { data: articles } = await useAsyncData<ContentCollectionItem[] | null>(
	"articles", () => queryCollection("content").where("tags", "LIKE", "%software%").order("date", "DESC").all()
);
</script>
