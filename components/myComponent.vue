<script setup>
import { ref } from 'vue'
import { serve } from 'http.mjs';

async function test() {
    const res = await serve.get('https://jsonplaceholder.typicode.com/users', {});
    console.log('res: ', res);
}
const count = ref(0)
</script>

<template>
    <div>
        <div class="card">
            <button type="button" @click="count++">count is {{ count }}</button>
        </div>
        <hr>
        <button @click="test">TEST</button>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    justify-content: center;
}
</style>
