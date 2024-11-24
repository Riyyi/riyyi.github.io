<template>
    <div class="card">
        <DataTable :value="todos" tableStyle="min-width: 50rem">
            <Column field="number" header="#"></Column>
            <Column field="id" header="ID"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="modifier" header="Modifier"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';

 onMounted(() => {
	 todos.value = [
		 { number: "1", id: "toby", title: "Do stuff..", modifier: "hehe"}
	 ]
});

const todos = ref();

</script>
