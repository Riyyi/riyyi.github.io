<template>
	<div>
		<h2 v-if="$slots.namedslot">
			<slot name="namedslot" mdc-unwrap="p" />
		</h2>
		<h2 v-else>Broken Slot</h2>

		<slot mdc-unwrap="p" />
	</div>
</template>

<script setup lang="ts">
 defineProps({
	 namedslot: String,
 });
</script>
