<template>
	<ArticlesOverview title="Hardware Projects" :articles="articles" />
</template>

<script setup lang="ts">
const { articles } = await articleCollection("hardware");
</script>
