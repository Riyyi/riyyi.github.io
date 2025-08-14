<template>
	<ArticlesOverview title="Software Projects" :articles="articles" />
</template>

<script setup lang="ts">
const { articles } = await articleCollection("software");
</script>
