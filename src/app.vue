<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toast />
</template>

<script setup lang="ts">
const bootstrap = useNuxtApp().$bootstrap;

useHead({
	titleTemplate: (titleChunk: string | undefined): string | null => {
		return titleChunk ? `${titleChunk} - website-vue` : 'website-vue';
	}
})

// Access bootstrap after the DOM is ready
onMounted(() => {
	// Initialize popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

	// Initialize tooltips
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
</script>
