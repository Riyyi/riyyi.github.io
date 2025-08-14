<template>
	<ArticlesOverview title="Algorithms" description="My implementation of a few algorithms." :articles="articles" />
</template>

<script setup lang="ts">
const { articles } = await articleCollection("algorithm");
</script>
