<script setup lang="ts">
import { computed, ref, watch } from 'vue';
interface Props {
    title: string,
    name: string,
    type: string,
    placeholder?: string,
    modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
    <div class="flex flex-col items-start justify-center w-full mt-4">
        <label :for="name" class="text-sm font-medium mb-1">{{title}}</label>
        <input 
            :id="name"
            class="rounded-lg px-4 py-2 text-sm border border-gray-200 outline-red-500 w-full" 
            :type="type" 
            :placeholder="placeholder"
            v-model="value">
    </div>
</template>