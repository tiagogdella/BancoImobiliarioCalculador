<script setup lang="ts">
    defineProps<{
        nome: string
        dinheiro: number
    }>()
</script>

<template>
    <div class="jogador">
        <div>{{ nome }}</div>
        <div>R$ {{ dinheiro }}</div>
    </div>
</template>

<style scoped>
    .jogador{
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        border-style: solid;
        width: 150px;
        height: 150px;
        font-size: 30px;
    }
</style>