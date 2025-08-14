<template>
	<NuxtLayout>
		<p>Error <strong>{{ error.statusCode }}</strong>. {{ message }}.</p>
		<p>The requested URL {{ path }} was not found on this server.</p>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { useStateStore } from "@/stores/stateStore";

const store = useStateStore();
const { error } = defineProps<{ error: { statusCode?: number; message?: string } }>();
const [message, path] = error.message?.split(': ') ?? ['Unknown', ''];

onBeforeMount(() => {
	// Set dark theme
	store.applyColorMode();
});

useHead({
	link: [
		{ rel: "icon", type: "image/x-icon", href: getPublicPath("/favicon.ico") },
	],
	title: `Error ${error.statusCode} (${message}) - Rick van Vonderen`,
});
</script>
