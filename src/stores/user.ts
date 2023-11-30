import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from '@/axios'

export interface User {
  id: number
  name: string
  email: string
  mobile: string
}

export const useUserStore = defineStore('user', () => {
  const data: User = reactive({
    id: 0,
    name: '',
    email: '',
    mobile: ''
  })

  function show() {
    return axios.get('/api/user').then((res) => {
      data.id = res.data.data.id
      data.name = res.data.data.name
      data.email = res.data.data.email
      data.mobile = res.data.data.mobile
    })
  }

  return { data, show }
})
