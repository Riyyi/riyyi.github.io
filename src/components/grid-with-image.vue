<template>
	<ul class="list-group pb-3">
		<li v-for="(row, index) in props.rows" :key="index" class="list-group-item d-flex justify-content-between align-items-start">
			{{ row.title }} &nbsp;
			<div>
				<span v-if="row.count" class="badge text-bg-primary rounded-pill">{{row.count}}</span>
				<template v-if="row.src && row.count">
					&nbsp;
				</template>
				<a v-if="row.src" :href="getPublicPath(row.src)" class="text-end" target="_blank">
					<IFaImage class="text-end" />
				</a>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
const props = defineProps<{
	rows: {
		title: string,
		src?: string,
		count?: number
	}[]
}>();
</script>

<!--
	 Usage:

	 YAML method.

	::GridWithImage
	---
	rows:
	- title: My title
	- title: Another title
		src: "/img/path-to-img.jpg"
	---
	::

	 Inline method.

	::GridWithImage{:rows='[ {"title": "My title" }, {"title": "Another title", "src": "/img/path-to-img.jpg"} ]'}
	::
-->
