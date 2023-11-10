import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface UserInfo {
    name: string,
    email: string,
    mobile: string,
}

export const useUserStore = defineStore('user', () => {
    const info: UserInfo = reactive({
        name: '',
        email: '',
        mobile: '',
    })

    return { info }
})