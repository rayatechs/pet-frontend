import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))

    watch(token, (value) => {
        if (value) {
            localStorage.setItem('token', value)
        } else {
            localStorage.removeItem('token')
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