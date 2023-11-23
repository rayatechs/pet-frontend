<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useValidationStore } from '@/stores/validation'

interface Props {
    title: string,
    name: string,
    modelValue: number,
    options?: {key: string, value: string}[],
}

const validation = useValidationStore()
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
  const key: any = props.name
  const err = value.errors[key]
  if (err != undefined) {
    error.value = err
  }
})
</script>

<template>
    <div class="flex flex-col items-start justify-center w-full mt-4">
        <label :for="name" class="mb-1 text-sm font-medium">{{title}}</label>
        <select 
            :id="name"
            class="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg outline-red-500" 
            v-model="value">
            <option v-for="option, idx in options" :key="idx" :value="option.key">{{ option.value }}</option>
        </select>
        <ul v-if="error" class="list-disc list-inside">
          <li v-for="(err, idx) in error" :key="idx" class="text-xs text-red-900">{{ err }}</li>
        </ul>
    </div>
</template>