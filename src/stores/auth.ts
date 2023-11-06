import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('auth'))

    watch(token, (value) => {
        if (value) {
            localStorage.setItem('auth', value)
        } else {
            localStorage.removeItem('auth')
        }
    })

    function singIn(tokenVal: string) {
        token.value = tokenVal
    }

    function singOut() {
        token.value = ''
    }

    return { token, singIn, singOut }
})