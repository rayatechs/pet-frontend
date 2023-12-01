import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useUserStore } from './user'
import axios from '@/axios'

export interface RegisterForm {
  name: string
  email: string
  mobile: string
  password: string
}

export interface LoginForm {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))

  watch(token, (value) => {
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
    }
  })

  function register(form: RegisterForm) {
    return axios.post('/api/auth/register', form).then((res) => {
      const user = useUserStore()
      user.data = res.data.data.user
      token.value = res.data.data.token
    })
  }

  function login(form: LoginForm) {
    return axios.post('/api/auth/login', form).then((res) => {
      const user = useUserStore()
      user.data = res.data.data.user
      token.value = res.data.data.access_token
    })
  }

  return { token, register, login }
})
