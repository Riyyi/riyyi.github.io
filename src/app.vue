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
	titleTemplate: (titleChunk: string | undefined): string | null => {
		return titleChunk ? `${titleChunk} - website-vue` : 'website-vue';
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
