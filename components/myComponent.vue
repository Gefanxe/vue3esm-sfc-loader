<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div>
        <div class="card">
            <button type="button" @click="count++">count is {{ count }}</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    justify-content: center;
}
</style>
