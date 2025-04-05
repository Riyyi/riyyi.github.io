<!-- https://github.com/nuxt-modules/mdc/blob/main/src/runtime/components/prose/ProseImg.vue -->

<template>
	<a :href="refinedSrc" target="_blank">
		<component :is="ImageComponent" :class="props.class" :src="refinedSrc" :alt="props.alt" :loading="props.loading"
			:title="props.title" :width="props.width" :height="props.height" v-bind="$attrs" />
	</a>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo"
import { useRuntimeConfig, computed } from "#imports"

import ImageComponent from "#build/mdc-image-component.mjs"

const props = defineProps({
	src: {
		type: String,
		default: ""
	},
	alt: {
		type: String,
		default: ""
	},
	width: {
		type: [String, Number],
		default: undefined
	},
	height: {
		type: [String, Number],
		default: undefined
	},
	// Added props compared to upstream
	class: {
		type: String,
		default: "img-fluid"
	},
	title: {
		type: String,
		default: ""
	},
	loading: {
		type: String,
		default: "lazy" // eager, lazy
	},
})

const refinedSrc = computed(() => {
	if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
		if (_base !== "/" && !props.src.startsWith(_base)) {
			return joinURL(_base, props.src)
		}
	}
	return props.src
})
</script>

<!--
	 Usage:

	 ![alt text](/img/path-to-img.png "title text"){.img-fluid loading=lazy}

	 <a href="/img/path-to-img.png" target="_blank">
		<img class="img-fluid" src="/img/path-to-img.png" alt="alt text" loading="lazy" title="title text">
	 </a>
-->

<!-- v-bind="$attrs" will pass through any additional props that haven't been specified in defineProps -->
