<template>
	<div class="position-relative">
		<div @click="copyCode" class="position-absolute" style="top: 10px; right: 10px;">
			<button class="copy text-secondary" :class="copied ? 'd-none' : ''" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="Copy to clipboard">
				<IFaClone />
			</button>

			<button class="copy text-secondary" :class="!copied ? 'd-none' : ''" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="Copied!" data-bs-trigger="manual" data-bs-show
				ref="stickyTooltipElement">
				<IFaCheck class="text-success" />
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
import { useStateStore } from "@/stores/stateStore";
import { nextTick, ref, watch } from "vue"

const bootstrap = useNuxtApp().$bootstrap;
const store = useStateStore();

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

const copied = ref<boolean>(false);

const copyCode = async (e: Event) => {
	try {
		const target = e.currentTarget as HTMLElement;
		const element = target.nextElementSibling as HTMLPreElement | null;
		const textToCopy = element ? element.textContent!.trim() : "";

		await navigator.clipboard.writeText(textToCopy);
		copied.value = true;
		setTimeout(() => { copied.value = false; }, 2000);
	} catch (err) {
		console.error('Failed to copy:', err);
	}
}

// Clicked tooltip
const stickyTooltip = ref<any>();
const stickyTooltipElement = ref<HTMLInputElement | null>(null);
watch(copied, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		if (newValue) {
			// Ensure the DOM is updated before executing
			nextTick(() => {
				store.initBootstrap();
				// @ts-ignore
				stickyTooltip.value = new bootstrap.Tooltip(stickyTooltipElement.value, { trigger: "manual" });
				stickyTooltip.value.show();
			});
		}
		else {
			if (stickyTooltip.value) {
				stickyTooltip.value.dispose();
				stickyTooltip.value = null;
			}
		}
	}
 });

onBeforeUnmount(() => {
	if (stickyTooltip.value) {
		stickyTooltip.value.dispose();
		stickyTooltip.value = null;
	}
});
</script>
