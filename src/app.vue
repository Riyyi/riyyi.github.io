<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toast />
</template>

<script setup lang="ts">
useHead({
	titleTemplate: (titleChunk: string): string => {
		return titleChunk ? `${titleChunk} - website-vue` : 'website-vue';
	}
})
</script>
