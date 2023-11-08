<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useValidationStore } from '@/stores/validation'
const validation = useValidationStore()

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

const error = ref()
watch(validation, (value) => {
  const err = value.errors[props.name]
  if (err != undefined) {
    error.value = err
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
        <ul v-if="error" class="list-disc list-inside">
          <li v-for="(err, idx) in error" :key="idx" class="text-red-900 text-xs">{{ err }}</li>
        </ul>
    </div>
</template>