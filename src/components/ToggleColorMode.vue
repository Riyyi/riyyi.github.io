<template>
	<div class="position-fixed corner">
		<template v-if="store.colorMode === 'dark'">
			<IFaSolidSun @click="store.toggleColorMode" />
		</template>
		<template v-else>
			<IFaMoonO @click="store.toggleColorMode" />
		</template>
	</div>
</template>

<style scoped>
.corner {
	right: 10px;
	bottom: 10px;
}
</style>

<script setup lang="ts">
import { useStateStore } from "@/stores/stateStore";

const store = useStateStore();
</script>
