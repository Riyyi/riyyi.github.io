<template>
	<div>
		<strong v-if="$slots.namedslot">
			<slot name="namedslot" mdc-unwrap="p" />
		</strong>
		<h2 v-else>Broken Slot</h2>

		<p>
			<slot mdc-unwrap="p" />
		</p>
	</div>
</template>

<script setup lang="ts">
defineProps({
	namedslot: String,
});
</script>
