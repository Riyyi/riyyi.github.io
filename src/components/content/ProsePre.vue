<template>
	<div class="position-relative">
		<div @click="copyCode" class="position-absolute" style="top: 10px; right: 10px;">
			<template v-if="copied">
				<code>Copied!</code>
			</template>
			<button class="copy text-secondary" title="Copy code">
				<IFaClone />
			</button>
		</div>
		<pre :class="$props.class"><code class="language-{{ language }}"><slot /></code></pre>
	</div>
</template>

<style scoped>
pre code .line {
	display: block;
}

button.copy {
	background: 0;
	border: 0;
	z-index: 10;
}

button.copy:hover {
	background-color: var(--w-code-background-color);
	border-radius: var(--bs-border-radius);
}
</style>

<script setup lang="ts">
import { ref } from "vue"

defineProps({
	code: {
		type: String,
		default: ""
	},
	language: {
		type: String,
		default: null
	},
	filename: {
		type: String,
		default: null
	},
	highlights: {
		type: Array as () => number[],
		default: () => []
	},
	meta: {
		type: String,
		default: null
	},
	class: {
		type: String,
		default: null
	}
});

const copied = ref(false);

const copyCode = async (e: Event) => {
	try {
		const target = e.currentTarget as HTMLElement;
		const element = target.nextElementSibling as HTMLPreElement | null;
		const textToCopy = element ? element.textContent.trim() : "";

		await navigator.clipboard.writeText(textToCopy);
		copied.value = true;
		setTimeout(() => (copied.value = false), 2000);
	} catch (err) {
		console.error('Failed to copy:', err)
	}
}
</script>
