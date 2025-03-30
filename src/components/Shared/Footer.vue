<template>
	<footer class="row mb-2">
		<div class="col-12">
			© {{ year }} Rick van Vonderen
		</div>
	</footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
