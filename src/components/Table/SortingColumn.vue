<template>
	adasda
	<Column field="title">
		<template #header>
			<span @click="toggleSorting('title')" class="p-datatable-column-title">Title&nbsp;
				<span :class="['pi', sorting.title === 'asc' ? 'pi-arrow-circle-down' : 'pi-arrow-circle-up']"></span>
			</span>
		</template>
	</Column>
</template>

<script setup lang="ts">
 const sorting = defineModel<Record<string, string>>({ required: true });

function toggleSorting(key: string) {
	sorting.value[key] = sorting.value[key] === 'asc' ? 'desc' : 'asc';
};
</script>
