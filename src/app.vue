<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toast />
</template>

<script setup lang="ts">
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - website-vue` : 'website-vue';
	}
})
</script>
