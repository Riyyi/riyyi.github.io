<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<Toast />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStateStore } from "@/stores/stateStore";

const router = useRouter();
const store = useStateStore();

// Set dark theme
store.applyColorMode();

useHead({
	link: [
		{ rel: "icon", type: "image/x-icon", href: getPublicPath("/favicon.ico") },
	],
	titleTemplate: (titleChunk: string | undefined): string | null => {
		return titleChunk ? `${titleChunk} - Rick van Vonderen` : 'Rick van Vonderen';
	}
})

// Init Bootstrap after navigation
router.afterEach((_to, _from) => {
	setTimeout(() => { store.initBootstrap(); }, 500);
});

// Init Bootstrap on initial page load, after the DOM is ready
onMounted(() => {
	// @ts-ignore
	store.initBootstrap();
});
</script>
