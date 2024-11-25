<template>
	<div class="card">
		<ConfirmDialog></ConfirmDialog>
		<DataTable :value="computedTodos" :lazy="true" tableStyle="min-width: 50rem" removableSort
			:sortMode="'multiple'" v-model:multiSortMeta="multiSortMeta">
			<Column field="number" header="#" />
			<Column field="id" header="ID" sortable />
			<Column field="title" header="Title" sortable />
			<Column header="Modifier">
				<template #body="slotProps">
					<a @click="removeTodo(slotProps.data.id)" v-tooltip.top="'Delete'" class="pointer">
						<span class="pi pi-trash" style="color: var(--p-red-600);"></span>
					</a>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useTodoStore } from "@/stores/todoStore";

import type { DataTableSortMeta } from "primevue/datatable";
import type { Todo } from "@/schemas/todo";

const confirm = useConfirm();
const store = useTodoStore();
const toast = useToast();

// Reactive bindings for sorting
const multiSortMeta = ref<DataTableSortMeta[]>([]);

function sortTodos(): Todo[] {
	let todos: Todo[] = JSON.parse(JSON.stringify(store.todos)); // deep copy

	// Loop in reverse order to apply the sorting correctly
	for (let i = multiSortMeta.value.length - 1; i >= 0; i--) {

		const sort: DataTableSortMeta = multiSortMeta.value[i];
		const value = (item: Todo): string => {
			if (typeof sort.field === "string") {
				return item[sort.field as keyof Todo] || "";
			}
			else if (typeof sort.field === "function") {
				return sort.field(item) || "";
			}

			return "";
		};

		todos.sort((a, b) => sort.order! * value(a).localeCompare(value(b)));
	}

	return todos;
}

const computedTodos = computed(() => {
	return sortTodos().map((todo, index) => ({
		number: index + 1,
		...todo
	}));
});

const removeTodo = (id: String) => {
	confirm.require({
		message: "Do you want to delete this todo?",
		header: "Confirmation",
		icon: "pi pi-info-circle",
		rejectLabel: "Cancel",
		rejectProps: {
			label: "Cancel",
			severity: "secondary",
			outlined: true
		},
		acceptProps: {
			label: "Delete",
			severity: "danger"
		},
		accept: () => {
			toast.add({ severity: "info", summary: "Confirmed", detail: "Todo deleted", life: 3000 });
			store.todos = store.todos.filter(todo => todo.id !== id);
		},
		reject: () => {}
	});
};
</script>

<style scoped>
.pointer {
	cursor: pointer;
}
</style>
