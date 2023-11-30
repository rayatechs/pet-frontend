<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useValidationStore } from '@/stores/validation'
const validation = useValidationStore()

interface Props {
  title: string
  name: string
  modelValue: string
  options: { key: string; value: string }[]
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
  const key: any = props.name
  const err = value.errors[key]
  if (err != undefined) {
    error.value = err
  }
})
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full mt-4">
    <label :for="name" class="mb-1 text-sm font-medium">{{ title }}</label>
    <div class="flex flex-row items-center justify-start w-full">
      <div
        class="flex flex-row items-center justify-start ml-6"
        v-for="(option, idx) in options"
        :key="idx"
      >
        <input
          :id="name"
          :name="name"
          :value="option.key"
          class="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg outline-primary"
          type="radio"
          v-model="value"
        />
        <span class="mr-2 text-sm">{{ option.value }}</span>
      </div>
    </div>
    <ul v-if="error" class="list-disc list-inside">
      <li v-for="(err, idx) in error" :key="idx" class="text-xs text-red-900">{{ err }}</li>
    </ul>
  </div>
</template>
