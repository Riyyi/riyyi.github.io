<template>
	<div class="card">
		<ConfirmDialog></ConfirmDialog>
		<DataTable :value="computedTodos" :lazy="true" tableStyle="min-width: 50rem" removableSort
			v-model:sortField="sortField" v-model:sortOrder="sortOrder">
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

import type { Todo } from "@/schemas/todo";

const confirm = useConfirm();
const store = useTodoStore();
const toast = useToast();

// Reactive bindings for sorting
const sortField = ref<string>("");
const sortOrder = ref<number>();

function sortTodos(): Todo[] {
	let todos: Todo[] = JSON.parse(JSON.stringify(store.todos)); // deep copy

	if (sortField.value) { // string or null
		todos = (sortOrder.value == 1) // 1 or -1
			? todos.sort((a, b) => a[sortField.value as keyof Todo]?.localeCompare(b[sortField.value as keyof Todo] || "") || 0)
			: todos.sort((a, b) => b[sortField.value as keyof Todo]?.localeCompare(a[sortField.value as keyof Todo] || "") || 0);
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

<style>
.pointer {
	cursor: pointer;
}
</style>
