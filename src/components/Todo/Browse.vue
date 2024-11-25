<template>
	<div class="card">
		<ConfirmDialog></ConfirmDialog>
		<DataTable :value="computedTodos" tableStyle="min-width: 50rem" @sort="onSort" sortMode="multiple" removableSort>
			<Column field="number" header="#"></Column>
			<Column field="id" header="ID" sortable filterField="id" showFilterMenu filter="true"></Column>
			<Column field="title" header="Title" sortable filterField="title" showFilterMenu filter="true"></Column>
			<Column header="Modifier">
				<template #body="slotProps">
					<a @click="removeTodo(slotProps.data.id)">
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

const onSort = (event: any) => {
	console.log(event);
};

const sorting = ref<Record<string, string>>({
	id: "asc",
	title: "asc",
});

function toggleSorting(key: string) {
	sorting.value[key] = sorting.value[key] === 'asc' ? 'desc' : 'asc';
};

function sortTodos(): Todo[] {
	let todos: Todo[] = JSON.parse(JSON.stringify(store.todos)); // deep copy

	// Number

	// ID

	// Title
	todos = (sorting.value.title === "desc")
		? todos.sort((a, b) => b.title.localeCompare(a.title))
		: todos.sort((a, b) => a.title.localeCompare(b.title));

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
