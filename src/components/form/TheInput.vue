<script setup lang="ts">
interface Props {
    title: string,
    type: string,
    placeholder?: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex flex-col items-start justify-center w-full">
        <span class="text-sm font-medium mb-1">{{title}}</span>
        <input class="rounded-lg px-4 py-2 text-sm border border-gray-200 outline-red-500 w-full" :type="type" :placeholder="placeholder">
    </div>
</template>