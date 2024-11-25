import { defineStore } from "pinia"
import type { Todo } from "@/schemas/todo"

export const useTodoStore = defineStore("todo", () => {

	const todos = ref<Todo[]>([
		{ id: "d8681644-74d0-4a30-90db-06baa277d0a0", title: "laundry" },
		{ id: "03c5bf55-f528-43a2-89a1-1a1afb0fa4f6", title: "feed pet" },
		{ id: "356cd252-bef8-4a1c-ba81-5a68d89df56e", title: "run" }
	]);

	return { todos }
}, {
	persist: process.env.NODE_ENV === 'development' ? true : false,
})
