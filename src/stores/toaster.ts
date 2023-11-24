import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

interface Toast {
  id: number,
  message: string,
  type: string
}

export const useToasterStore = defineStore('toaster', () => {
  const toasts: Ref<Toast[]> = ref([])

  function show(message: string, type: string) {
    toasts.value.push({id: toasts.value.length + 1 ,message, type})
  }

  function drop(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id != id)
  }

  return { toasts, show, drop }
})
