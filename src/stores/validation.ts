import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useValidationStore = defineStore('validation', () => {
    const errors = ref('')

    return { errors }
})